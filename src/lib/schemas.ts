
import { z } from 'zod';

export const bookingSchema = z.object({
  name: z.string().min(2, { message: "Name is required and must be at least 2 characters." }),
  contactNumber: z.string().min(10, { message: "A valid contact number is required." }),
  pickupLocation: z.string().min(3, { message: "Pickup location is required." }),
  pickupTime: z.string().min(1, { message: "Pickup time is required." }),
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
