
'use server';

import { z } from 'zod';
import { bookingSchema } from '@/lib/schemas';
import { displaySubmissionStatus } from '@/ai/flows/display-submission-status';
import { v4 as uuidv4 } from 'uuid';
import { initializeFirebase } from '@/firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

export async function handleBookingSubmission(
  data: z.infer<typeof bookingSchema>
) {
  const parsedData = bookingSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: 'Invalid data provided. Please check your inputs.' };
  }

  try {
    const { firestore } = initializeFirebase();

    const bookingRef = collection(firestore, 'bookings');
    
    // Combine date and time
    const [hours, minutes] = parsedData.data.pickupTime.split(':');
    const pickupDateTime = new Date(); // Using today's date, can be adjusted if a date picker is added
    pickupDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

    await addDoc(bookingRef, {
      name: parsedData.data.name,
      contact: parsedData.data.contactNumber,
      pickupPoint: parsedData.data.pickupLocation,
      dropOffPoint: 'N/A', // Not in the new form
      dateTime: Timestamp.fromDate(pickupDateTime),
      status: 'pending',
      customerId: null,
    });

  } catch (error) {
    console.error('Firestore error:', error);
    return { success: false, message: 'Could not save your booking. Please try again.' };
  }

  try {
    const orderId = uuidv4().slice(0, 8).toUpperCase();
    const aiResponse = await displaySubmissionStatus({
      orderId: orderId,
      estimatedResponseTime: '15 minutes',
    });

    return { success: true, message: aiResponse.message };
  } catch (error) {
    console.error('AI submission status error:', error);
    return { success: false, message: 'Your booking was received, but we failed to generate a confirmation message.' };
  }
}
