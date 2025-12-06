'use server';

import { z } from 'zod';
import { initializeFirebase } from '@/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const loginSchema = z.object({
  adminName: z.string(),
  password: z.string(),
});

export async function handleLogin(data: z.infer<typeof loginSchema>) {
  const parsedData = loginSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: 'Invalid data provided.' };
  }

  const { adminName, password } = parsedData.data;

  if (adminName !== 'NikhilPandey951357' || password !== 'NikhilisNikhil') {
    return { success: false, message: 'Invalid admin name or password.' };
  }

  const adminEmail = 'nikhilpandey951357@example.com';

  try {
    const { auth } = initializeFirebase();
    try {
      // First, try to sign in.
      await signInWithEmailAndPassword(auth, adminEmail, password);
    } catch (error: any) {
      // If the user does not exist (invalid-credential is the code for user not found with email/pass), create them.
      if (error.code === 'auth/invalid-credential') {
        await createUserWithEmailAndPassword(auth, adminEmail, password);
      } else {
        // For other errors (like wrong password), re-throw to be caught below.
        throw error;
      }
    }
    return { success: true };
  } catch (error: any) {
    let message = 'An unexpected error occurred during login.';
    if (error.code) {
      switch (error.code) {
        case 'auth/wrong-password':
          message = 'Invalid password.';
          break;
        case 'auth/invalid-email':
          message = 'The configured admin email is invalid.';
          break;
        default:
          message = 'Login failed. Please try again.';
      }
    }
    console.error('Login error:', error);
    return { success: false, message };
  }
}
