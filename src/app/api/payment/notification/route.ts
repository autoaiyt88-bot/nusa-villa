import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const notification = await req.json();
    const orderId = notification.order_id;
    const transactionStatus = notification.transaction_status;
    const fraudStatus = notification.fraud_status;

    console.log('Midtrans Webhook Received:', { orderId, transactionStatus, fraudStatus });

    const payment = await prisma.payment.findUnique({
      where: { transactionId: orderId },
      include: { booking: true },
    });

    if (!payment) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    let bookingStatus = payment.booking.status;
    let paymentStatus = payment.status;

    if (transactionStatus === 'capture' || transactionStatus === 'settlement') {
      if (fraudStatus === 'accept' || !fraudStatus) {
        bookingStatus = 'CONFIRMED';
        paymentStatus = 'PAID';
      }
    } else if (
      transactionStatus === 'cancel' ||
      transactionStatus === 'deny' ||
      transactionStatus === 'expire'
    ) {
      bookingStatus = 'CANCELLED';
      paymentStatus = 'FAILED';
    } else if (transactionStatus === 'pending') {
      bookingStatus = 'WAITING_PAYMENT';
      paymentStatus = 'PENDING';
    }

    await prisma.$transaction([
      prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: paymentStatus,
          rawResponse: JSON.stringify(notification),
          paidAt: paymentStatus === 'PAID' ? new Date() : null,
        },
      }),
      prisma.booking.update({
        where: { id: payment.bookingId },
        data: {
          status: bookingStatus,
        },
      }),
    ]);

    return NextResponse.json({ status: 'OK' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
