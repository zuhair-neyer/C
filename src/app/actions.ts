'use server';

import { designInspiration, type DesignInspirationInput } from "@/ai/flows/design-inspiration";
import { contactFlow, type ContactFlowInput } from "@/ai/flows/contact-flow";
import { getAuth } from "firebase-admin/auth";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

import { adminApp } from "@/lib/firebase-admin";
import { db as adminDb } from "@/lib/firebase-admin";

async function getAuthenticatedUser() {
    // This is a placeholder for getting the current user's session.
    // In a real app, this would involve validating a session token.
    // For now, we assume you can get the user's UID somehow.
    // In a Next.js app with server components, you might use a library like next-auth
    // or manage sessions manually. Here, we'll simulate it.
    // As we don't have user session on server actions, we cannot proceed with this action
    // We'll throw an error. In a real app, you would get this from the session.
    throw new Error("User authentication not available in this server action context.");
}

export async function getDesignInspirationAction(input: DesignInspirationInput) {
    try {
        const result = await designInspiration(input);
        return result;
    } catch (error) {
        console.error("Error getting design inspiration:", error);
        throw new Error("Failed to get design inspiration. Please try again.");
    }
}

export async function sendContactMessageAction(input: ContactFlowInput) {
    try {
        const result = await contactFlow(input);
        return result;
    } catch (error) {
        console.error("Error sending contact message:", error);
        throw new Error("Failed to send contact message. Please try again.");
    }
}

// These actions are placeholders as server actions in Next.js do not have user context by default
// without additional session management setup (e.g., next-auth).
// A full implementation would require securely getting the user's UID.

export async function updateUserProfileAction(data: { fullName: string }) {
    // This is a mock implementation.
    console.log("Attempting to update profile for a user with:", data);
    // In a real app, you would get user UID from the session.
    const mockUid = "mock-user-id-for-dev"; // Replace with real UID logic
    if (!mockUid) throw new Error("User not authenticated.");

    const userDocRef = doc(adminDb, "users", mockUid);
    await updateDoc(userDocRef, { fullName: data.fullName });
    revalidatePath('/account');
    return { success: true, message: "Profile updated successfully." };
}


export async function deleteUserAccountAction() {
    // This is a mock implementation.
    console.log("Attempting to delete user account.");
    // In a real app, you would get user UID from the session.
    const mockUid = "mock-user-id-for-dev"; // Replace with real UID logic
    if (!mockUid) throw new Error("User not authenticated.");

    // Delete from Firestore
    const userDocRef = doc(adminDb, "users", mockUid);
    await deleteDoc(userDocRef);

    // Delete from Firebase Auth
    // NOTE: Deleting user from Auth is disabled in this mock.
    // await getAuth(adminApp).deleteUser(mockUid);

    revalidatePath('/');
    return { success: true, message: "Account deleted successfully." };
}
