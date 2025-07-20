'use server';

import { designInspiration, type DesignInspirationInput } from "@/ai/flows/design-inspiration";

export async function getDesignInspirationAction(input: DesignInspirationInput) {
    try {
        const result = await designInspiration(input);
        return result;
    } catch (error) {
        console.error("Error getting design inspiration:", error);
        throw new Error("Failed to get design inspiration. Please try again.");
    }
}
