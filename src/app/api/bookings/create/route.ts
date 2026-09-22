import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { differenceInDays, parseISO } from 'date-fns';
import { z } from 'zod';

const bookingSchema = z.object({
  villaId: z.string(),
  checkIn: z.string(),
  checkOut: z.string(),
  adults: z.number().min(1),
  children: z.number().default(0),
  infants: z.number().default(0),
  guestName: z.string().min(2),
  guestEmail: z.string().email(),
  guestPhone: z.string().min(6),
  guestCountry: z.string().default('Indonesia'),
  specialRequests: z.string().optional(),
  promoCode: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = bookingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const {
      villaId,
      checkIn,
      checkOut,
      adults,
      children,
      infants,
      guestName,
      guestEmail,
      guestPhone,
      guestCountry,
      specialRequests,
      promoCode,
    } = result.data;

    const checkInDate = parseISO(checkIn);
    const checkOutDate = parseISO(checkOut);

    const nightCount = differenceInDays(checkOutDate, checkInDate);
    if (nightCount < 1) {
      return NextResponse.json(
        { error: 'Check-out date must be after check-in date' },
        { status: 400 }
      );
    }

    const villa = await prisma.villa.findUnique({
      where: { id: villaId },
    });

    if (!villa) {
      return NextResponse.json({ error: 'Villa not found' }, { status: 404 });
    }

    const totalGuests = adults + children;
    if (totalGuests > villa.maxGuests) {
      return NextResponse.json(
        { error: `This villa allows a maximum of ${villa.maxGuests} guests` },
        { status: 400 }
      );
    }

    // Availability Check: Double Booking Prevention
    const overlappingBookings = await prisma.booking.findFirst({
      where: {
        villaId,
        status: {
          in: ['PAID', 'CONFIRMED', 'CHECKED_IN', 'WAITING_PAYMENT'],
        },
        AND: [
          { checkIn: { lt: checkOutDate } },
          { checkOut: { gt: checkInDate } },
        ],
      },
    });

    if (overlappingBookings) {
      return NextResponse.json(
        {
          error:
            'These dates are no longer available. Please select alternative dates.',
        },
        { status: 409 }
      );
    }

    // Check blocked maintenance dates
    const blocked = await prisma.blockedDate.findFirst({
      where: {
        villaId,
        AND: [
          { startDate: { lt: checkOutDate } },
          { endDate: { gt: checkInDate } },
        ],
      },
    });

    if (blocked) {
      return NextResponse.json(
        {
          error:
            'The villa is reserved for scheduled maintenance on these dates.',
        },
        { status: 409 }
      );
    }

    // Calculate Fees
    const baseVillaPrice = villa.pricePerNight * nightCount;
    const cleaningFee = villa.cleaningFee;
    const serviceFee = Math.round((baseVillaPrice * villa.serviceFeePercent) / 100);
    const taxAmount = Math.round((baseVillaPrice * villa.taxPercent) / 100);

    let discountAmount = 0;
    if (promoCode) {
      const promo = await prisma.promotion.findUnique({
        where: { code: promoCode.toUpperCase() },
      });

      if (promo && promo.isActive && new Date() <= promo.endDate) {
        if (baseVillaPrice >= promo.minSpend) {
          if (promo.discountType === 'PERCENTAGE') {
            discountAmount = Math.round((baseVillaPrice * promo.value) / 100);
            if (promo.maxDiscount && discountAmount > promo.maxDiscount) {
              discountAmount = promo.maxDiscount;
            }
          } else {
            discountAmount = promo.value;
          }
        }
      }
    }

    const totalPrice = Math.max(
      0,
      baseVillaPrice + cleaningFee + serviceFee + taxAmount - discountAmount
    );

    // Optional user session
    const currentUser = await getCurrentUser();

    // Unique Booking Code: NV-2026-XXXX
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const bookingCode = `NV-2026-${randomCode}`;

    const booking = await prisma.booking.create({
      data: {
        bookingCode,
        userId: currentUser?.userId || null,
        villaId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        adults,
        children,
        infants,
        totalGuests,
        nightCount,
        villaPrice: baseVillaPrice,
        cleaningFee,
        serviceFee,
        taxAmount,
        discountAmount,
        totalPrice,
        status: 'WAITING_PAYMENT',
        guestName,
        guestEmail,
        guestPhone,
        guestCountry,
        specialRequests,
        promoCode,
      },
      include: {
        villa: {
          include: {
            images: { take: 1 },
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        bookingCode: booking.bookingCode,
        totalPrice: booking.totalPrice,
        status: booking.status,
      },
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating your reservation.' },
      { status: 500 }
    );
  }
}
