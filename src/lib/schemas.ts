import { z } from 'zod';

export const bookingSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  contact: z.string().regex(/^\+?[1-9]\d{9,14}$/, { message: "Please enter a valid phone number." }),
  pickup: z.string().min(3, { message: "Pickup location is required." }),
  dropoff: z.string().min(3, { message: "Drop-off location is required." }),
  date: z.date({ required_error: "A date for pickup is required." }),
  time: z.string().min(1, { message: "Pickup time is required." }),
});

export type BookingSchema = z.infer<typeof bookingSchema>;


export const contactSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, { message: "Message must not exceed 500 characters." }),
});

export type ContactSchema = z.infer<typeof contactSchema>;
