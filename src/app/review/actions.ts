
'use server';

import { z } from 'zod';
import { reviewSchema } from '@/lib/schemas';
import { initializeFirebase } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';

export async function handleReviewSubmission(
  data: z.infer<typeof reviewSchema>
) {
  const parsedData = reviewSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: 'Invalid data provided. Please check your inputs.' };
  }

  // Note: Since we moved to a client-side auth, we can't reliably get the user on the server.
  // We can choose to store reviews anonymously or pass a user identifier from the client if needed.
  // For now, we will save it with the email provided and a null userId.
  const { firestore } = initializeFirebase();
  
  try {
    const reviewsRef = collection(firestore, 'reviews');
    await addDoc(reviewsRef, {
      ...parsedData.data,
      userId: null, // User is not authenticated via server-side Firebase anymore
      submissionDate: new Date(),
    });

    return { success: true, message: 'Review submitted successfully.' };
  } catch (error) {
    console.error('Firestore error:', error);
    return { success: false, message: 'Could not save your review. Please try again.' };
  }
}
