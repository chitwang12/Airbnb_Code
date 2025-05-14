import { Request, Response, NextFunction } from 'express';
import { updateHotelsById } from '../repositories/hotel.repository';
import { StatusCodes } from 'http-status-codes';
import { createHotelService, deleteHotelService, getAllHotelsService, getHotelByIdService } from '../services/hotel.service';

export async function createHotelHandler(req:Request, res:Response, next:NextFunction) {
    
    const hotelResponse = await createHotelService(req.body);
    
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        message: 'Hotel created successfully',
        data: {
            hotel: hotelResponse
        }
    });
}


export async function getHotelByIDHandler(req:Request, res:Response, next:NextFunction) {
    const hotelResponse = await getHotelByIdService(Number(req.params.id));
    res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'Hotel retrieved successfully',
        data: {
            hotel: hotelResponse
        }
    });
}

export async function getAllHotelsHandler(req:Request, res:Response, next:NextFunction) {
    console.log("::: inside Controller");
    const hotelResponse = await getAllHotelsService();
    res.status(StatusCodes.OK).json({
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
    const hotelResponse = await deleteHotelService(Number(req.params.id));
    res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'Hotel deleted successfully',
        data: {
            hotel: hotelResponse
        }
    });
}