import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center" aria-label="Pandey Taxi Service Home">
      <span className="font-headline text-base font-bold tracking-tight text-primary">
        Pandey Taxi Service
      </span>
    </Link>
  );
}
