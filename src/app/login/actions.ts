'use server';

import { z } from 'zod';
import { initializeFirebase } from '@/firebase';
import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const ADMIN_EMAIL = 'nikhilpandit9045@gmail.com';
const ADMIN_PASSWORD = 'nikhil@9548';

export async function handleLogin(data: z.infer<typeof loginSchema>) {
  const parsedData = loginSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: 'Invalid data provided.' };
  }

  const { email, password } = parsedData.data;

  // Enforce specific admin credentials
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return { success: false, message: 'Invalid admin credentials.' };
  }

  try {
    const { auth } = initializeFirebase();
    
    try {
      // First, try to sign in with the admin credentials.
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
    } catch (error: any) {
        // If sign-in fails because the user doesn't exist, create the user.
        // This is a setup mechanism for the first login.
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
            await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
            // After creation, sign in again to establish the session.
            await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
        } else {
            // If the error is something else (like network error), throw it.
            throw error;
        }
    }
    
    return { success: true, message: 'Login successful.' };

  } catch (error: any) {
    console.error('Login error:', error.code, error.message);
    // Provide a generic error message for security reasons.
    return { success: false, message: 'An unexpected error occurred during login.' };
  }
}
