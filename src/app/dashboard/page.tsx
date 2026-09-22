import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  Heart,
  Award,
  Sparkles,
  ArrowRight,
  MapPin,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import prisma from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { format } from 'date-fns';
import { FORMAT_IDR } from '@/lib/data';

export default async function DashboardPage() {
  const session = await getCurrentUser();
  if (!session) return null;

  let userBookings: any[] = [];
  let wishlistCount = 0;

  try {
    userBookings = await prisma.booking.findMany({
      where: { userId: session.userId },
      include: {
        villa: {
          include: {
            images: { take: 1 },
          },
        },
      },
      orderBy: { checkIn: 'asc' },
    });

    wishlistCount = await prisma.wishlist.count({
      where: { userId: session.userId },
    });
  } catch (err) {
    console.error('Failed to load dashboard statistics:', err);
  }

  const upcomingBooking = userBookings.find(
    (b) => b.status === 'CONFIRMED' || b.status === 'WAITING_PAYMENT' || b.status === 'CHECKED_IN'
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Welcome Bar */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#12372A]">
          Welcome back, {session.name}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your upcoming retreats, review reservations, and explore new sanctuaries.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-[#E9DFC7] luxury-shadow">
          <div className="flex items-center justify-between text-gray-500 mb-3">
            <span className="text-xs uppercase font-bold tracking-wider">Upcoming Stay</span>
            <div className="w-8 h-8 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl font-bold text-[#12372A]">
            {upcomingBooking ? '1 Reserved' : 'None'}
          </div>
          <span className="text-xs text-gray-400 mt-1 block">
            {upcomingBooking ? format(new Date(upcomingBooking.checkIn), 'dd MMM yyyy') : 'Ready for your next trip?'}
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E9DFC7] luxury-shadow">
          <div className="flex items-center justify-between text-gray-500 mb-3">
            <span className="text-xs uppercase font-bold tracking-wider">Total Bookings</span>
            <div className="w-8 h-8 rounded-full bg-[#12372A]/10 text-[#12372A] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl font-bold text-[#12372A]">
            {userBookings.length}
          </div>
          <span className="text-xs text-gray-400 mt-1 block">
            Across Bali destinations
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E9DFC7] luxury-shadow">
          <div className="flex items-center justify-between text-gray-500 mb-3">
            <span className="text-xs uppercase font-bold tracking-wider">Saved Wishlist</span>
            <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl font-bold text-[#12372A]">
            {wishlistCount}
          </div>
          <span className="text-xs text-gray-400 mt-1 block">
            Sanctuaries saved
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E9DFC7] luxury-shadow">
          <div className="flex items-center justify-between text-gray-500 mb-3">
            <span className="text-xs uppercase font-bold tracking-wider">Reward Points</span>
            <div className="w-8 h-8 rounded-full bg-[#C5A46D]/15 text-[#C5A46D] flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl font-bold text-[#12372A]">
            2,450 pts
          </div>
          <span className="text-xs text-[#2D6A4F] font-semibold mt-1 block">
            Emerald Tier Member
          </span>
        </div>
      </div>

      {/* Upcoming Stay Card */}
      {upcomingBooking ? (
        <div className="bg-white rounded-3xl overflow-hidden border border-[#E9DFC7] luxury-shadow grid grid-cols-1 md:grid-cols-3">
          <div className="relative h-64 md:h-auto w-full">
            <Image
              src={upcomingBooking.villa?.images?.[0]?.url || '/images/hero-villa.jpg'}
              alt={upcomingBooking.villa?.name || 'Villa'}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#E9DFC7] text-xs font-bold uppercase tracking-wider">
              {upcomingBooking.status}
            </div>
          </div>

          <div className="md:col-span-2 p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-[#2D6A4F] font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>Next Upcoming Escape</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#12372A]">
                {upcomingBooking.villa?.name}
              </h3>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#2D6A4F]" />
                {upcomingBooking.villa?.location}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 p-4 rounded-2xl bg-[#FAF9F6] border border-[#E9DFC7] text-xs">
                <div>
                  <span className="text-gray-400 block font-semibold">Check-In</span>
                  <span className="font-bold text-[#12372A]">
                    {format(new Date(upcomingBooking.checkIn), 'dd MMM yyyy')}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block font-semibold">Check-Out</span>
                  <span className="font-bold text-[#12372A]">
                    {format(new Date(upcomingBooking.checkOut), 'dd MMM yyyy')}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block font-semibold">Booking Code</span>
                  <span className="font-mono font-bold text-[#2D6A4F]">
                    {upcomingBooking.bookingCode}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                Total Paid:{' '}
                <strong className="text-[#12372A] font-serif text-base font-bold">
                  {FORMAT_IDR(upcomingBooking.totalPrice)}
                </strong>
              </div>

              <Link
                href={`/booking/success?bookingCode=${upcomingBooking.bookingCode}`}
                className="px-6 py-2.5 rounded-full bg-[#12372A] hover:bg-[#2D6A4F] text-white text-xs font-bold tracking-wide transition-all shadow flex items-center justify-center gap-2 self-start sm:self-auto"
              >
                <span>View Full Receipt</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-10 border border-[#E9DFC7] text-center luxury-shadow space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#FAF9F6] text-gray-400 flex items-center justify-center mx-auto">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#12372A]">
            No Upcoming Villa Reservations
          </h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Explore our curated catalog of Bali luxury villas to find your next tropical escape.
          </p>
          <Link
            href="/villas"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C5A46D] hover:bg-[#b09059] text-[#12372A] font-bold text-xs uppercase tracking-wider transition-all shadow"
          >
            <span>Browse Villas</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
