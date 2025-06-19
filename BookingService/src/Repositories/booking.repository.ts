import { Prisma, IdempotencyKey } from "@prisma/client";
import PrismaClient from "../prisma/client";
import { validate as isValidUUID } from "uuid";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";

export async function createBooking(bookingData: Prisma.BookingCreateInput){
  const booking = await PrismaClient.booking.create({
    data: bookingData,
  });
  return booking;
} 

export async function createIdempotencyKey(key: string, bookingId: number){
  const idempotencyKey = await PrismaClient.idempotencyKey.create({
    data:{
      idemKey:key,
      booking:{
        connect:{
          id: bookingId
        }
      }
    }
  })
  return idempotencyKey;
}

export async function getIdempotencyKeyWithLock(tx:Prisma.TransactionClient, key:string){
  console.log(":: Acquiring Lock for Idempotency Key :: ", key)
  if(!isValidUUID(key)){
    throw new BadRequestError('Invalid idempotency key format'); 
  }
  const idempotencyKey: Array<IdempotencyKey> = await tx.$queryRaw(
    Prisma.raw(`SELECT * FROM IdempotencyKey Where idemkey = '${key}' FOR UPDATE;`)
    )

    console.log("Idempotency key with lock:::::",idempotencyKey);

    if(!idempotencyKey || idempotencyKey.length === 0){
      throw new NotFoundError('Idempotency Key not found');
    }

  return idempotencyKey[0];
}

export async function getBookingById(bookingId:number){
  const booking = await PrismaClient.booking.findUnique({
    where:{
      id: bookingId
    }
  })
  return booking;
}

export async function confirmBooking(tx:Prisma.TransactionClient, bookingId: number){
  const booking = await tx.booking.update({
    where:{
      id:bookingId
    },data:{
      status:"CONFIRMED"
    }
  })
  return booking;
}


export async function cancelBooking(bookingId: number){
  const booking = await PrismaClient.booking.update({
    where:{
      id:bookingId
    },data:{
      status:"CANCELLED"
    }
  })
  return booking;
}

export async function finalizeIdempotencyKey(tx:Prisma.TransactionClient, key:string){
  const idempotencyKey = await tx.idempotencyKey.update({
    where: {
      idemKey: key
    },
    data: {
      finalized: true
    }
  });
  return idempotencyKey;
}
//1. Booking => idempotencyKey 
//2. Booking | idempotencyKey + update IdempotencyKey add the bookings