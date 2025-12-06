import { BookingForm } from './booking-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

export default function BookingPage() {
  return (
    <div className="container mx-auto py-12 md:py-20">
      <div className="flex justify-center">
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
            <BookingForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
