
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { bookingSchema, type BookingSchema } from '@/lib/schemas';
import { useFirestore } from '@/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { displaySubmissionStatus } from '@/ai/flows/display-submission-status';


export function BookingForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firestore = useFirestore();

  const form = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      contactNumber: '',
      pickupLocation: '',
      dropOffLocation: '',
      pickupTime: '',
    },
  });

  async function onSubmit(data: BookingSchema) {
    if (!firestore) {
        toast({
            variant: 'destructive',
            title: 'Submission Failed',
            description: 'Firestore is not available. Please try again later.',
        });
        return;
    }
    setIsSubmitting(true);

    try {
        const [hours, minutes] = data.pickupTime.split(':');
        const pickupDateTime = new Date();
        pickupDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

        await addDoc(collection(firestore, 'bookings'), {
            name: data.name,
            contact: data.contactNumber,
            pickupPoint: data.pickupLocation,
            dropOffPoint: data.dropOffLocation,
            dateTime: Timestamp.fromDate(pickupDateTime),
            status: 'pending',
            customerId: null,
        });

        try {
            const orderId = uuidv4().slice(0, 8).toUpperCase();
            const aiResponse = await displaySubmissionStatus({
                orderId: orderId,
                estimatedResponseTime: '15 minutes',
            });
            toast({
                title: 'Booking Submitted!',
                description: aiResponse.message,
            });
            form.reset();
        } catch (aiError) {
             console.error('AI submission status error:', aiError);
             toast({
                title: 'Booking Submitted!',
                description: 'Your booking has been received. We will contact you shortly.',
            });
            form.reset();
        }

    } catch (error) {
        console.error('Firestore error:', error);
        toast({
            variant: 'destructive',
            title: 'Submission Failed',
            description: 'Could not save your booking. Please check your connection and try again.',
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader className="text-center">
        <div className="mx-auto w-fit rounded-full bg-primary/10 p-3">
          <MapPin className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="mt-4 font-headline text-3xl">Book Your Ride</CardTitle>
        <CardDescription>
          Fill out the form below to book your taxi. We'll confirm your ride shortly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label>Full Name <span className="text-destructive">*</span></Label>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <Label>Contact Number <span className="text-destructive">*</span></Label>
                  <FormControl>
                    <Input type="tel" placeholder="Enter your contact number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pickupLocation"
              render={({ field }) => (
                <FormItem>
                  <Label>Pickup Location <span className="text-destructive">*</span></Label>
                  <FormControl>
                    <Input placeholder="Enter pickup address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="dropOffLocation"
              render={({ field }) => (
                <FormItem>
                  <Label>Drop-off Location <span className="text-destructive">*</span></Label>
                  <FormControl>
                    <Input placeholder="Enter drop-off address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pickupTime"
              render={({ field }) => (
                <FormItem>
                  <Label>Pickup Time <span className="text-destructive">*</span></Label>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Booking
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              After confirming your booking, we recommend calling us for further details.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
