import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { bookingId } = await req.json();

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { user: true },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Update booking to CONFIRMED and payment to PAID
    await prisma.$transaction([
      prisma.booking.update({
        where: { id: bookingId },
        data: {
          status: 'CONFIRMED',
        },
      }),
      prisma.payment.updateMany({
        where: { bookingId },
        data: {
          status: 'PAID',
          paidAt: new Date(),
        },
      }),
    ]);

    // Send notification if user exists
    if (booking.userId) {
      await prisma.notification.create({
        data: {
          userId: booking.userId,
          title: 'Payment Confirmed!',
          message: `Your reservation ${booking.bookingCode} is confirmed. Pack your bags for Bali!`,
          type: 'PAYMENT',
          link: `/dashboard/bookings`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      bookingCode: booking.bookingCode,
    });
  } catch (error) {
    console.error('Payment simulation error:', error);
    return NextResponse.json(
      { error: 'Payment simulation failed' },
      { status: 500 }
    );
  }
}
