import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-12 md:py-20">
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-center text-3xl text-primary">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
          <p>
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our taxi booking services. By accessing or using our website, you agree to the terms outlined in this policy.
          </p>

          <div className="space-y-4">
            <h2 className="font-headline text-2xl font-semibold text-foreground">1. Information We Collect</h2>
            <div>
                <h3 className="font-semibold text-foreground">1.1 Personal Information</h3>
                <p>We may collect the following details when you submit a booking or contact form:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Name</li>
                    <li>Mobile number</li>
                    <li>Email address</li>
                    <li>Pickup and drop location</li>
                    <li>Date and time of travel</li>
                    <li>Any additional information you choose to provide</li>
                </ul>
            </div>
             <div>
                <h3 className="font-semibold text-foreground">1.2 Automatically Collected Information</h3>
                <p>When you visit our website, we may automatically collect:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>IP address</li>
                    <li>Browser type</li>
                    <li>Device information</li>
                    <li>Pages visited</li>
                    <li>Time spent on pages</li>
                    <li>Cookies and similar tracking data</li>
                </ul>
                <p className="mt-2">This helps us improve website performance and user experience.</p>
            </div>
          </div>

           <div className="space-y-4">
            <h2 className="font-headline text-2xl font-semibold text-foreground">2. How We Use Your Information</h2>
            <p>We use the collected information to:</p>
             <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Process and confirm taxi bookings</li>
                <li>Communicate regarding rides or inquiries</li>
                <li>Improve customer service</li>
                <li>Personalize your experience</li>
                <li>Maintain website security and performance</li>
                <li>Comply with legal requirements</li>
            </ul>
             <p className="mt-2 font-semibold">We do not sell, trade, or rent your personal information to anyone.</p>
          </div>

          <div className="space-y-4">
            <h2 className="font-headline text-2xl font-semibold text-foreground">3. Sharing of Information</h2>
            <p>We may share your information only in the following situations:</p>
            <div>
                <h3 className="font-semibold text-foreground">3.1 Service Fulfillment</h3>
                <p>With drivers or authorized partners solely for completing your ride.</p>
            </div>
             <div>
                <h3 className="font-semibold text-foreground">3.2 Legal Requirements</h3>
                <p>If required by:</p>
                 <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Court orders</li>
                    <li>Government authorities</li>
                    <li>Law enforcement</li>
                </ul>
            </div>
             <div>
                <h3 className="font-semibold text-foreground">3.3 Business Operations</h3>
                <p>With trusted service providers (hosting, analytics, SMS/email services) who follow strict data protection rules.</p>
            </div>
            <p className="mt-2 font-semibold">We never share your information for marketing by third parties.</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-headline text-2xl font-semibold text-foreground">4. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your information from:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Unauthorized access</li>
                <li>Misuse</li>
                <li>Disclosure</li>
                <li>Alteration</li>
                <li>Loss</li>
            </ul>
            <p>However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
          </div>
          
          <div className="space-y-2">
            <h2 className="font-headline text-2xl font-semibold text-foreground">5. Cookies and Tracking Technologies</h2>
             <p>Our website may use cookies to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Improve site performance</li>
                <li>Remember user preferences</li>
                <li>Analyze traffic and usage patterns</li>
            </ul>
             <p>You can disable cookies from your browser settings if you prefer.</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-headline text-2xl font-semibold text-foreground">6. Your Rights</h2>
            <p>Depending on your region, you may have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Access your personal data</li>
                <li>Request corrections</li>
                <li>Request deletion</li>
                <li>Withdraw consent</li>
                <li>Request a copy of your stored data</li>
            </ul>
             <p>To exercise these rights, contact us using the information below.</p>
          </div>
          
           <div className="space-y-2">
            <h2 className="font-headline text-2xl font-semibold text-foreground">7. Third-Party Links</h2>
            <p>Our website may contain links to other websites. We are not responsible for:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Their content</li>
                <li>Their policies</li>
                <li>Their practices</li>
            </ul>
             <p>We encourage you to review the Privacy Policy of every site you visit.</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-headline text-2xl font-semibold text-foreground">8. Children’s Privacy</h2>
            <p>
                Our services are not directed toward individuals under 13. We do not knowingly collect data from children. If you believe a child has provided information, contact us and we will remove it immediately.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-headline text-2xl font-semibold text-foreground">9. Changes to This Policy</h2>
            <p>
                We may update this Privacy Policy at any time. The “Last Updated” date will be revised accordingly. Continued use of our site after updates means you accept the changes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
