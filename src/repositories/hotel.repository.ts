import { createHotelDto } from '../dto/hotel.dto';
import Hotel from '../db/models/hotel';
import logger from '../config/logger.config';
import { NotFoundError } from '../utils/errors/app.error';

export async function createHotel(hotelData: createHotelDto){
    const hotel = await Hotel.create({
        name: hotelData.name,
        address: hotelData.address,
        location: hotelData.location,
        rating: hotelData.rating,
        rating_count: hotelData.ratingCount
    });

    logger.info(`Hotel created: ${hotel.id}`);
    return hotel;
}

export async function getHotelById(id: number){
    const hotel = await Hotel.findByPk(id);
    if(!hotel){
        logger.error(`Hotel not found with id: ${id}`);
        throw new NotFoundError(`Hotel with id: ${id} not Found`);
    }
    logger.info(`Hotel found: ${hotel.id}`);
    
    return hotel;
}