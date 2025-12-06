'use server';

/**
 * @fileOverview AI flow for displaying submission status toast notifications.
 *
 * - displaySubmissionStatus - A function that determines and returns the appropriate submission status message.
 * - SubmissionStatusInput - The input type for the displaySubmissionStatus function, including order ID and estimated response time.
 * - SubmissionStatusOutput - The return type for the displaySubmissionStatus function, providing a user-friendly message.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SubmissionStatusInputSchema = z.object({
  orderId: z.string().describe('The unique order ID for the submission.'),
  estimatedResponseTime: z
    .string()
    .describe('The estimated time for a response (e.g., "24 hours").'),
});
export type SubmissionStatusInput = z.infer<typeof SubmissionStatusInputSchema>;

const SubmissionStatusOutputSchema = z.object({
  message: z
    .string()
    .describe('A user-friendly message confirming the submission and providing the order ID and estimated response time.'),
});
export type SubmissionStatusOutput = z.infer<typeof SubmissionStatusOutputSchema>;

export async function displaySubmissionStatus(
  input: SubmissionStatusInput
): Promise<SubmissionStatusOutput> {
  return displaySubmissionStatusFlow(input);
}

const prompt = ai.definePrompt({
  name: 'submissionStatusPrompt',
  input: {schema: SubmissionStatusInputSchema},
  output: {schema: SubmissionStatusOutputSchema},
  prompt: `You are generating a toast notification for a user who has submitted a request.

  Create a friendly and informative message confirming the reception of their inquiry.
  Include the following details:
  - Order ID: {{{orderId}}}
  - Estimated Response Time: {{{estimatedResponseTime}}}

  Example: "Your inquiry has been received with order ID {{{orderId}}}. You can expect a response within {{{estimatedResponseTime}}}."
  Message: `,
});

const displaySubmissionStatusFlow = ai.defineFlow(
  {
    name: 'displaySubmissionStatusFlow',
    inputSchema: SubmissionStatusInputSchema,
    outputSchema: SubmissionStatusOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
