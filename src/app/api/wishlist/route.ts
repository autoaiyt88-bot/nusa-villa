import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json({ wishlist: [] });
  }

  const items = await prisma.wishlist.findMany({
    where: { userId: session.userId },
    include: {
      villa: {
        include: {
          images: { take: 1 },
        },
      },
    },
  });

  return NextResponse.json({
    wishlist: items.map((i) => i.villaId),
    items: items.map((i) => i.villa),
  });
}

export async function POST(req: NextRequest) {
  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json({ error: 'Please sign in to save villas to your wishlist.' }, { status: 401 });
  }

  const { villaId } = await req.json();

  const existing = await prisma.wishlist.findUnique({
    where: {
      userId_villaId: {
        userId: session.userId,
        villaId,
      },
    },
  });

  if (existing) {
    await prisma.wishlist.delete({
      where: { id: existing.id },
    });
    return NextResponse.json({ saved: false });
  } else {
    await prisma.wishlist.create({
      data: {
        userId: session.userId,
        villaId,
      },
    });
    return NextResponse.json({ saved: true });
  }
}
