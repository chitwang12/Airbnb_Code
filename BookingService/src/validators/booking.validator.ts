import {z } from 'zod';


export const createBookingSchema = z.object({
    userId: z.number({message: "User ID is required"}),
    hotelId: z.number({message: "Hotel ID is required"}),
    totalGuests: z.number({message: "Total guests must be present"}).min(1,{message: "Total guests must be at least 1"}).int(),
    bookingAmount: z.number({message: "Booking amount must be present"}).min(1, {message: "Booking amount must be at least 1"}).int(),

}).passthrough();