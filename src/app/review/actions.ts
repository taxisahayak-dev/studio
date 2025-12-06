'use server';

import { z } from 'zod';
import { reviewSchema } from '@/lib/schemas';
import { initializeFirebase } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export async function handleReviewSubmission(
  data: z.infer<typeof reviewSchema>
) {
  const parsedData = reviewSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: 'Invalid data provided. Please check your inputs.' };
  }

  const { firestore, auth } = initializeFirebase();
  const user = auth.currentUser;

  if (!user) {
    return { success: false, message: 'You must be logged in to submit a review.' };
  }
  
  try {
    const reviewsRef = collection(firestore, 'reviews');
    await addDoc(reviewsRef, {
      ...parsedData.data,
      userId: user.uid, // Add user ID to the review document
      submissionDate: new Date(),
    });

    return { success: true, message: 'Review submitted successfully.' };
  } catch (error) {
    console.error('Firestore error:', error);
    // In a real app, you might want to return a more specific error message.
    return { success: false, message: 'Could not save your review. Please try again.' };
  }
}
