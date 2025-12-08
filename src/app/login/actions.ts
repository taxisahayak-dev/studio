
'use server';

import { z } from 'zod';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { getApps, initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase/config';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// This is a temporary app instance for server-side actions.
// It's separate from the client-side initialization.
const app = getApps().length
  ? getApps()[0]!
  : initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

const ADMIN_EMAIL = "nikhilpandit9046@gmail.com";
const ADMIN_PASSWORD = "nikhil@9948";

export async function handleLogin(data: z.infer<typeof loginSchema>) {
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: 'Invalid data format.' };
  }

  const { email, password } = parsed.data;

  // Immediately reject if credentials don't match the hardcoded admin values.
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return { success: false, message: 'Invalid admin credentials.' };
  }

  try {
    // If credentials are correct, try to sign in. This creates the session.
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true, message: 'Login successful!' };
  } catch (error: any) {
    // If sign-in fails because the user doesn't exist, create the admin user.
    // This is a one-time setup for the very first login.
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        // After creating, sign in again to establish the session.
        await signInWithEmailAndPassword(auth, email, password);
        return { success: true, message: 'Admin account created and logged in.' };
      } catch (creationError: any) {
        console.error('Firebase Admin Creation Error:', creationError.message);
        return { success: false, message: 'Failed to create admin account.' };
      }
    }

    // Handle other errors (e.g., network issues)
    console.error('Firebase Login Error:', error.message);
    return { success: false, message: 'An error occurred during login.' };
  }
}
