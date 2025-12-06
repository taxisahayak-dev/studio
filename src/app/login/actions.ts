
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

  // Allow only 1 admin
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return { success: false, message: "Invalid admin credentials" };
  }

  try {
    const { auth } = initializeFirebase();

    // Try login
    try {
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
    } catch (error: any) {
      // If admin not found, create account
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-credential" ||
        error.code === "auth/invalid-email"
      ) {
        await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
        await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
      } else {
        throw error;
      }
    }

    return { success: true, message: "Login successful" };
  } catch (error: any) {
    console.log("Firebase login error:", error.code, error.message);
    return { success: false, message: "Login failed. Try again." };
  }
}
