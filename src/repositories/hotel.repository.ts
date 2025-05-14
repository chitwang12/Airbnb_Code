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
    if(!hotel || hotel.deleted_at !== null){
        logger.error(`Hotel not found with id: ${id}`);
        throw new NotFoundError(`Hotel with id: ${id} not Found`);
    }
    logger.info(`Hotel found: ${hotel.id}`);
    
    return hotel;
}

export async function getAllHotels() {
    const hotels = await Hotel.findAll({
        where: {
            deleted_at: null
        }
    });
    if(!hotels) {
        logger.error(`No hotels found`);
        throw new NotFoundError(`No hotels found`);
    }
    logger.info(`Hotels found: ${hotels.length}`);
    return hotels;
}


export async function updateHotelsById(id:number, hotelData: createHotelDto){
    const hotel = await Hotel.findByPk(id);
    if(!hotel){
        logger.error(`Hotel not found with id: ${id}`);
        throw new NotFoundError(`Hotel with id: ${id} not Found`);
    }

    hotel.name = hotelData.name;
    hotel.address = hotelData.address;
    hotel.location = hotelData.location;
    hotel.rating = hotelData.rating;
    hotel.rating_count = hotelData.ratingCount;

    await hotel.save();

    logger.info(`Hotel updated: ${hotel.id}`);
    return hotel;
}


export async function softDeleteHotel(id: number){
    const hotel = await Hotel.findByPk(id);
    if(!hotel){
        logger.error(`Hotel not found with id: ${id}`);
        throw new NotFoundError(`Hotel with id: ${id} not Found`);
    }

    hotel.deleted_at =  new Date();
    await hotel.save(); // To save the data in the database
    logger.info(`Hotel deleted: ${hotel.id}`);  
    return true;
}