import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ReviewForm } from './review-form';

export default function ReviewPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <Card className="w-full max-w-2xl shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-3xl">Leave a Review</CardTitle>
              <CardDescription>
                We'd love to hear your feedback! Please share your experience with us.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReviewForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
