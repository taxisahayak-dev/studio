"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged }from "firebase/auth";
import { initializeFirebase } from "@/firebase";
import { useRouter } from "next/navigation";
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Loader2, ShieldCheck, LogOut, PackageOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { collection, query, orderBy } from 'firebase/firestore';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';


export default function AdminPanel() {
  const { auth } = initializeFirebase();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const bookingsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null; // Wait for user to be authenticated
    return query(collection(firestore, 'bookings'), orderBy('dateTime', 'desc'));
  }, [firestore, user]);

  const { data: bookings, isLoading: isLoadingBookings } = useCollection(bookingsQuery);


  useEffect(() => {
    if (!isUserLoading) {
      if (!user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }
  }, [auth, router, user, isUserLoading]);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    router.push('/login');
  };

  if (loading || isUserLoading) return <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>;

  return (
    <div className="container mx-auto py-12 md:py-20">
      <Card className="mx-auto w-full max-w-6xl shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1.5">
            <CardTitle className="font-headline flex items-center gap-2 text-3xl">
              <ShieldCheck className="h-8 w-8 text-primary" />
              Welcome Admin
            </CardTitle>
            {user && <CardDescription>Signed in as: {user.email}</CardDescription>}
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </CardHeader>
        <CardContent>
          <h2 className="mb-4 font-headline text-2xl font-semibold text-foreground">
            Recent Bookings
          </h2>
          {isLoadingBookings && (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {!isLoadingBookings && bookings && bookings.length > 0 && (
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Pickup</TableHead>
                    <TableHead>Drop-off</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.name}</TableCell>
                      <TableCell>{booking.contact}</TableCell>
                      <TableCell>{booking.pickupPoint}</TableCell>
                      <TableCell>{booking.dropOffPoint}</TableCell>
                      <TableCell>
                        {booking.dateTime ? format(booking.dateTime.toDate(), 'PPP p') : 'N/A'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            booking.status === 'confirmed'
                              ? 'default'
                              : booking.status === 'completed'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {booking.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {!isLoadingBookings && (!bookings || bookings.length === 0) && (
            <div className="flex flex-col items-center justify-center rounded-md border-2 border-dashed py-16 text-center">
                <PackageOpen className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">No Bookings Found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                    There are currently no bookings to display. New bookings will appear here.
                </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
