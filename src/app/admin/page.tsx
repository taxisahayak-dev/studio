
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useFirestore, useCollection } from '@/firebase';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Loader2, ShieldCheck, LogOut, PackageOpen, PackageCheck, Package, Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { collection, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
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
import { subMonths } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const ADMIN_EMAIL = "nikhilpandit9046@gmail.com";

export default function AdminPanel() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      router.replace('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  const firestore = useFirestore();

  const bookingsQuery = useMemo(() => {
    if (!firestore || loading) return null; // wait until admin session verified
    return query(collection(firestore, "bookings"), orderBy("dateTime", "desc"));
  }, [firestore, loading]);

  const { data: bookings, isLoading: isLoadingBookings } = useCollection(bookingsQuery);

  const receivedBookings = useMemo(() => {
    return bookings?.filter(b => b.status === 'pending' || b.status === 'confirmed') || [];
  }, [bookings]);

  const twoMonthsAgo = useMemo(() => subMonths(new Date(), 2), []);

  const completedBookings = useMemo(() => {
    return bookings?.filter(b => {
        if (b.status !== 'completed') return false;
        if (b.dateTime && typeof b.dateTime.toDate === 'function') {
            return b.dateTime.toDate() > twoMonthsAgo;
        }
        return false;
    }) || [];
  }, [bookings, twoMonthsAgo]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
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

  const handleDeleteBooking = async (bookingId: string) => {
    if (!firestore) return;
    try {
        const bookingRef = doc(firestore, 'bookings', bookingId);
        await deleteDoc(bookingRef);
        toast({
            title: "Booking Deleted",
            description: "The booking has been successfully removed.",
        });
    } catch(error) {
        console.error("Error deleting booking: ", error);
        toast({
            variant: "destructive",
            title: "Deletion Failed",
            description: "Could not delete the booking.",
        });
    }
  }


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

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
                <TableHead className="text-right">Actions</TableHead>
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
                <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                        {isReceivedTable && booking.status === 'pending' && (
                            <Button variant="outline" size="sm" onClick={() => handleUpdateStatus(booking.id, 'confirmed')}>
                                <Check className="mr-2 h-4 w-4" />
                                Confirm
                            </Button>
                        )}
                        {isReceivedTable && (booking.status === 'pending' || booking.status === 'confirmed') && (
                            <Button variant="secondary" size="sm" onClick={() => handleUpdateStatus(booking.id, 'completed')}>
                                Mark as Completed
                            </Button>
                        )}
                        {!isReceivedTable && (
                             <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete this booking
                                        and remove its data from our servers.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteBooking(booking.id)}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                </TableCell>
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
            <CardDescription>Signed in as: {ADMIN_EMAIL}</CardDescription>
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
                        "Completed bookings from the last two months will appear here.",
                        <PackageCheck className="h-12 w-12 text-muted-foreground" />
                    )}
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
