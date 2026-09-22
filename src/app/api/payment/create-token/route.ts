import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { bookingId, paymentMethod } = await req.json();

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        villa: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    const transactionId = `MID-${booking.bookingCode}-${Date.now()}`;
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';

    // Mock token fallback or real Midtrans Snap call
    let snapToken = `SANDBOX-SNAP-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    let redirectUrl = `https://app.sandbox.midtrans.com/snap/v2/vtweb/${snapToken}`;

    if (serverKey && !serverKey.includes('demo')) {
      try {
        const authHeader = Buffer.from(`${serverKey}:`).toString('base64');
        const endpoint = isProduction
          ? 'https://app.midtrans.com/snap/v1/transactions'
          : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

        const midtransPayload = {
          transaction_details: {
            order_id: transactionId,
            gross_amount: Math.round(booking.totalPrice),
          },
          customer_details: {
            first_name: booking.guestName,
            email: booking.guestEmail,
            phone: booking.guestPhone,
          },
          item_details: [
            {
              id: booking.villaId,
              price: Math.round(booking.totalPrice),
              quantity: 1,
              name: `Reservation: ${booking.villa.name} (${booking.nightCount} nights)`,
            },
          ],
        };

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Basic ${authHeader}`,
          },
          body: JSON.stringify(midtransPayload),
        });

        if (res.ok) {
          const data = await res.json();
          snapToken = data.token;
          redirectUrl = data.redirect_url;
        }
      } catch (err) {
        console.warn('Live Midtrans API call skipped, using Sandbox simulator token:', err);
      }
    }

    // Upsert Payment Record
    const payment = await prisma.payment.upsert({
      where: { bookingId: booking.id },
      create: {
        bookingId: booking.id,
        transactionId,
        paymentMethod: paymentMethod || 'QRIS',
        grossAmount: booking.totalPrice,
        status: 'PENDING',
        snapToken,
        redirectUrl,
        vaNumber: `8809${Math.floor(10000000 + Math.random() * 90000000)}`,
      },
      update: {
        transactionId,
        paymentMethod: paymentMethod || 'QRIS',
        grossAmount: booking.totalPrice,
        snapToken,
        redirectUrl,
      },
    });

    return NextResponse.json({
      success: true,
      snapToken: payment.snapToken,
      redirectUrl: payment.redirectUrl,
      vaNumber: payment.vaNumber,
      transactionId: payment.transactionId,
    });
  } catch (error) {
    console.error('Payment token error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate payment gateway.' },
      { status: 500 }
    );
  }
}
