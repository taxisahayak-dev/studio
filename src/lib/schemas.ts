import { z } from 'zod';

export const bookingSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  contact: z.string().regex(/^\+?[1-9]\d{9,14}$/, { message: "Please enter a valid phone number." }),
  pickup: z.string().min(3, { message: "Pickup location is required." }),
  dropoff: z.string().min(3, { message: "Drop-off location is required." }),
  date: z.coerce.date({ required_error: "A date for pickup is required." }),
  time: z.string().min(1, { message: "Pickup time is required." }),
});

export type BookingSchema = z.infer<typeof bookingSchema>;


export const contactSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, { message: "Message must not exceed 500 characters." }),
});

export type ContactSchema = z.infer<typeof contactSchema>;

export const reviewSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  rating: z.number().min(1, { message: "Please provide a rating." }).max(5),
  message: z.string().min(10, { message: "Review must be at least 10 characters." }).max(1000, { message: "Review must not exceed 1000 characters." }),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;
