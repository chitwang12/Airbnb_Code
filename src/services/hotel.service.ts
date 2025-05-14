import { createHotelDto } from "../dto/hotel.dto";
import { createHotel, getHotelById,getAllHotels } from "../repositories/hotel.repository";
import { BadRequestError } from "../utils/errors/app.error";

const blockListedAddresses = [
    '123 Fake St',
    '456 Elm St',
    '789 Oak St'
];

export function isAddressBlocked(address: string): boolean {
    return blockListedAddresses.includes(address);
}

export async function  createHotelService(hotelData: createHotelDto) {
    if(isAddressBlocked(hotelData.address)){
        throw new BadRequestError(`Address ${hotelData.address} is blocked`);
    }
    const hotel = await createHotel(hotelData);

    return hotel;
}

export async function getHotelByIdService(id: number) {
    const hotel = await getHotelById(id);

    return hotel;
}

export async function getAllHotelsService() {
    const hotels = await getAllHotels();
    return hotels;
}