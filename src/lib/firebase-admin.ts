import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

// Ensure the service account key is properly parsed.
// It should be a stringified JSON object in the environment variables.
const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
const serviceAccount = serviceAccountString
  ? JSON.parse(serviceAccountString)
  : undefined;

// Initialize Firebase Admin SDK only if it hasn't been initialized yet.
if (!admin.apps.length) {
  try {
    if (serviceAccount) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      });
    } else {
        // In a Vercel environment, you might use Application Default Credentials
        // This will try to initialize without a service account key if not provided.
        console.log("Initializing Firebase Admin with Application Default Credentials.");
        admin.initializeApp();
    }
  } catch (e) {
    console.error('Firebase admin initialization error', e);
  }
}

export const adminApp = admin.app();
export const db = getFirestore(adminApp);
