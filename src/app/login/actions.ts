
'use server';

import { z } from 'zod';
import { initializeFirebase } from '@/firebase';
import { 
  signInWithEmailAndPassword, 
  getAuth, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const ADMIN_EMAIL = "nikhilpandit9046@gmail.com";
const ADMIN_PASSWORD = "nikhil@9948";

export async function handleLogin(data: z.infer<typeof loginSchema>) {
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: "Invalid data" };
  }

  const { email, password } = parsed.data;

  // Immediately reject if credentials don't match the hardcoded admin values
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return { success: false, message: "Invalid admin credentials" };
  }

  try {
    const { auth } = initializeFirebase();

    try {
      // First, try to sign in
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
    } catch (error: any) {
      // If sign-in fails because the user doesn't exist, create the user
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
        try {
          await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
        } catch (creationError: any) {
          // If creation also fails (e.g., weak password, email already exists with different credential), fail gracefully
          console.log("Firebase creation error:", creationError.code, creationError.message);
          return { success: false, message: "Could not create admin account." };
        }
      } else {
        // For any other sign-in error, re-throw to be caught by the outer block
        throw error;
      }
    }

    return { success: true, message: "Login successful" };
  } catch (error: any) {
    console.log("Firebase login error:", error.code, error.message);
    return { success: false, message: "Login failed. Please try again." };
  }
}
