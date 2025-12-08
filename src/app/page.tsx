
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle, Clock, MapPin, ShieldCheck, Star, Car, Phone, Mail } from 'lucide-react';
import { BookingForm } from './booking/booking-form';
import { ContactForm } from './contact/contact-form';

const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-image');
const driverImage = PlaceHolderImages.find((p) => p.id === 'feature-1');

const features = [
  {
    icon: <Clock className="h-10 w-10 text-accent" />,
    title: '24/7 Availability',
    description: 'We are always available, day or night, to get you where you need to go.',
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-accent" />,
    title: 'Safety First',
    description: 'Our drivers are vetted and our vehicles are regularly maintained for your safety.',
  },
  {
    icon: <Star className="h-10 w-10 text-accent" />,
    title: 'Professional Drivers',
    description: 'Experience a pleasant journey with our courteous and professional drivers.',
  },
  {
    icon: <MapPin className="h-10 w-10 text-accent" />,
    title: 'Wide Coverage',
    description: 'We cover the entire city and surrounding areas, including airport transfers.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section id="/" className="relative h-[60vh] w-full md:h-[80vh]">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="font-headline text-4xl font-bold leading-tight md:text-6xl">
            Your Journey, Our Priority
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-200 md:text-xl">
            Experience reliable, safe, and comfortable rides with Pandey Taxi Service.
            Book your next trip in minutes.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="#booking">Book a Ride Now</Link>
          </Button>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold text-primary md:text-4xl">Why Choose Us?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              We are committed to providing a superior travel experience with every ride.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <h3 className="mt-6 font-headline text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="bg-card py-16 md:py-24">
        <div className="container mx-auto text-center">
          <h2 className="font-headline text-3xl font-bold text-primary md:text-4xl">Our Services</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            From quick city trips to airport transfers, we've got you covered.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center justify-center gap-2">
                  <MapPin className="text-accent" /> Airport Transfers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Punctual and hassle-free rides to and from the airport. We track your flight to ensure timely pickup.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center justify-center gap-2">
                  <Clock className="text-accent" /> City Rides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Need to get around town? Our city taxis are available 24/7 for your convenience.
                </p>
              </CardContent>
            </Card>
            <Card className="md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="font-headline flex items-center justify-center gap-2">
                  <CheckCircle className="text-accent" /> Corporate Travel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Professional and reliable service for your business travel needs. Monthly billing available.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section id="booking" className="py-12 md:py-20">
        <div className="container mx-auto">
            <div className="flex justify-center">
                <BookingForm />
            </div>
        </div>
      </section>

      <section id="about" className="py-12 md:py-20">
        <div className="container mx-auto">
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
      </section>

      <section id="contact" className="py-12 md:py-20 bg-background">
        <div className="container mx-auto">
            <div className="grid items-start gap-12 md:grid-cols-2">
                <div className="space-y-8">
                    <div className="space-y-2">
                        <h1 className="font-headline text-4xl font-bold text-primary">Get in Touch</h1>
                        <p className="text-lg text-muted-foreground">
                            Have questions or need assistance? Our team is here to help. Reach out to us via the form, or through our contact details below.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-accent/10 p-3"><Phone className="h-5 w-5 text-accent" /></div>
                            <div>
                                <p className="font-semibold text-foreground">Phone</p>
                                <a href="tel:7060610430" className="text-muted-foreground hover:text-primary">7060610430</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-accent/10 p-3"><Mail className="h-5 w-5 text-accent" /></div>
                            <div>
                                <p className="font-semibold text-foreground">Email</p>
                                <a href="mailto:vpandy00755@gmail.com" className="text-muted-foreground hover:text-primary">vpandy00755@gmail.com</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="mt-1 rounded-full bg-accent/10 p-3"><MapPin className="h-5 w-5 text-accent" /></div>
                            <div>
                                <p className="font-semibold text-foreground">Address</p>
                                <p className="text-muted-foreground">BDA Colony Badaun Road <br />Bareilly UP</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Card className="w-full shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Send us a Message</CardTitle>
                    <CardDescription>
                    We'll respond to your inquiry as soon as possible.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ContactForm />
                </CardContent>
                </Card>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-12 text-center sm:px-6 lg:px-8">
          <h2 className="font-headline text-3xl font-bold sm:text-4xl">Ready to Ride?</h2>
          <p className="mx-auto mt-4 max-w-xl">
            Book your taxi in just a few clicks and enjoy a seamless travel experience.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" variant="secondary">
              <Link href="#booking">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

    