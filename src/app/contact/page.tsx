import { ContactForm } from './contact-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 md:py-20">
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
                        <a href="tel:+911234567890" className="text-muted-foreground hover:text-primary">+91 123 456 7890</a>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                     <div className="rounded-full bg-accent/10 p-3"><Mail className="h-5 w-5 text-accent" /></div>
                    <div>
                        <p className="font-semibold text-foreground">Email</p>
                        <a href="mailto:contact@pandeytaxi.com" className="text-muted-foreground hover:text-primary">contact@pandeytaxi.com</a>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-full bg-accent/10 p-3"><MapPin className="h-5 w-5 text-accent" /></div>
                     <div>
                        <p className="font-semibold text-foreground">Address</p>
                        <p className="text-muted-foreground">123 Taxi Stand, <br />New Delhi, India</p>
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
  );
}
