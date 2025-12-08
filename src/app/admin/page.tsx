"use client";

import { useEffect, useMemo, useState } from "react";
import { getAuth, onAuthStateChanged }from "firebase/auth";
import { initializeFirebase } from "@/firebase";
import { useRouter } from "next/navigation";
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Loader2, ShieldCheck, LogOut, PackageOpen, PackageCheck, Package, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { collection, query, orderBy, doc, updateDoc } from 'firebase/firestore';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast";


export default function AdminPanel() {
  const { auth } = initializeFirebase();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const bookingsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null; // Wait for user to be authenticated
    return query(collection(firestore, 'bookings'), orderBy('dateTime', 'desc'));
  }, [firestore, user]);

  const { data: bookings, isLoading: isLoadingBookings } = useCollection(bookingsQuery);

  const receivedBookings = useMemo(() => {
    return bookings?.filter(b => b.status === 'pending' || b.status === 'confirmed') || [];
  }, [bookings]);

  const completedBookings = useMemo(() => {
    return bookings?.filter(b => b.status === 'completed') || [];
  }, [bookings]);


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

  const handleUpdateStatus = async (bookingId: string, newStatus: 'confirmed' | 'completed') => {
    if (!firestore) return;
    try {
        const bookingRef = doc(firestore, 'bookings', bookingId);
        await updateDoc(bookingRef, { status: newStatus });
        toast({
            title: "Booking Updated",
            description: `The booking has been marked as ${newStatus}.`,
        });
    } catch(error) {
        console.error("Error updating booking status: ", error);
        toast({
            variant: "destructive",
            title: "Update Failed",
            description: "Could not update the booking status.",
        });
    }
  }

  if (loading || isUserLoading) return <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>;
      
  const renderBookingsTable = (data: typeof bookings, isReceivedTable: boolean) => {
    if (!data || data.length === 0) return null;
    return (
        <div className="overflow-x-auto rounded-md border">
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Pickup</TableHead>
                <TableHead>Drop-off</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                {isReceivedTable && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
            </TableHeader>
            <TableBody>
            {data.map((booking) => (
                <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.name}</TableCell>
                <TableCell>{booking.contact}</TableCell>
                <TableCell>{booking.pickupPoint}</TableCell>
                <TableCell>{booking.dropOffPoint}</TableCell>
                <TableCell>
                    {booking.dateTime ? format(booking.dateTime.toDate(), 'PPP p') : 'N/A'}
                </TableCell>
                <TableCell>
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
                {isReceivedTable && (
                    <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                            {booking.status === 'pending' && (
                                <Button variant="outline" size="sm" onClick={() => handleUpdateStatus(booking.id, 'confirmed')}>
                                    <Check className="mr-2 h-4 w-4" />
                                    Confirm
                                </Button>
                            )}
                            {(booking.status === 'pending' || booking.status === 'confirmed') && (
                                <Button variant="secondary" size="sm" onClick={() => handleUpdateStatus(booking.id, 'completed')}>
                                    Mark as Completed
                                </Button>
                            )}
                        </div>
                    </TableCell>
                )}
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </div>
    )
  }

  const renderEmptyState = (title: string, description: string, icon: React.ReactNode) => {
    return (
        <div className="flex flex-col items-center justify-center rounded-md border-2 border-dashed py-16 text-center">
            {icon}
            <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
                {description}
            </p>
        </div>
    )
  }

  return (
    <div className="container mx-auto py-12 md:py-20">
      <Card className="mx-auto w-full max-w-6xl shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1.5">
            <CardTitle className="font-headline flex items-center gap-2 text-3xl">
              <ShieldCheck className="h-8 w-8 text-primary" />
              Admin Dashboard
            </CardTitle>
            {user && <CardDescription>Signed in as: {user.email}</CardDescription>}
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="received" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="received">Received Bookings</TabsTrigger>
                    <TabsTrigger value="completed">Completed Bookings</TabsTrigger>
                </TabsList>
                <TabsContent value="received" className="mt-6">
                    {isLoadingBookings && (
                        <div className="flex items-center justify-center py-10">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    )}
                    {!isLoadingBookings && receivedBookings.length > 0 && renderBookingsTable(receivedBookings, true)}
                    {!isLoadingBookings && receivedBookings.length === 0 && renderEmptyState(
                        "No Received Bookings",
                        "New and confirmed bookings will appear here.",
                        <Package className="h-12 w-12 text-muted-foreground" />
                    )}
                </TabsContent>
                <TabsContent value="completed" className="mt-6">
                     {isLoadingBookings && (
                        <div className="flex items-center justify-center py-10">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    )}
                    {!isLoadingBookings && completedBookings.length > 0 && renderBookingsTable(completedBookings, false)}
                    {!isLoadingBookings && completedBookings.length === 0 && renderEmptyState(
                        "No Completed Bookings",
                        "Bookings marked as 'completed' will appear here.",
                        <PackageCheck className="h-12 w-12 text-muted-foreground" />
                    )}
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
