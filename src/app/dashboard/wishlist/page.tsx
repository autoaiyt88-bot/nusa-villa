'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, Trash2, ArrowRight } from 'lucide-react';
import { FORMAT_IDR, INITIAL_VILLAS } from '@/lib/data';

export default function WishlistPage() {
  const [wishlistVillas, setWishlistVillas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/wishlist')
      .then((res) => res.json())
      .then((data) => {
        if (data?.items && data.items.length > 0) {
          setWishlistVillas(data.items);
        } else {
          // Fallback to sample saved villas for demo user
          setWishlistVillas(INITIAL_VILLAS.slice(0, 2));
        }
      })
      .catch(() => {
        setWishlistVillas(INITIAL_VILLAS.slice(0, 2));
      })
      .finally(() => setLoading(false));
  }, []);

  const handleRemove = async (villaId: string) => {
    setWishlistVillas((prev) => prev.filter((v) => v.id !== villaId));
    fetch('/api/wishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ villaId }),
    }).catch(() => {});
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#12372A]">
          Saved Wishlist
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Your collection of favorite Bali villas for future holidays.
        </p>
      </div>

      {wishlistVillas.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E9DFC7]">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="font-serif text-xl font-bold text-[#12372A]">
            Your wishlist is empty
          </h3>
          <p className="text-gray-500 text-xs mt-1 mb-6">
            Tap the heart icon on any villa to save it here for later.
          </p>
          <Link
            href="/villas"
            className="px-6 py-2.5 rounded-full bg-[#12372A] text-white text-xs font-bold uppercase tracking-wider"
          >
            Explore Villas
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishlistVillas.map((villa) => {
            const img = villa.images?.[0]?.url || '/images/hero-villa.jpg';
            return (
              <div
                key={villa.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#E9DFC7] luxury-shadow flex flex-col justify-between"
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={img}
                    alt={villa.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 z-10">
                    <button
                      onClick={() => handleRemove(villa.id)}
                      className="p-2.5 rounded-full bg-white/90 text-red-500 hover:bg-white shadow-md transition-all"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold">
                    {villa.destination}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#12372A]">
                      {villa.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">{villa.location}</p>
                    <p className="text-xs text-gray-600 line-clamp-2 mt-2 leading-relaxed">
                      {villa.shortDescription}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <span className="text-[10px] uppercase text-gray-400 block font-semibold">
                        From
                      </span>
                      <span className="font-serif font-bold text-[#12372A]">
                        {FORMAT_IDR(villa.pricePerNight)}
                      </span>
                    </div>

                    <Link
                      href={`/villa/${villa.slug}`}
                      className="px-4 py-2 rounded-full bg-[#12372A] hover:bg-[#2D6A4F] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <span>View Villa</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
