'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Star,
  MapPin,
  Bed,
  Bath,
  Users,
  Maximize2,
  Waves,
  Heart,
  Share2,
  Check,
  ShieldCheck,
  Calendar as CalendarIcon,
  Sparkles,
  Info,
  Tag,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Award,
} from 'lucide-react';
import { format, addDays, differenceInDays } from 'date-fns';
import { FORMAT_IDR, PROMOTIONS, FACILITIES_LIST } from '@/lib/data';

interface VillaDetailClientProps {
  villa: any;
}

export default function VillaDetailClient({ villa }: VillaDetailClientProps) {
  const router = useRouter();

  // Booking Card State
  const [checkIn, setCheckIn] = useState(() => format(addDays(new Date(), 2), 'yyyy-MM-dd'));
  const [checkOut, setCheckOut] = useState(() => format(addDays(new Date(), 5), 'yyyy-MM-dd'));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Promo code
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  const [promoError, setPromoError] = useState('');

  // Gallery Modal
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Wishlist
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Calculate nights
  const nights = useMemo(() => {
    try {
      const diff = differenceInDays(new Date(checkOut), new Date(checkIn));
      return Math.max(1, diff);
    } catch {
      return 1;
    }
  }, [checkIn, checkOut]);

  // Pricing breakdown
  const basePrice = villa.pricePerNight * nights;
  const cleaningFee = villa.cleaningFee || 300000;
  const serviceFee = Math.round((basePrice * (villa.serviceFeePercent || 5.0)) / 100);
  const taxAmount = Math.round((basePrice * (villa.taxPercent || 11.0)) / 100);

  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountType === 'PERCENTAGE') {
      discount = Math.round((basePrice * appliedPromo.value) / 100);
    } else {
      discount = appliedPromo.value;
    }
  }

  const grandTotal = Math.max(0, basePrice + cleaningFee + serviceFee + taxAmount - discount);

  const applyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCodeInput.trim().toUpperCase();
    const found = PROMOTIONS.find((p) => p.code === code && p.isActive);

    if (found) {
      if (basePrice < found.minSpend) {
        setPromoError(`Requires minimum stay spend of ${FORMAT_IDR(found.minSpend)}`);
        return;
      }
      setAppliedPromo(found);
      setPromoError('');
    } else {
      setPromoError('Invalid or expired promotion code');
    }
  };

  const handleReserve = async () => {
    setBookingLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          villaId: villa.id,
          checkIn,
          checkOut,
          adults,
          children,
          guestName: 'Guest',
          guestEmail: 'guest@example.com',
          guestPhone: '+62 812 0000 0000',
          promoCode: appliedPromo?.code,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push(`/checkout/${data.booking.id}`);
      } else {
        setErrorMessage(data.error || 'Failed to create reservation.');
      }
    } catch {
      setErrorMessage('Network error while creating booking.');
    } finally {
      setBookingLoading(false);
    }
  };

  const images = villa.images && villa.images.length > 0 ? villa.images : [
    { url: '/images/hero-villa.jpg', caption: 'Villa Sunset' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full">
        {/* Title & Actions Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#2D6A4F] mb-1">
              <span>{villa.destination}</span>
              <span>•</span>
              <span>{villa.villaType}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#12372A]">
              {villa.name}
            </h1>
            <div className="flex items-center gap-4 mt-2 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-1 font-bold text-[#12372A]">
                <Star className="w-4 h-4 fill-[#C5A46D] text-[#C5A46D]" />
                <span>{villa.rating ? Number(villa.rating).toFixed(1) : '4.9'}</span>
                <span className="text-gray-400 font-normal">
                  ({villa.reviewCount || 120} reviews)
                </span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-[#2D6A4F]" />
                <span>{villa.location}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: villa.name, url: window.location.href });
                }
              }}
              className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`px-4 py-2 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isWishlisted
                  ? 'border-red-500 bg-red-50 text-red-600'
                  : 'border-gray-200 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500' : ''}`} />
              <span>{isWishlisted ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* 5-Photo Gallery Grid */}
        <div className="relative rounded-3xl overflow-hidden mb-12 shadow-xl bg-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[380px] sm:h-[480px]">
            {/* Main Hero Photo (Takes 2 cols) */}
            <div
              className="md:col-span-2 relative h-full cursor-pointer group overflow-hidden"
              onClick={() => {
                setActivePhotoIdx(0);
                setGalleryOpen(true);
              }}
            >
              <Image
                src={images[0]?.url || '/images/hero-villa.jpg'}
                alt={villa.name}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>

            {/* 4 Smaller Grid Photos */}
            <div className="hidden md:grid col-span-2 grid-cols-2 gap-2 h-full">
              {[1, 2, 3, 4].map((idx) => {
                const img = images[idx] || images[0];
                return (
                  <div
                    key={idx}
                    className="relative h-full cursor-pointer group overflow-hidden"
                    onClick={() => {
                      setActivePhotoIdx(idx);
                      setGalleryOpen(true);
                    }}
                  >
                    <Image
                      src={img.url}
                      alt={`${villa.name} photo ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="25vw"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Show All Photos Button */}
          <button
            onClick={() => setGalleryOpen(true)}
            className="absolute bottom-4 right-4 z-20 px-4 py-2.5 rounded-full bg-white/95 hover:bg-white text-[#12372A] font-bold text-xs shadow-lg backdrop-blur-md flex items-center gap-2 border border-gray-200 transition-all hover:scale-105"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Show All {images.length} Photos</span>
          </button>
        </div>

        {/* Content & Sticky Booking Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Details (2 cols) */}
          <div className="lg:col-span-2 space-y-12">
            {/* Quick Specs */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9DFC7] luxury-shadow flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#12372A]/10 text-[#2D6A4F] flex items-center justify-center">
                  <Bed className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Bedrooms</div>
                  <div className="text-base font-bold text-[#12372A]">{villa.bedrooms} Master Suites</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#12372A]/10 text-[#2D6A4F] flex items-center justify-center">
                  <Bath className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Bathrooms</div>
                  <div className="text-base font-bold text-[#12372A]">{villa.bathrooms} En-Suite Baths</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#12372A]/10 text-[#2D6A4F] flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Capacity</div>
                  <div className="text-base font-bold text-[#12372A]">Up to {villa.maxGuests} Guests</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#12372A]/10 text-[#2D6A4F] flex items-center justify-center">
                  <Waves className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Pool</div>
                  <div className="text-base font-bold text-[#12372A]">Private Infinity</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#12372A]">
                About This Sanctuary
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
                {villa.description}
              </p>
            </div>

            {/* Amenities / Facilities */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
              <h2 className="font-serif text-2xl font-bold text-[#12372A]">
                Curated Amenities & Inclusions
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {villa.facilities?.map((facilityName: string) => {
                  return (
                    <div
                      key={facilityName}
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-[#E9DFC7]/60"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#12372A]/10 text-[#2D6A4F] flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-[#2D6A4F]" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-gray-800">
                        {facilityName}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* House Rules & Policies */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <h2 className="font-serif text-2xl font-bold text-[#12372A]">
                House Policies & Standards
              </h2>
              <div className="bg-[#FAF9F6] rounded-2xl p-6 border border-[#E9DFC7] space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                  <span><strong>Check-in:</strong> 15:00 onwards • <strong>Check-out:</strong> 11:00 AM</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                  <span><strong>Cancellation:</strong> {villa.cancellationPolicy}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                  <span><strong>Smoking:</strong> Strictly non-smoking indoors. Designated outdoor terraces permitted.</span>
                </div>
              </div>
            </div>

            {/* Location Map Preview */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <h2 className="font-serif text-2xl font-bold text-[#12372A]">
                Location & Coordinates
              </h2>
              <p className="text-sm text-gray-600">
                {villa.address}
              </p>
              <div className="relative h-64 w-full rounded-3xl overflow-hidden border border-gray-300 shadow-md">
                <iframe
                  title="Villa Location Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${villa.longitude - 0.02}%2C${villa.latitude - 0.02}%2C${villa.longitude + 0.02}%2C${villa.latitude + 0.02}&layer=mapnik&marker=${villa.latitude}%2C${villa.longitude}`}
                />
              </div>
            </div>

            {/* Verified Reviews */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <h2 className="font-serif text-2xl font-bold text-[#12372A]">
                  Verified Guest Reviews
                </h2>
                <div className="flex items-center gap-1 text-sm font-bold text-[#2D6A4F] bg-[#2D6A4F]/10 px-3 py-1 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-[#C5A46D] text-[#C5A46D]" />
                  <span>{villa.rating ? Number(villa.rating).toFixed(1) : '4.9'}</span>
                </div>
              </div>

              <div className="space-y-4">
                {(villa.reviews || []).slice(0, 4).map((rev: any) => (
                  <div
                    key={rev.id}
                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#12372A] text-white flex items-center justify-center font-bold text-sm">
                          {rev.guestName?.charAt(0) || 'G'}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-[#12372A]">
                            {rev.guestName}
                          </div>
                          <div className="text-xs text-gray-400">
                            {rev.guestCountry || 'International Guest'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-[#C5A46D] text-[#C5A46D]"
                          />
                        ))}
                      </div>
                    </div>
                    {rev.title && (
                      <p className="font-serif font-bold text-[#12372A] text-sm">
                        &ldquo;{rev.title}&rdquo;
                      </p>
                    )}
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sticky Booking Card (1 col) */}
          <div className="lg:col-span-1 lg:sticky lg:top-28">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9DFC7] luxury-shadow space-y-6">
              {/* Price Header */}
              <div className="flex items-baseline justify-between pb-4 border-b border-gray-100">
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider block">
                    Starting from
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-2xl font-bold text-[#12372A]">
                      {FORMAT_IDR(villa.pricePerNight)}
                    </span>
                    <span className="text-xs text-gray-500">/ night</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-[#12372A]">
                  <Star className="w-3.5 h-3.5 fill-[#C5A46D] text-[#C5A46D]" />
                  <span>{villa.rating ? Number(villa.rating).toFixed(1) : '4.9'}</span>
                </div>
              </div>

              {/* Date & Guest Pickers */}
              <div className="rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-200">
                <div className="grid grid-cols-2 divide-x divide-gray-200">
                  <div className="p-3 bg-gray-50/50">
                    <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                      Check-In
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={format(new Date(), 'yyyy-MM-dd')}
                      className="w-full bg-transparent text-xs font-bold text-[#12372A] focus:outline-none cursor-pointer mt-0.5"
                    />
                  </div>

                  <div className="p-3 bg-gray-50/50">
                    <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                      Check-Out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || format(new Date(), 'yyyy-MM-dd')}
                      className="w-full bg-transparent text-xs font-bold text-[#12372A] focus:outline-none cursor-pointer mt-0.5"
                    />
                  </div>
                </div>

                <div className="p-3 bg-gray-50/50 flex items-center justify-between">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                      Guests
                    </label>
                    <span className="text-xs font-bold text-[#12372A]">
                      {adults} Adults{children > 0 ? `, ${children} Children` : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-6 h-6 rounded-full border border-gray-300 text-xs flex items-center justify-center hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults(adults + 1)}
                      disabled={adults + children >= villa.maxGuests}
                      className="w-6 h-6 rounded-full border border-gray-300 text-xs flex items-center justify-center hover:bg-gray-100 disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Promo Code Input */}
              <div>
                <form onSubmit={applyPromoCode} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. WELCOME20)"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-xl uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#12372A] text-white text-xs font-bold rounded-xl hover:bg-[#2D6A4F] transition-colors"
                  >
                    Apply
                  </button>
                </form>
                {promoError && (
                  <p className="text-[11px] text-red-500 mt-1 font-medium">{promoError}</p>
                )}
                {appliedPromo && (
                  <div className="mt-1.5 flex items-center justify-between text-xs text-[#2D6A4F] font-bold bg-[#2D6A4F]/10 px-2.5 py-1 rounded-lg">
                    <span>{appliedPromo.code} Applied</span>
                    <span>-{FORMAT_IDR(discount)}</span>
                  </div>
                )}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2.5 text-xs text-gray-600 pt-2 border-t border-gray-100">
                <div className="flex justify-between">
                  <span>{FORMAT_IDR(villa.pricePerNight)} × {nights} nights</span>
                  <span className="font-semibold text-gray-900">{FORMAT_IDR(basePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleaning fee</span>
                  <span className="font-semibold text-gray-900">{FORMAT_IDR(cleaningFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee (5%)</span>
                  <span className="font-semibold text-gray-900">{FORMAT_IDR(serviceFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Govt. Tax (11%)</span>
                  <span className="font-semibold text-gray-900">{FORMAT_IDR(taxAmount)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#2D6A4F] font-bold">
                    <span>Promotional Discount</span>
                    <span>-{FORMAT_IDR(discount)}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline text-sm font-bold text-[#12372A]">
                  <span className="font-serif text-base">Total (IDR)</span>
                  <span className="font-serif text-xl font-extrabold text-[#12372A]">
                    {FORMAT_IDR(grandTotal)}
                  </span>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Reserve Button */}
              <button
                onClick={handleReserve}
                disabled={bookingLoading}
                className="w-full py-4 rounded-full bg-[#C5A46D] hover:bg-[#b09059] text-[#12372A] font-bold text-sm tracking-wide transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                <span>{bookingLoading ? 'Securing Dates...' : 'Reserve Now'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
                <span>You will not be charged yet</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Full Screen Lightbox Modal */}
      {galleryOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setGalleryOpen(false)}
        >
          <button
            onClick={() => setGalleryOpen(false)}
            className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIdx((activePhotoIdx - 1 + images.length) % images.length);
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIdx((activePhotoIdx + 1) % images.length);
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-5xl w-full h-[75vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={images[activePhotoIdx]?.url || '/images/hero-villa.jpg'}
                alt={`${villa.name} photo`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
            <div className="mt-4 text-center text-white">
              <span className="text-xs uppercase tracking-wider text-[#C5A46D] font-bold">
                Photo {activePhotoIdx + 1} of {images.length}
              </span>
              <p className="text-sm mt-1">{images[activePhotoIdx]?.caption}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
