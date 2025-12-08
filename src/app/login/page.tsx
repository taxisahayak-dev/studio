
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, KeyRound } from 'lucide-react';
import Link from 'next/link';
import { handleLogin } from './actions';
import { useUser } from '@/firebase';


const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isUserLoading } = useUser();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'nikhilpandit9046@gmail.com',
      password: '',
    },
  });

  useEffect(() => {
    // If the user object is available (meaning they are logged in), redirect them.
    if (user && !isUserLoading) {
      router.push('/admin');
    }
  }, [user, isUserLoading, router]);

  async function onSubmit(data: LoginFormValues) {
    setIsSubmitting(true);
    
    const result = await handleLogin(data);

    if (result.success) {
        toast({
            title: "Login Successful",
            description: "Verifying session, please wait...",
        });
        // The useEffect will handle the redirect once the user state is updated.
        // We don't need to manually stop the loader, as the page will redirect.
    } else {
        toast({
            variant: "destructive",
            title: "Login Failed",
            description: result.message,
        });
        setIsSubmitting(false); // Stop loading on failure
    }
  }
  
  // While firebase is checking auth state, show a loader
  if (isUserLoading) {
      return (
          <div className="flex min-h-[calc(100vh-14rem)] items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
      );
  }

  // If user is already logged in, they will be redirected by useEffect.
  // We can show a message here or just let it be blank until redirect.
  if (user) {
       return (
          <div className="flex min-h-[calc(100vh-14rem)] items-center justify-center">
             <div className="text-center">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Redirecting to dashboard...</p>
             </div>
          </div>
      );
  }


  return (
    <div className="flex min-h-[calc(100vh-14rem)] items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <KeyRound className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="admin@example.com"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="w-full text-center text-sm text-muted-foreground">
            <Link href="/" className="underline hover:text-primary">
              Return to Home
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
