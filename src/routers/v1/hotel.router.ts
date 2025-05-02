import express from 'express';
import {createHotelHandler, deleteHotelHandler, getAllHotelsHandler, getHotelByIDHandler, updateHotelHandler} from '../../controllers/hotel.controller';
import { validateRequestBody } from '../../validators';
import { hotelSchema } from '../../validators/hotel.validator';

const hotelRouter = express.Router();

hotelRouter.post('/', validateRequestBody(hotelSchema), createHotelHandler);

hotelRouter.get('/:id', getHotelByIDHandler);

hotelRouter.get('/', getAllHotelsHandler);

hotelRouter.patch('/:id', validateRequestBody(hotelSchema), updateHotelHandler);

hotelRouter.delete('/:id', deleteHotelHandler);

export default hotelRouter;