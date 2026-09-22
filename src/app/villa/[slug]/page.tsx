import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import { INITIAL_VILLAS } from '@/lib/data';
import VillaDetailClient from './VillaDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  let villa = null;

  try {
    villa = await prisma.villa.findUnique({
      where: { slug },
      include: { images: true },
    });
  } catch {
    villa = INITIAL_VILLAS.find((v) => v.slug === slug);
  }

  if (!villa) {
    return { title: 'Villa Not Found | Nusa Villa' };
  }

  return {
    title: `${villa.name} — Luxury Villa in ${villa.location} | Nusa Villa`,
    description: villa.shortDescription,
    openGraph: {
      title: `${villa.name} | Nusa Villa Bali`,
      description: villa.shortDescription,
      images: [villa.images?.[0]?.url || '/images/hero-villa.jpg'],
    },
  };
}

export default async function VillaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let villa: any = null;

  try {
    villa = await prisma.villa.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { order: 'asc' } },
        facilities: { include: { facility: true } },
        rooms: true,
        reviews: {
          where: { isApproved: true },
          orderBy: { createdAt: 'desc' },
        },
        blockedDates: true,
        bookings: {
          where: {
            status: { in: ['CONFIRMED', 'PAID', 'WAITING_PAYMENT', 'CHECKED_IN'] },
          },
          select: {
            checkIn: true,
            checkOut: true,
          },
        },
      },
    });

    if (villa) {
      villa = {
        ...villa,
        facilities: villa.facilities.map((f: any) => f.facility.name),
      };
    }
  } catch (err) {
    console.warn('Fallback to local data for slug:', slug, err);
  }

  if (!villa) {
    villa = INITIAL_VILLAS.find((v) => v.slug === slug);
  }

  if (!villa) {
    notFound();
  }

  return <VillaDetailClient villa={villa} />;
}
