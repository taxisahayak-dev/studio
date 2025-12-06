'use server';

import { z } from 'zod';
import { initializeFirebase } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function handleLogin(data: z.infer<typeof loginSchema>) {
  const parsedData = loginSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: 'Invalid data provided.' };
  }

  try {
    const { auth } = initializeFirebase();
    await signInWithEmailAndPassword(auth, parsedData.data.email, parsedData.data.password);
    return { success: true };
  } catch (error: any) {
    let message = 'An unexpected error occurred.';
    if (error.code) {
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          message = 'Invalid email or password.';
          break;
        case 'auth/invalid-email':
          message = 'Please enter a valid email address.';
          break;
        default:
          message = 'Login failed. Please try again.';
      }
    }
    console.error('Login error:', error);
    return { success: false, message };
  }
}
