import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Users, Car, ShieldCheck, Star } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const driverImage = PlaceHolderImages.find((p) => p.id === 'feature-1');

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 md:py-20">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold text-primary">About Pandey Taxi Service</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
          Your trusted partner for reliable and professional transportation. We are committed to providing safe, comfortable, and timely taxi services to our valued customers.
        </p>
      </div>

      <div className="mt-16 grid gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="font-headline text-3xl font-bold text-primary">Our Mission</h2>
          <p className="text-muted-foreground">
            Our mission is to offer a superior travel experience that is both affordable and dependable. We strive to exceed customer expectations with every ride, ensuring a seamless journey from start to finish. We believe in building long-term relationships with our clients based on trust and quality service.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <ShieldCheck className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
              <div>
                <h3 className="font-semibold">Safety and Security</h3>
                <p className="text-sm text-muted-foreground">Your safety is our top priority. Our drivers are thoroughly vetted, and our vehicles are maintained to the highest standards.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Star className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
              <div>
                <h3 className="font-semibold">Customer Satisfaction</h3>
                <p className="text-sm text-muted-foreground">We are dedicated to providing excellent customer service. Our professional and courteous drivers are here to make your ride pleasant.</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          {driverImage && (
            <Image
              src={driverImage.imageUrl}
              alt={driverImage.description}
              width={600}
              height={400}
              className="rounded-lg object-cover shadow-lg"
              data-ai-hint={driverImage.imageHint}
            />
          )}
        </div>
      </div>

       <div className="mt-20">
        <div className="text-center">
            <h2 className="font-headline text-3xl font-bold text-primary">Our Fleet</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              We offer a diverse range of vehicles to suit your needs, from solo trips to group travel.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
             <Card>
              <CardHeader className="items-center">
                <Car className="h-10 w-10 text-accent" />
                <CardTitle className="font-headline pt-2">Sedans</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Comfortable and stylish sedans for your everyday travel and business trips.
                </p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="items-center">
                <Car className="h-10 w-10 text-accent" />
                <CardTitle className="font-headline pt-2">SUVs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Spacious SUVs perfect for family outings and extra luggage.
                </p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="items-center">
                <Car className="h-10 w-10 text-accent" />
                <CardTitle className="font-headline pt-2">Luxury Cars</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Travel in style and comfort with our premium luxury vehicles for special occasions.
                </p>
              </CardContent>
            </Card>
          </div>
       </div>
    </div>
  );
}
