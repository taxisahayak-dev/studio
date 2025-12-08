
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
import { handleBookingSubmission } from './actions';

export function BookingForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      contactNumber: '',
      pickupLocation: '',
      pickupTime: '',
    },
  });

  async function onSubmit(data: BookingSchema) {
    setIsSubmitting(true);
    const result = await handleBookingSubmission(data);
    setIsSubmitting(false);

    if (result.success && result.message) {
      toast({
        title: 'Booking Submitted!',
        description: result.message,
      });
      form.reset();
    } else {
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: result.message || 'An unexpected error occurred.',
      });
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
