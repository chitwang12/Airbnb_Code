import { Request, Response, NextFunction } from 'express';
import { createHotel, deleteHotelById, getAllHotels, getHotelById, updateHotelsById } from '../repositories/hotel.repository';

export async function createHotelHandler(req:Request, res:Response, next:NextFunction) {
    const hotelResponse = await createHotel(req.body);
    res.status(201).json({
        status: 'success',
        message: 'Hotel created successfully',
        data: {
            hotel: hotelResponse
        }
    });
}


export async function getHotelByIDHandler(req:Request, res:Response, next:NextFunction) {
    const hotelResponse = await getHotelById(Number(req.params.id));
    res.status(200).json({
        status: 'success',
        message: 'Hotel retrieved successfully',
        data: {
            hotel: hotelResponse
        }
    });
}

export async function getAllHotelsHandler(req:Request, res:Response, next:NextFunction) {
    const hotelResponse = await getAllHotels();
    res.status(200).json({
        status: 'success',
        message: 'Hotels retrieved successfully',
        data: {
            hotels: hotelResponse
        }
    });
}


export async function updateHotelHandler(req:Request, res:Response, next:NextFunction) {
    const hotelResponse =  await updateHotelsById(Number(req.params.id), req.body);
    res.status(200).json({
        status: 'success',
        message: 'Hotel updated successfully',
        data: {
            hotel: hotelResponse
        }
    });
}

export async function deleteHotelHandler(req:Request, res:Response, next:NextFunction) {
    const hotelResponse = await deleteHotelById(Number(req.params.id));
    res.status(200).json({
        status: 'success',
        message: 'Hotel deleted successfully',
        data: {
            hotel: hotelResponse
        }
    });
}