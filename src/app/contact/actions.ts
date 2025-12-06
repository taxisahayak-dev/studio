'use server';

import { z } from 'zod';
import { contactSchema } from '@/lib/schemas';
import { displaySubmissionStatus } from '@/ai/flows/display-submission-status';
import { v4 as uuidv4 } from 'uuid';
import { initializeFirebase } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';

export async function handleContactSubmission(
  data: z.infer<typeof contactSchema>
) {
  const parsedData = contactSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: 'Invalid data provided. Please check your inputs.' };
  }
  
  try {
    const { firestore } = initializeFirebase();
    const contactSubmissionsRef = collection(firestore, 'contact_form_submissions');
    await addDoc(contactSubmissionsRef, {
      ...parsedData.data,
      submissionDate: new Date(),
    });
  } catch (error) {
    console.error('Firestore error:', error);
    return { success: false, message: 'Could not send your message. Please try again.' };
  }

  try {
    const inquiryId = uuidv4().slice(0, 8).toUpperCase();
    const aiResponse = await displaySubmissionStatus({
      orderId: inquiryId,
      estimatedResponseTime: '24 hours',
    });

    return { success: true, message: aiResponse.message };
  } catch (error) {
    console.error('AI submission status error:', error);
    return { success: false, message: 'Your message was sent, but we failed to generate a confirmation message.' };
  }
}
