'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  MapPin,
  FileText,
  XCircle,
  Clock,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { format } from 'date-fns';
import { FORMAT_IDR } from '@/lib/data';

export default function MyBookingsPage() {
  const [activeTab, setActiveTab] = useState<'UPCOMING' | 'COMPLETED' | 'CANCELLED'>('UPCOMING');
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelModalBooking, setCancelModalBooking] = useState<any>(null);

  useEffect(() => {
    // In production this calls /api/bookings
    // For seamless demo client, fallback to sample bookings if empty
    fetch('/api/villas')
      .catch(() => {});

    // Sample bookings for logged-in user
    setBookings([
      {
        id: 'book-1',
        bookingCode: 'NV-2026-8921',
        villaName: 'Ocean Serenity Villa',
        villaImage: '/images/hero-villa.jpg',
        location: 'Uluwatu, Bali',
        checkIn: '2026-10-10',
        checkOut: '2026-10-14',
        nightCount: 4,
        totalGuests: 2,
        totalPrice: 16650000,
        status: 'CONFIRMED',
        cancellationPolicy: 'Free cancellation up to 7 days before check-in.',
      },
      {
        id: 'book-2',
        bookingCode: 'NV-2026-7432',
        villaName: 'Royal Bamboo Sanctuary',
        villaImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
        location: 'Ubud, Bali',
        checkIn: '2026-10-18',
        checkOut: '2026-10-21',
        nightCount: 3,
        totalGuests: 5,
        totalPrice: 14073800,
        status: 'WAITING_PAYMENT',
        cancellationPolicy: 'Free cancellation up to 14 days before check-in.',
      },
      {
        id: 'book-3',
        bookingCode: 'NV-2026-5120',
        villaName: 'The Glass Penthouse Villa',
        villaImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        location: 'Seminyak, Bali',
        checkIn: '2026-08-01',
        checkOut: '2026-08-05',
        nightCount: 4,
        totalGuests: 2,
        totalPrice: 13331100,
        status: 'CHECKED_OUT',
        cancellationPolicy: 'Completed',
      },
    ]);
    setLoading(false);
  }, []);

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'UPCOMING') {
      return b.status === 'CONFIRMED' || b.status === 'WAITING_PAYMENT' || b.status === 'CHECKED_IN';
    }
    if (activeTab === 'COMPLETED') {
      return b.status === 'CHECKED_OUT';
    }
    if (activeTab === 'CANCELLED') {
      return b.status === 'CANCELLED' || b.status === 'REFUNDED';
    }
    return true;
  });

  const handleCancelReservation = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'CANCELLED' } : b))
    );
    setCancelModalBooking(null);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#12372A]">
          My Reservations
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Review details, download official invoices, or manage your villa stays.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 gap-6 text-sm">
        {(['UPCOMING', 'COMPLETED', 'CANCELLED'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 font-semibold transition-all relative ${
              activeTab === tab
                ? 'text-[#2D6A4F] font-bold'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <span>{tab.charAt(0) + tab.slice(1).toLowerCase()}</span>
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2D6A4F] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E9DFC7]">
            <Calendar className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#12372A]">
              No {activeTab.toLowerCase()} bookings found
            </h3>
            <p className="text-gray-500 text-xs mt-1">
              Your reservations will appear here once booked.
            </p>
          </div>
        ) : (
          filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9DFC7] luxury-shadow flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex gap-4 items-start sm:items-center">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 shadow-md">
                  <Image
                    src={b.villaImage}
                    alt={b.villaName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-[#2D6A4F] bg-[#2D6A4F]/10 px-2.5 py-0.5 rounded-full">
                      {b.bookingCode}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-gray-400">
                      {b.status}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#12372A]">
                    {b.villaName}
                  </h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#2D6A4F]" />
                    {b.location}
                  </p>

                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-600">
                    <div>
                      <span className="text-gray-400 block font-semibold">Stay Dates</span>
                      <span className="font-bold">
                        {format(new Date(b.checkIn), 'dd MMM')} – {format(new Date(b.checkOut), 'dd MMM yyyy')}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-semibold">Duration</span>
                      <span className="font-bold">{b.nightCount} Nights</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="flex flex-col md:items-end justify-between gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                <div className="md:text-right">
                  <span className="text-xs text-gray-400 uppercase tracking-wider block">
                    Total Invoiced
                  </span>
                  <span className="font-serif text-xl font-bold text-[#12372A]">
                    {FORMAT_IDR(b.totalPrice)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/booking/success?bookingCode=${b.bookingCode}`}
                    className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 text-xs font-bold text-gray-700 flex items-center gap-1.5 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Invoice</span>
                  </Link>

                  {b.status !== 'CANCELLED' && b.status !== 'CHECKED_OUT' && (
                    <button
                      onClick={() => setCancelModalBooking(b)}
                      className="px-4 py-2 rounded-full text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cancellation Modal */}
      {cancelModalBooking && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-red-100 text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#12372A]">
              Cancel Reservation?
            </h3>
            <p className="text-xs text-gray-500">
              Are you sure you want to cancel booking <strong>{cancelModalBooking.bookingCode}</strong> for {cancelModalBooking.villaName}?
            </p>
            <div className="p-3.5 rounded-2xl bg-gray-50 text-xs text-gray-600 border border-gray-200 text-left">
              <strong>Policy:</strong> {cancelModalBooking.cancellationPolicy}
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setCancelModalBooking(null)}
                className="flex-1 py-2.5 rounded-full border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50"
              >
                Keep Booking
              </button>
              <button
                onClick={() => handleCancelReservation(cancelModalBooking.id)}
                className="flex-1 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
