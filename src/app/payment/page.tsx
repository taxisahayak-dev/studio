import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Image from 'next/image';

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


export default function PaymentPage() {
  return (
    <div className="container mx-auto py-12 md:py-20">
      <Card className="w-full max-w-4xl shadow-lg mx-auto">
        <CardHeader className="text-center pb-2">
            <CardTitle className="font-headline text-3xl">Pay Online - We Accept all Digital Payment</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <UpiLogo />
                    <p className="mt-6 text-lg font-semibold text-foreground">
                        Pay online 20% booking amount confirmation charge
                    </p>
                    <CardDescription className="mt-2">
                        Scan the QR code with any UPI-enabled app to make the payment. 
                        Your booking will be confirmed upon successful transaction.
                    </CardDescription>
                     <p className="mt-4 text-sm text-muted-foreground">
                        Thank you for choosing Pandey Taxi Service.
                    </p>
                </div>
                 <div className="flex flex-col items-center justify-center">
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
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
