'use server';

/**
 * @fileOverview Provides design inspiration for a website based on user input.
 *
 * - designInspiration - A function that returns website design inspiration.
 * - DesignInspirationInput - The input type for the designInspiration function.
 * - DesignInspirationOutput - The return type for the designInspiration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DesignInspirationInputSchema = z.object({
  websiteType: z
    .string()
    .describe("The type of website (e.g., Portfolio, Business, eCommerce, Blog, Custom)."),
  projectDescription: z.string().describe("A description of the project requirements."),
});
export type DesignInspirationInput = z.infer<typeof DesignInspirationInputSchema>;

const DesignInspirationOutputSchema = z.object({
  designInspiration: z.string().describe("AI-generated design inspiration for the website."),
});
export type DesignInspirationOutput = z.infer<typeof DesignInspirationOutputSchema>;

export async function designInspiration(input: DesignInspirationInput): Promise<DesignInspirationOutput> {
  return designInspirationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'designInspirationPrompt',
  input: {schema: DesignInspirationInputSchema},
  output: {schema: DesignInspirationOutputSchema},
  prompt: `You are a web design expert, skilled in providing design inspiration for various types of websites.

  Based on the type of website the user wants and their project description, provide detailed design inspiration.

  Website Type: {{{websiteType}}}
  Project Description: {{{projectDescription}}}

  Consider the following when providing inspiration:
  - Layout and structure suggestions
  - Color palette recommendations
  - Typography suggestions
  - Imagery and icon recommendations
  - Animation and interaction ideas
  - Overall aesthetic and style
  `,
});

const designInspirationFlow = ai.defineFlow(
  {
    name: 'designInspirationFlow',
    inputSchema: DesignInspirationInputSchema,
    outputSchema: DesignInspirationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
