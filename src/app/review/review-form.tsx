
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ReviewSchema, reviewSchema } from '@/lib/schemas';
import { useUser, useFirestore } from '@/firebase';
import { cn } from '@/lib/utils';
import { DialogFooter } from '@/components/ui/dialog';
import { addDoc, collection } from 'firebase/firestore';


interface ReviewFormProps {
  onReviewSubmitted?: () => void;
}

export function ReviewForm({ onReviewSubmitted }: ReviewFormProps) {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  
  const { user, isUserLoading } = useUser();

  const form = useForm<ReviewSchema>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      email: '',
      rating: 0,
      message: '',
    },
  });

  useEffect(() => {
    if (user?.email) {
      form.setValue('email', user.email);
    }
  }, [user, form]);
  
  const currentRating = form.watch('rating');

  async function onSubmit(data: ReviewSchema) {
    if (!firestore) {
        toast({
            variant: 'destructive',
            title: 'Submission Failed',
            description: 'Database is not available. Please try again later.',
        });
        return;
    }
    setIsSubmitting(true);
    
    try {
        const reviewsRef = collection(firestore, 'reviews');
        await addDoc(reviewsRef, {
            ...data,
            userId: user?.uid || null,
            submissionDate: new Date(),
        });
        
        toast({
            title: 'Review Submitted',
            description: 'Thank you for your feedback!',
        });
        form.reset({email: user?.email || '', rating: 0, message: ''});
        if (onReviewSubmitted) {
            onReviewSubmitted();
        }

    } catch (error) {
        console.error('Firestore error:', error);
        toast({
            variant: 'destructive',
            title: 'Submission Failed',
            description: 'Could not save your review. Please try again.',
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="your.email@example.com" {...field} disabled={isUserLoading || !!user?.email} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        'h-8 w-8 cursor-pointer transition-colors',
                        (hoveredRating >= star || currentRating >= star)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      )}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => field.onChange(star)}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your experience..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting || isUserLoading}>
            {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : isUserLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isUserLoading ? 'Loading...' : isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
