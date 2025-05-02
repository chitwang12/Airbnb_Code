import { Request, Response, NextFunction } from 'express';
import { createHotel, getHotelById } from '../repositories/hotel.repository';

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