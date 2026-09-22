'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star,
  Bed,
  Bath,
  Users,
  Waves,
  Heart,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { VillaType } from '@/types';
import { FORMAT_IDR } from '@/lib/data';

interface FeaturedVillasProps {
  villas: VillaType[];
}

export default function FeaturedVillas({ villas }: FeaturedVillasProps) {
  const [savedWishlist, setSavedWishlist] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/wishlist')
      .then((res) => res.json())
      .then((data) => {
        if (data?.wishlist) {
          setSavedWishlist(data.wishlist);
        }
      })
      .catch(() => {});
  }, []);

  const toggleWishlist = async (e: React.MouseEvent, villaId: string) => {
    e.preventDefault();
    e.stopPropagation();

    // Optimistic toggle
    const isSaved = savedWishlist.includes(villaId);
    setSavedWishlist((prev) =>
      isSaved ? prev.filter((id) => id !== villaId) : [...prev, villaId]
    );

    try {
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ villaId }),
      });
      if (res.status === 401) {
        // Redirect to login if unauthenticated
        window.location.href = '/login?callbackUrl=/';
      }
    } catch {
      // Revert if error
      setSavedWishlist((prev) =>
        isSaved ? [...prev, villaId] : prev.filter((id) => id !== villaId)
      );
    }
  };

  return (
    <section id="villas" className="py-24 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12372A]/5 text-[#2D6A4F] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>Curated Sanctuary Collection</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#12372A] tracking-tight">
              Our Featured Villas
            </h2>
            <p className="mt-4 text-[#111827]/70 text-base sm:text-lg leading-relaxed">
              Handpicked architectural retreats offering unrivaled privacy, sweeping horizons, and bespoke Balinese hospitality.
            </p>
          </div>

          <Link
            href="/villas"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#12372A] hover:text-[#2D6A4F] group transition-colors self-start md:self-auto"
          >
            <span>Explore All 8 Sanctuaries</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Villa Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {villas.slice(0, 6).map((villa) => {
            const isWishlisted = savedWishlist.includes(villa.id);
            const mainImage = villa.images?.[0]?.url || '/images/hero-villa.jpg';

            return (
              <div
                key={villa.id}
                className="group bg-white rounded-3xl overflow-hidden border border-[#E9DFC7]/50 luxury-shadow luxury-shadow-hover transition-all duration-500 flex flex-col"
              >
                {/* Image Container with Zoom & Wishlist Button */}
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src={mainImage}
                    alt={villa.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Gradient shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Destination Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider border border-white/20">
                      {villa.destination}
                    </span>
                  </div>

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={(e) => toggleWishlist(e, villa.id)}
                    className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
                      isWishlisted
                        ? 'bg-red-500 text-white shadow-lg scale-110'
                        : 'bg-black/40 text-white hover:bg-white hover:text-red-500'
                    }`}
                    aria-label="Save to Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isWishlisted ? 'fill-white' : ''
                      }`}
                    />
                  </button>

                  {/* Private Pool Pill */}
                  {villa.hasPrivatePool && (
                    <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12372A]/85 backdrop-blur-md text-[#E9DFC7] text-xs font-medium border border-[#C5A46D]/30">
                      <Waves className="w-3.5 h-3.5 text-[#C5A46D]" />
                      <span>Private Infinity Pool</span>
                    </div>
                  )}

                  {/* Rating Badge */}
                  <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#12372A] text-xs font-bold shadow-md">
                    <Star className="w-3.5 h-3.5 fill-[#C5A46D] text-[#C5A46D]" />
                    <span>{villa.rating.toFixed(1)}</span>
                    <span className="text-gray-400 font-normal">({villa.reviewCount})</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#12372A] group-hover:text-[#2D6A4F] transition-colors line-clamp-1">
                      {villa.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 mb-3">
                      {villa.location}
                    </p>

                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
                      {villa.shortDescription}
                    </p>

                    {/* Key Specs */}
                    <div className="flex items-center gap-4 py-3 border-y border-gray-100 text-xs text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4 text-[#2D6A4F]" />
                        <span>{villa.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-[#2D6A4F]" />
                        <span>{villa.bathrooms} Baths</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-[#2D6A4F]" />
                        <span>{villa.maxGuests} Guests</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & View Button */}
                  <div className="mt-5 pt-2 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-gray-400 block">
                        Nightly Rate
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif text-lg font-bold text-[#12372A]">
                          {FORMAT_IDR(villa.pricePerNight)}
                        </span>
                        <span className="text-xs text-gray-500">/ night</span>
                      </div>
                    </div>

                    <Link
                      href={`/villa/${villa.slug}`}
                      className="px-4 py-2.5 rounded-full bg-[#12372A] hover:bg-[#2D6A4F] text-white text-xs font-bold tracking-wide transition-all duration-300 shadow hover:shadow-md flex items-center gap-1.5 group-hover:bg-[#2D6A4F]"
                    >
                      <span>View Villa</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
