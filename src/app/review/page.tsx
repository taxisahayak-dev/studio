
'use client';

import { useState } from 'react';
import { useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { ReviewForm } from './review-form';
import { Plus, Star, MessageSquare, Loader2, UserCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

function ReviewListPage() {
  const firestore = useFirestore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const reviewsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'reviews'), orderBy('submissionDate', 'desc'));
  }, [firestore]);

  const { data: reviews, isLoading } = useCollection(reviewsQuery);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  }

  return (
    <div className="container mx-auto py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold text-primary">Customer Feedback</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          See what our valued customers are saying about their experience with us.
        </p>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}

      {!isLoading && reviews && reviews.length > 0 && (
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => (
            <Card key={review.id} className="flex flex-col">
              <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 border">
                        <AvatarFallback>
                            <UserCircle className="h-8 w-8 text-muted-foreground" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <CardTitle className="text-lg">{review.email}</CardTitle>
                        <CardDescription>
                            {review.submissionDate ? formatDistanceToNow(review.submissionDate.toDate(), { addSuffix: true }) : 'Just now'}
                        </CardDescription>
                    </div>
                     <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        <span className="font-bold text-lg">{review.rating}</span>
                    </div>
                  </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground italic">"{review.message}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && (!reviews || reviews.length === 0) && (
        <div className="text-center py-24 rounded-lg border-2 border-dashed">
            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No reviews yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">Be the first to leave a review!</p>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-lg"
            size="icon"
          >
            <Plus className="h-8 w-8" />
            <span className="sr-only">Add Review</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">Leave a Review</DialogTitle>
            <DialogDescription>
              We'd love to hear your feedback! Please share your experience with us.
            </DialogDescription>
          </DialogHeader>
          <ReviewForm onReviewSubmitted={handleDialogClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ReviewListPage;
