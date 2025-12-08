'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { initializeFirebase, useFirestore } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

export function BookingForm() {
  const { toast } = useToast();
  const firestore = useFirestore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [slot, setSlot] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!firestore) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Firestore is not initialized.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await addDoc(collection(firestore, "bookings"), {
        name,
        contact: phone, // Assuming phone is the contact
        pickupPoint: 'N/A', // From your new fields, pickup/dropoff are not there
        dropOffPoint: 'N/A',
        dateTime: new Date(), // Using current date as per your new handler
        status: 'pending',
        customerId: null,
        email: email, // added from your new fields
        slot: slot, // added from your new fields
        message: message, // added from your new fields
        createdAt: new Date(),
      });

      toast({
        title: "Booking Submitted!",
        description: "We will get back to you shortly.",
      });
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setSlot('');
      setMessage('');

    } catch (error) {
      console.log("Error saving booking:", error);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slot">Preferred Slot (e.g., "Morning", "4:00 PM")</Label>
            <Input id="slot" value={slot} onChange={(e) => setSlot(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Booking
          </Button>
           <p className="text-center text-sm text-muted-foreground">
            After confirming your booking, we recommend calling us for further details.
        </p>
        </form>
      </CardContent>
    </Card>
  );
}
