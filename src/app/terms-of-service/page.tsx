import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto py-12 md:py-20">
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-center text-3xl text-primary">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
          <p>
            These Terms of Service (“Terms”) govern your access to and use of our website, taxi booking services, and related features. By using our services, you agree to follow all rules and conditions mentioned below.
          </p>

          <div className="space-y-4">
            <h2 className="font-headline text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>By accessing or using our website, you confirm that:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>You have read and understood these Terms</li>
                <li>You are at least 18 years old, or using the service under guardian supervision</li>
                <li>You agree to comply with all policies, laws, and guidelines</li>
            </ul>
            <p className="mt-2">If you do not agree to these Terms, please stop using the website immediately.</p>
          </div>

           <div className="space-y-4">
            <h2 className="font-headline text-2xl font-semibold text-foreground">2. Services Provided</h2>
            <p>We offer:</p>
             <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Online taxi booking</li>
                <li>Ride confirmations</li>
                <li>Customer support</li>
                <li>Information related to pricing and travel routes</li>
            </ul>
             <p className="mt-2">We reserve the right to update or discontinue any service without prior notice.</p>
          </div>

          <div className="space-y-4">
            <h2 className="font-headline text-2xl font-semibold text-foreground">3. User Responsibilities</h2>
            <p>When using our services, you agree to:</p>
             <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Provide accurate and complete personal details</li>
                <li>Not use the website for illegal activities</li>
                <li>Not engage in fraudulent booking or misuse of services</li>
                <li>Respect drivers and company staff</li>
                <li>Follow safety guidelines during rides</li>
            </ul>
             <p className="mt-2">Any violation may result in cancellation of services or permanent ban.</p>
          </div>

          <div className="space-y-4">
            <h2 className="font-headline text-2xl font-semibold text-foreground">4. Booking and Cancellation</h2>
            <div>
                <h3 className="font-semibold text-foreground">4.1 Booking</h3>
                <p>By submitting a booking form, you authorize us to:</p>
                 <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Contact you for confirmation</li>
                    <li>Assign a driver based on availability</li>
                </ul>
            </div>
             <div>
                <h3 className="font-semibold text-foreground">4.2 Pricing</h3>
                <p>Fares may vary depending on:</p>
                 <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Distance</li>
                    <li>Time</li>
                    <li>Traffic</li>
                    <li>Peak hours</li>
                    <li>Vehicle type</li>
                </ul>
                <p>We reserve the right to change pricing at any time.</p>
            </div>
             <div>
                <h3 className="font-semibold text-foreground">4.2 Cancellation</h3>
                <p>We may cancel your booking if:</p>
                 <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>False details were provided</li>
                    <li>No response during confirmation</li>
                    <li>Driver availability issues</li>
                    <li>Safety or security concerns</li>
                </ul>
                <p>You may request cancellation by contacting us directly.</p>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="font-headline text-2xl font-semibold text-foreground">5. Limitations of Liability</h2>
             <p>We are not liable for:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Delays caused by traffic, weather, road conditions</li>
                <li>Loss of personal belongings</li>
                <li>Driver behavior beyond our control</li>
                <li>Third-party service issues (maps, payment gateways, network)</li>
                <li>Any indirect, incidental, or consequential damages</li>
            </ul>
             <p>You agree to use the service at your own risk.</p>
          </div>
          
          <div className="space-y-2">
            <h2 className="font-headline text-2xl font-semibold text-foreground">6. User Data & Privacy</h2>
             <p>Your data is handled according to our Privacy Policy, which explains:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>What information we collect</li>
                <li>How we use it</li>
                <li>How it is protected</li>
            </ul>
             <p>By using our service, you accept our data practices.</p>
          </div>

           <div className="space-y-2">
            <h2 className="font-headline text-2xl font-semibold text-foreground">7. Prohibited Activities</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Hack, modify, or disrupt the website</li>
                <li>Create fake bookings</li>
                <li>Impersonate another person</li>
                <li>Upload harmful code (malware, scripts, bots)</li>
                <li>Use the service for commercial reselling</li>
            </ul>
            <p>Violations may lead to legal action.</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-headline text-2xl font-semibold text-foreground">8. Third-Party Links</h2>
            <p>Our site may include links to external websites. We do not control or endorse:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Their content</li>
                <li>Their policies</li>
                <li>Their services</li>
            </ul>
            <p>You access them at your own discretion.</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-headline text-2xl font-semibold text-foreground">9. Intellectual Property</h2>
             <p>All content on the website—including text, logos, graphics, images, and code—is our exclusive property.</p>
            <p>You may not:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Copy</li>
                <li>Reproduce</li>
                <li>Sell</li>
                <li>Modify</li>
                <li>Distribute</li>
            </ul>
            <p>any part of the website without written permission.</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-headline text-2xl font-semibold text-foreground">10. Termination</h2>
            <p>We may suspend or terminate your access if:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>You violate these Terms</li>
                <li>You misuse our services</li>
                <li>Fraudulent behavior is detected</li>
            </ul>
            <p>Upon termination, you must stop using all services immediately.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
