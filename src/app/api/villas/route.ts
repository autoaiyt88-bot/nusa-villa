import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const destination = searchParams.get('destination');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const guests = searchParams.get('guests');
    const bedrooms = searchParams.get('bedrooms');
    const bathrooms = searchParams.get('bathrooms');
    const facility = searchParams.get('facility');
    const sort = searchParams.get('sort') || 'recommended';
    const query = searchParams.get('q');

    const where: any = {
      isActive: true,
    };

    if (destination && destination.toLowerCase() !== 'all') {
      where.destination = {
        contains: destination,
      };
    }

    if (query) {
      where.OR = [
        { name: { contains: query } },
        { location: { contains: query } },
        { description: { contains: query } },
        { destination: { contains: query } },
      ];
    }

    if (minPrice || maxPrice) {
      where.pricePerNight = {};
      if (minPrice) where.pricePerNight.gte = parseFloat(minPrice);
      if (maxPrice) where.pricePerNight.lte = parseFloat(maxPrice);
    }

    if (guests) {
      where.maxGuests = { gte: parseInt(guests, 10) };
    }

    if (bedrooms) {
      where.bedrooms = { gte: parseInt(bedrooms, 10) };
    }

    if (bathrooms) {
      where.bathrooms = { gte: parseInt(bathrooms, 10) };
    }

    if (facility) {
      where.facilities = {
        some: {
          facility: {
            name: {
              contains: facility,
            },
          },
        },
      };
    }

    let orderBy: any = { isFeatured: 'desc' };
    if (sort === 'price-low') {
      orderBy = { pricePerNight: 'asc' };
    } else if (sort === 'price-high') {
      orderBy = { pricePerNight: 'desc' };
    } else if (sort === 'rating') {
      orderBy = { rating: 'desc' };
    } else if (sort === 'popular') {
      orderBy = { reviewCount: 'desc' };
    }

    const villas = await prisma.villa.findMany({
      where,
      orderBy,
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
        facilities: {
          include: {
            facility: true,
          },
        },
      },
    });

    const formatted = villas.map((v) => ({
      ...v,
      facilities: v.facilities.map((f) => f.facility.name),
    }));

    return NextResponse.json({ villas: formatted });
  } catch (error) {
    console.error('Fetch villas error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch villas' },
      { status: 500 }
    );
  }
}
