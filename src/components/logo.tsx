import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Pandey Taxi Service Home">
      <Image 
        src="/Gemini_Generated_Image_889fc2889fc2889f.png" 
        alt="Pandey Taxi Service Logo"
        width={24}
        height={24}
        className="h-6 w-6"
      />
      <span className="font-headline text-base font-bold tracking-tight text-primary">
        Pandey Taxi Service
      </span>
    </Link>
  );
}
