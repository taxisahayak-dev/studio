import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { QrCode } from 'lucide-react';
import Image from 'next/image';

export default function PaymentPage() {
  return (
    <div className="container mx-auto flex min-h-[60vh] items-center justify-center py-12 md:py-20">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <QrCode className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="mt-4 font-headline text-3xl">Make a Payment</CardTitle>
          <CardDescription>
            Scan the QR code below with your payment app to complete your transaction.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="relative h-64 w-64 rounded-lg border bg-muted/50 p-4">
             <Image
                src="https://picsum.photos/seed/qr-code/256/256"
                alt="QR Code for payment"
                width={256}
                height={256}
                className="rounded-md object-cover"
                data-ai-hint="QR code"
            />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Thank you for choosing Pandey Taxi Service.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
