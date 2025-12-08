
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, Phone, LogOut } from 'lucide-react';
import { Logo } from './logo';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fab"
    data-icon="whatsapp"
    className="h-5 w-5"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    {...props}
  >
    <path
      fill="currentColor"
      d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.8-16.2-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
    ></path>
  </svg>
);

const navLinks = [
  { href: '/#', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#booking', label: 'Booking' },
  { href: '/review', label: 'Reviews' },
  { href: '/#contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsAdmin(localStorage.getItem('isAdmin') === 'true');
  }, []);

  useEffect(() => {
    if (!isClient || pathname !== '/') return;

    const handleHashChange = () => {
      setActiveLink(window.location.hash);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id) {
                const newHash = `#${id}`;
                if(window.location.hash !== newHash) {
                    history.replaceState(null, '', `/#${id}`);
                    handleHashChange();
                }
            }
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    
    // Set initial active link on mount
    handleHashChange();
    
    window.addEventListener('hashchange', handleHashChange, { passive: true });

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
       document.querySelectorAll('section[id]').forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, [isClient, pathname]);

  const getLinkClass = (href: string) => {
    if (!isClient) return 'text-muted-foreground';
    
    // Exact match for non-hash links
    if (!href.includes('#')) {
      return pathname === href ? 'text-primary' : 'text-muted-foreground';
    }

    // Hash link logic for homepage
    if (href.startsWith('/#')) {
        if(pathname !== '/') return 'text-muted-foreground'
        const normalizedHref = href.substring(1); // remove /
        
        if (activeLink === '' && (normalizedHref === '#' || normalizedHref === '')) {
          return 'text-primary';
        }

        return activeLink === normalizedHref ? 'text-primary' : 'text-muted-foreground';
    }
    
    return pathname === href ? 'text-primary' : 'text-muted-foreground'
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    router.push('/login');
  };

  const renderNavLinks = () => {
      const links = [...navLinks];
      if (isAdmin) {
          links.push({ href: '/admin', label: 'Dashboard' });
      }
      return links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => isOpen && setIsOpen(false)}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                 getLinkClass(link.href)
              )}
            >
              {link.label}
            </Link>
      ))
  }
  
  const renderMobileNavLinks = () => {
      const links = [...navLinks];
      if (isAdmin) {
          links.push({ href: '/admin', label: 'Dashboard' });
      }
      return links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                'text-lg font-medium transition-colors hover:text-primary',
                getLinkClass(link.href)
              )}
            >
              {link.label}
            </Link>
      ))
  }

  if (!isClient) {
    // Render a simplified header on the server to avoid hydration errors
    return (
     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
         <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className='text-sm font-medium transition-colors hover:text-primary text-muted-foreground'
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
                Contact Us
            </Button>
            <Button asChild>
                <Link href="/#booking">Book a Ride</Link>
            </Button>
            <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
            </Button>
        </div>
      </div>
     </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-6 md:flex">
          {renderNavLinks()}
        </nav>

        <div className="flex items-center gap-2">
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden md:flex">
                Contact Us
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <a
                  href="https://wa.me/917060610430"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <WhatsAppIcon />
                  WhatsApp
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="tel:7060610430" className="flex items-center gap-2">
                  <Phone />
                  Call Us
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button asChild>
            <Link href="/#booking">Book a Ride</Link>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="p-4">
                <div className="mb-8">
                  <Logo />
                </div>
                <nav className="flex flex-col gap-4">
                  {renderMobileNavLinks()}
                </nav>
                <div className="mt-6 flex flex-col gap-4">
                  <Button asChild className="w-full" onClick={() => setIsOpen(false)}>
                      <Link href="/#booking">Book a Ride</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                  >
                    <a
                      href="https://wa.me/917060610430"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                    >
                      <WhatsAppIcon />
                      WhatsApp
                    </a>
                  </Button>
                  <Button asChild className="w-full" variant="outline">
                    <a
                      href="tel:7060610430"
                      onClick={() => setIsOpen(false)}
                    >
                      <Phone />
                      Call Us
                    </a>
                  </Button>
                  {isAdmin && (
                     <Button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full" variant="destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
