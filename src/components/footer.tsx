import { Logo } from './logo';
import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Your reliable partner for comfortable and safe journeys. Book your ride with Pandey Taxi Service today.
            </p>
             <div className="mt-6 flex gap-4">
                <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary"><Facebook className="h-6 w-6" /></a>
                <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary"><Twitter className="h-6 w-6" /></a>
                <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary"><Instagram className="h-6 w-6" /></a>
             </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:col-span-2">
            <div>
              <p className="font-headline font-medium text-foreground">Services</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Airport Transfer</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">City Tours</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Corporate Rides</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Outstation Trips</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-headline font-medium text-foreground">Company</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/#about" className="text-muted-foreground hover:text-primary">About</Link></li>
                <li><Link href="/#contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
                <li><Link href="/#booking" className="text-muted-foreground hover:text-primary">Booking</Link></li>
                <li><Link href="/#payment" className="text-muted-foreground hover:text-primary">Payment</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-headline font-medium text-foreground">Legal</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Pandey Taxi Service. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
