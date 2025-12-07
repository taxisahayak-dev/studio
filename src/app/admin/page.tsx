'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Loader2, ShieldCheck, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAuth, signOut } from 'firebase/auth';

export default function AdminDashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Wait until the initial loading is complete before checking for a user.
    // If loading is finished and there is still no user, then redirect.
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    router.push('/login');
  };

  // Display a loading indicator while the user's auth state is being checked.
  if (isUserLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // If after loading there is no user, this part will not be rendered because of the redirect.
  // But as a fallback, we can show nothing or a message.
  if (!user) {
    return null; // Or a message like "Redirecting..."
  }

  return (
    <div className="container mx-auto py-12 md:py-20">
      <Card className="mx-auto w-full max-w-4xl shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1.5">
            <CardTitle className="font-headline flex items-center gap-2 text-3xl">
              <ShieldCheck className="h-8 w-8 text-primary" />
              Admin Dashboard
            </CardTitle>
            <CardDescription>Welcome, {user.email}</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You have successfully logged in. This is your secure admin dashboard where you can manage bookings and other site content.
          </p>
          {/* Admin content will go here */}
        </CardContent>
      </Card>
    </div>
  );
}
