import {
  confirmBooking,
  createBooking,
  createIdempotencyKey,
  finalizeIdempotencyKey,
  getIdempotencyKeyWithLock,
} from "../Repositories/booking.repository";
import { createBookingDTO } from "src/dto/booking.dto";
import { BadRequestError, InternalServerError, NotFoundError } from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/generateIdempotencyKey";
import PrismaClient from "../prisma/client";
import { serverConfig } from "../config";
import { redlock } from "../config/redis.config";

export async function createBookingService(createBookingDTO: createBookingDTO) {
  //Before Try to make a booking , We would like to take a lock on it
  const ttl = serverConfig.LOCK_TTL;
  const bookingResource = `hotel:${createBookingDTO.hotelId}`;

    try {
        await redlock.acquire([bookingResource], ttl);
        const booking = await createBooking({
            userId: createBookingDTO.userId,
            hotelId: createBookingDTO.hotelId,
            totalGuests: createBookingDTO.totalGuests,
            bookingAmount: createBookingDTO.bookingAmount,
          });
      
          const idempotencyKey = generateIdempotencyKey();
      
          await createIdempotencyKey(idempotencyKey, booking.id);
          return {
            bookingId: booking.id,
            idempotencyKey: idempotencyKey,
          };
    } catch (error) {
        throw new InternalServerError('Failed to acquire lock for booking resource');
    }
}

export async function confirmBookingService(idempotencyKey: string) {
  return await PrismaClient.$transaction(async (tx) => {
    const idempotencyKeyData = await getIdempotencyKeyWithLock(
      tx,
      idempotencyKey
    );
    if (!idempotencyKeyData) {
      throw new NotFoundError(`Idempotency key ${idempotencyKey} not found`);
    }
    if (idempotencyKeyData.finalized) {
      throw new BadRequestError(
        `Idempotency key ${idempotencyKey} has already been finalized`
      );
    }
    const booking = await confirmBooking(tx, idempotencyKeyData.bookingId);
    await finalizeIdempotencyKey(tx, idempotencyKey);

    return booking;
  });
}
