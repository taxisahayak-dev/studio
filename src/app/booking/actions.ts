'use server';

import { z } from 'zod';
import { bookingSchema } from '@/lib/schemas';
import { displaySubmissionStatus } from '@/ai/flows/display-submission-status';
import { v4 as uuidv4 } from 'uuid';
import { initializeFirebase } from '@/firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export async function handleBookingSubmission(
  data: z.infer<typeof bookingSchema>
) {
  const parsedData = bookingSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: 'Invalid data provided. Please check your inputs.' };
  }
  
  try {
    const { firestore, auth } = initializeFirebase();
    const user = auth.currentUser;

    if (!user) {
      // This case should ideally be handled by UI, but as a safeguard:
      return { success: false, message: 'You must be logged in to make a booking.' };
    }

    const bookingRef = collection(firestore, 'bookings');
    await addDoc(bookingRef, {
      ...parsedData.data,
      dateTime: new Date(parsedData.data.date + 'T' + parsedData.data.time),
      status: 'pending',
      customerId: user.uid, // Link booking to the logged-in customer
    });
    
    // Create or update the customer record
    const customerRef = doc(firestore, 'customers', user.uid);
    await setDoc(customerRef, {
        id: user.uid,
        firstName: parsedData.data.name.split(' ')[0],
        lastName: parsedData.data.name.split(' ').slice(1).join(' '),
        email: user.email, // Assuming user has an email
        phone: parsedData.data.contact,
        address: '' // Address can be collected elsewhere if needed
    }, { merge: true });


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
