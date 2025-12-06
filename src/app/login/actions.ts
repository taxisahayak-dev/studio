'use server';

import { z } from 'zod';
import { initializeFirebase } from '@/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

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

  // Enforce specific admin credentials before hitting Firebase
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return { success: false, message: 'Invalid admin credentials.' };
  }

  try {
    const { auth } = initializeFirebase();
    
    try {
      // First, try to sign in.
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      // If sign-in fails because the user doesn't exist, create the user.
      // 'auth/invalid-credential' is the code for both user not found and wrong password.
      if (error.code === 'auth/invalid-credential') {
        try {
          // Attempt to create the user. This will only succeed if the user truly doesn't exist.
          await createUserWithEmailAndPassword(auth, email, password);
          // If creation is successful, no need to sign in again, as createUserWithEmailAndPassword also signs the user in.
        } catch (creationError: any) {
            // If user creation fails because the email already exists, it means the password was wrong in the initial sign-in attempt.
            if (creationError.code === 'auth/email-already-in-use') {
                 return { success: false, message: 'Invalid admin credentials.' };
            }
            // For any other creation error, return a generic message.
            throw creationError;
        }
      } else {
        // If the sign-in error is something else (e.g., network issue), re-throw it.
        throw error;
      }
    }
    
    return { success: true, message: 'Login successful.' };

  } catch (error: any) {
    console.error('Login error:', error.code, error.message);
    // Provide a more specific but still safe error for debugging, or a generic one.
    return { success: false, message: 'An unexpected error occurred during login.' };
  }
}
