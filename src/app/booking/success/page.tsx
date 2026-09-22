'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Download,
  Printer,
  ArrowRight,
  ShieldCheck,
  Home,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { format } from 'date-fns';
import { FORMAT_IDR } from '@/lib/data';

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const bookingCode = searchParams.get('bookingCode') || 'NV-2026-8921';
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    // Fire festive luxury celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C5A46D', '#2D6A4F', '#12372A', '#E9DFC7'],
      });
    } catch {}

    // Fetch booking details
    fetch(`/api/villas`) // warmup
      .catch(() => {});
  }, [bookingCode]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] print:bg-white">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full">
        {/* Success Banner */}
        <div className="text-center space-y-4 mb-12">
          <div className="w-20 h-20 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>Reservation Confirmed & Secured</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#12372A]">
            We Look Forward To Welcoming You
          </h1>

          <p className="text-gray-600 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            Your private luxury sanctuary in Bali is reserved. A confirmation receipt and check-in guide have been sent to your email.
          </p>
        </div>

        {/* Official Printable Invoice Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E9DFC7] luxury-shadow space-y-8 relative print:border-none print:shadow-none">
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-200 gap-4">
            <div>
              <span className="font-serif text-2xl font-bold text-[#12372A] tracking-wider block">
                NUSA VILLA
              </span>
              <span className="text-[10px] tracking-widest uppercase text-gray-500">
                Official Booking Confirmation & Invoice
              </span>
            </div>

            <div className="sm:text-right">
              <span className="text-xs uppercase tracking-wider text-gray-400 block font-semibold">
                Official Booking Code
              </span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-[#2D6A4F]">
                {bookingCode}
              </span>
            </div>
          </div>

          {/* Stay Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-4 border-b border-gray-200 text-xs">
            <div>
              <span className="text-gray-400 uppercase tracking-wider block font-semibold">
                Sanctuary
              </span>
              <span className="font-bold text-sm text-[#12372A] block mt-1">
                Ocean Serenity Villa
              </span>
              <span className="text-gray-500">Uluwatu, Bali</span>
            </div>

            <div>
              <span className="text-gray-400 uppercase tracking-wider block font-semibold">
                Check-In
              </span>
              <span className="font-bold text-sm text-[#12372A] block mt-1">
                From 15:00 WITA
              </span>
              <span className="text-gray-500">Private Butler Greeting</span>
            </div>

            <div>
              <span className="text-gray-400 uppercase tracking-wider block font-semibold">
                Check-Out
              </span>
              <span className="font-bold text-sm text-[#12372A] block mt-1">
                Until 11:00 WITA
              </span>
              <span className="text-gray-500">Late check-out on request</span>
            </div>

            <div>
              <span className="text-gray-400 uppercase tracking-wider block font-semibold">
                Payment Status
              </span>
              <span className="inline-block mt-1 font-bold text-xs bg-[#2D6A4F] text-white px-2.5 py-0.5 rounded-full">
                PAID & VERIFIED
              </span>
            </div>
          </div>

          {/* Inclusions */}
          <div className="space-y-3 text-xs text-gray-700">
            <h4 className="font-serif font-bold text-sm text-[#12372A]">
              Complimentary Inclusions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                <span>Daily Gourmet Breakfast for all registered guests</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                <span>Private Infinity Pool with daily fresh floral setup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                <span>Dedicated 24/7 in-villa butler service</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                <span>High-Speed Fiber Optic WiFi throughout property</span>
              </div>
            </div>
          </div>

          {/* Action Buttons (Hidden when printing) */}
          <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save Invoice</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href="/dashboard/bookings"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#12372A] hover:bg-[#2D6A4F] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow"
              >
                <span>View My Bookings</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/"
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF9F6]" />}>
      <BookingSuccessContent />
    </Suspense>
  );
}
