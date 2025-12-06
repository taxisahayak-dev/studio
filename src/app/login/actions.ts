'use server';

import { z } from 'zod';
import { initializeFirebase } from '@/firebase';
import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function handleLogin(data: z.infer<typeof loginSchema>) {
  const parsedData = loginSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: 'Invalid data provided.' };
  }

  const { email, password } = parsedData.data;

  try {
    const { auth } = initializeFirebase();
    
    // In a real-world scenario, you wouldn't automatically create a user on failed login.
    // For this demonstration, if the admin user doesn't exist, we create it.
    // This is for setup purposes only and should be handled differently in production
    // (e.g., a separate admin creation script).
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
            // If the user does not exist, create it.
            // This is a simplified setup flow.
            await createUserWithEmailAndPassword(auth, email, password);
            // Now, sign in with the newly created user
            await signInWithEmailAndPassword(auth, email, password);
        } else {
            // For other errors (like wrong password), re-throw to be caught by the outer catch block.
            throw error;
        }
    }
    
    return { success: true, message: 'Login successful.' };

  } catch (error: any) {
    console.error('Login error:', error.code, error.message);
    // Provide a generic error message for security reasons.
    return { success: false, message: 'Invalid admin credentials.' };
  }
}
