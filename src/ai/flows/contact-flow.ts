'use server';
/**
 * @fileOverview A flow for handling contact form submissions.
 *
 * - contactFlow - A function that processes the contact message.
 * - ContactFlowInput - The input type for the contactFlow function.
 * - ContactFlowOutput - The return type for the contactFlow function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const ContactFlowInputSchema = z.object({
  name: z.string().describe("The sender's name."),
  email: z.string().email().describe("The sender's email address."),
  message: z.string().describe("The content of the message."),
});
export type ContactFlowInput = z.infer<typeof ContactFlowInputSchema>;

export const ContactFlowOutputSchema = z.object({
  success: z.boolean().describe("Whether the message was sent successfully."),
  message: z.string().describe("A confirmation or error message."),
});
export type ContactFlowOutput = z.infer<typeof ContactFlowOutputSchema>;


const sendEmailTool = ai.defineTool(
    {
        name: 'sendEmail',
        description: 'Sends an email. Use this to send the contact form message to the site owner.',
        inputSchema: z.object({
            fromName: z.string(),
            fromEmail: z.string(),
            to: z.string(),
            subject: z.string(),
            body: z.string(),
        }),
        outputSchema: z.object({
            success: z.boolean(),
        }),
    },
    async (input) => {
        console.log('--- SENDING EMAIL ---');
        console.log(`To: ${input.to}`);
        console.log(`From: ${input.fromName} <${input.fromEmail}>`);
        console.log(`Subject: ${input.subject}`);
        console.log('---');
        console.log(input.body);
        console.log('---------------------');
        // In a real application, you would integrate with an email service
        // like SendGrid, Mailgun, or Nodemailer here.
        // For this example, we'll just simulate a successful send.
        return { success: true };
    }
);

const contactPrompt = ai.definePrompt({
    name: 'contactPrompt',
    input: { schema: ContactFlowInputSchema },
    output: { schema: ContactFlowOutputSchema },
    tools: [sendEmailTool],
    prompt: `You are a helpful assistant for CyberCraft Studio. A user has submitted a contact form.
    Your task is to send this message to the studio's contact email address.

    Sender Name: {{{name}}}
    Sender Email: {{{email}}}
    Message:
    {{{message}}}
    
    Use the sendEmail tool to send this message to 'zuhairmumtaz87@gmail.com'.
    The subject line should be "New Contact Form Message from {{{name}}}".
    The body of the email should contain the sender's name, email, and their message.
    
    After using the tool, respond with a success message for the user.
    If the tool fails, respond with an appropriate error message.`,
});


export const contactFlow = ai.defineFlow(
  {
    name: 'contactFlow',
    inputSchema: ContactFlowInputSchema,
    outputSchema: ContactFlowOutputSchema,
  },
  async (input) => {
    const {output} = await contactPrompt(input);
    if (!output) {
      return {
        success: false,
        message: "The AI failed to generate a response. Please try again."
      }
    }
    return output;
  }
);
