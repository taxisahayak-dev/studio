import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle, Clock, MapPin, ShieldCheck, Star, Users, Car, Phone, Mail } from 'lucide-react';
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

const UpiLogo = () => (
  <svg width="100" height="40" viewBox="0 0 128 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.496 11.72H9.84V33.44H2.496V11.72Z" fill="#F79533"/>
    <path d="M10.736 11.72H18.08V33.44H10.736V11.72Z" fill="#F79533"/>
    <path d="M19.008 11.72H26.352V33.44H19.008V11.72Z" fill="#F79533"/>
    <path d="M27.248 11.72H34.592V33.44H27.248V11.72Z" fill="#F79533"/>
    <path d="M37.6001 25.172C39.4641 25.172 40.9441 24.596 42.0401 23.444L40.2641 21.344C39.5441 21.932 38.6961 22.226 37.7201 22.226C36.1601 22.226 35.3201 21.236 35.3201 19.64V11.72H42.5921V8.58799H32.2481V19.532C32.2481 23.168 34.3361 25.172 37.6001 25.172Z" fill="#005A9E"/>
    <path d="M56.884 8.58799L51.94 25.064H48.484L47.068 19.892H47.004C46.508 21.656 45.484 25.064 42.068 25.064C39.292 25.064 37.492 23.048 37.492 19.596C37.492 16.056 39.436 13.98 42.332 13.98C44.492 13.98 45.836 15.016 46.544 16.6L48.248 9.92C46.844 8.996 44.932 8.58799 42.612 8.58799C38.004 8.58799 34.42 11.852 34.42 19.596C34.42 25.592 38.292 28.2 42.74 28.2C44.504 28.2 46.316 27.704 47.9 26.656L51.34 11.72H57.58L52.516 28.064H55.916L60.036 8.58799H56.884Z" fill="#005A9E"/>
    <path d="M63.8347 8.58799V28.064H66.8587V11.72H73.0427V8.58799H63.8347Z" fill="#005A9E"/>
    <path d="M83.4735 25.172C85.3375 25.172 86.8175 24.596 87.9135 23.444L86.1375 21.344C85.4175 21.932 84.5695 22.226 83.5935 22.226C82.0335 22.226 81.1935 21.236 81.1935 19.64V11.72H88.4655V8.58799H78.1215V19.532C78.1215 23.168 80.2095 25.172 83.4735 25.172Z" fill="#005A9E"/>
    <path d="M90.1557 11.72H93.3637V28.064H96.3877V11.72H99.5957V8.58799H90.1557V11.72Z" fill="#EE6524"/>
    <path d="M109.117 28.2C113.437 28.2 116.509 25.148 116.509 20.312V8.58799H113.485V20.468C113.485 23.492 111.621 25.124 109.117 25.124C106.613 25.124 104.749 23.492 104.749 20.468V8.58799H101.725V20.312C101.725 25.148 104.797 28.2 109.117 28.2Z" fill="#EE6524"/>
    <path d="M125.163 11.72L127.323 20.444C127.451 20.94 127.515 21.576 127.515 22.384V28.064H124.611V22.06C124.611 21.528 124.559 21.052 124.443 20.644L122.187 11.72H118.923L115.115 28.064H118.235L121.011 15.632L123.331 28.064H124.355L127.995 8.58799L125.163 11.72Z" fill="#EE6524"/>
  </svg>
);

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
