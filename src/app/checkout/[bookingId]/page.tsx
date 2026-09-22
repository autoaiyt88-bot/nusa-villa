import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import CheckoutClient from './CheckoutClient';

interface CheckoutPageProps {
  params: Promise<{ bookingId: string }>;
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { bookingId } = await params;

  let booking: any = null;
  try {
    booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        villa: {
          include: {
            images: { take: 1 },
          },
        },
        payment: true,
      },
    });
  } catch (err) {
    console.error('Failed to load booking for checkout:', err);
  }

  if (!booking) {
    notFound();
  }

  return <CheckoutClient booking={booking} />;
}
