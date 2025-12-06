'use server';

import { z } from 'zod';
import { initializeFirebase } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

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

  // For now, we'll use a hardcoded admin username and map it to an email.
  // In a real application, you would look up the user's email from a database
  // based on their username.
  if (adminName !== 'NikhilPandey951357' || password !== 'NikhilisNikhil') {
    return { success: false, message: 'Invalid admin name or password.' };
  }

  const adminEmail = 'nikhilpandey951357@example.com';

  try {
    const { auth } = initializeFirebase();
    await signInWithEmailAndPassword(auth, adminEmail, password);
    return { success: true };
  } catch (error: any) {
    let message = 'An unexpected error occurred.';
    if (error.code) {
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          message = 'Invalid admin name or password.';
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
