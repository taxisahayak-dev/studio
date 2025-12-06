import Link from 'next/link';
import { Car } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Pandey Taxi Service Home">
      <Car className="h-7 w-7 text-primary" />
      <span className="font-headline text-lg font-bold tracking-tight text-primary">
        Pandey Taxi
      </span>
    </Link>
  );
}
