'use server';

/**
 * @fileOverview Suggests likely pickup or drop-off locations based on current location or past bookings.
 *
 * - suggestLocations - A function that suggests locations.
 * - SuggestLocationsInput - The input type for the suggestLocations function.
 * - SuggestLocationsOutput - The return type for the suggestLocations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestLocationsInputSchema = z.object({
  currentLocation: z
    .string()
    .describe(
      'The current location of the user. e.g. 1600 Amphitheatre Parkway, Mountain View, CA.'
    )
    .optional(),
  pastBookingLocations: z
    .array(z.string())
    .describe(
      'An array of past pickup and drop-off locations from previous bookings.'
    )
    .optional(),
  type: z
    .enum(['pickup', 'dropoff'])
    .describe('The type of location being requested: pickup or dropoff.'),
});
export type SuggestLocationsInput = z.infer<typeof SuggestLocationsInputSchema>;

const SuggestLocationsOutputSchema = z.object({
  locations: z
    .array(z.string())
    .describe('An array of suggested locations.'),
});
export type SuggestLocationsOutput = z.infer<typeof SuggestLocationsOutputSchema>;

export async function suggestLocations(
  input: SuggestLocationsInput
): Promise<SuggestLocationsOutput> {
  return suggestLocationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestLocationsPrompt',
  input: {schema: SuggestLocationsInputSchema},
  output: {schema: SuggestLocationsOutputSchema},
  prompt: `You are a taxi service assistant helping users to quickly book a taxi.

  The user is currently filling out a booking form and has requested suggestions for {{type}} locations.

  {% if currentLocation %}Suggest likely {{type}} locations near the user's current location: {{currentLocation}}{% endif %}
  {% if pastBookingLocations %}Suggest {{type}} locations from the user's past bookings: {{pastBookingLocations}}{% endif %}

  Return a JSON array of strings.  Each string should be a location.
  Do not include any other text besides the JSON array.
`,
});

const suggestLocationsFlow = ai.defineFlow(
  {
    name: 'suggestLocationsFlow',
    inputSchema: SuggestLocationsInputSchema,
    outputSchema: SuggestLocationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
