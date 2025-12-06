'use client';

import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useMemo } from 'react';

function BookingsTable() {
  const firestore = useFirestore();
  const bookingsQuery = useMemo(() => 
    query(collection(firestore, 'bookings'), orderBy('dateTime', 'desc')),
    [firestore]
  );
  const { data: bookings, isLoading } = useCollection(bookingsQuery);

  if (isLoading) return <p>Loading bookings...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Pickup</TableHead>
              <TableHead>Drop-off</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings?.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.name}</TableCell>
                <TableCell>{booking.contact}</TableCell>
                <TableCell>{booking.pickup}</TableCell>
                <TableCell>{booking.dropoff}</TableCell>
                <TableCell>
                  {booking.dateTime?.toDate ? format(booking.dateTime.toDate(), 'PPP p') : 'Invalid Date'}
                </TableCell>
                <TableCell>
                  <Badge variant={booking.status === 'pending' ? 'secondary' : 'default'}>
                    {booking.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function ContactSubmissionsTable() {
    const firestore = useFirestore();
    const submissionsQuery = useMemo(() =>
        query(collection(firestore, 'contact_form_submissions'), orderBy('submissionDate', 'desc')),
        [firestore]
    );
  const { data: submissions, isLoading } = useCollection(submissionsQuery);

  if (isLoading) return <p>Loading messages...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions?.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>{submission.name}</TableCell>
                <TableCell>{submission.email}</TableCell>
                <TableCell className="max-w-xs truncate">{submission.message}</TableCell>
                <TableCell>
                    {submission.submissionDate?.toDate ? format(submission.submissionDate.toDate(), 'PPP p') : 'Invalid Date'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}


export default function AdminPage() {
  return (
    <div className="container mx-auto py-12 md:py-20">
      <h1 className="font-headline text-4xl font-bold text-primary mb-8">Admin Panel</h1>
      <div className="space-y-12">
        <BookingsTable />
        <ContactSubmissionsTable />
      </div>
    </div>
  );
}
