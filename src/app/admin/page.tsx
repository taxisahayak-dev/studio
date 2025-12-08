
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from 'lucide-react';
import AdminPanelContent from './AdminPanelContent'; 
import { useAuth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

const ADMIN_EMAIL = "nikhilpandit9046@gmail.com";

export default function AdminPanel() {
  const router = useRouter();
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === ADMIN_EMAIL) {
        setIsAuthorized(true);
      } else {
        router.replace('/login');
      }
      // setLoading(false) should be inside the `else` and `if` blocks
      // to avoid rendering content before redirect is complete.
      // But for this case, we can set it here as the conditional rendering
      // of AdminPanelContent depends on isAuthorized.
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // Only render the AdminPanelContent if authorized.
  // This prevents the child component from trying to fetch data before auth is confirmed.
  return isAuthorized ? <AdminPanelContent /> : null;
}
