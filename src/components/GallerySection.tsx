'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';

export default function GallerySection() {
  const images = [
    {
      url: '/images/hero-villa.jpg',
      title: 'Ocean Serenity Uluwatu Cliff Pool',
      category: 'Cliffside Infinity Pool',
      aspect: 'col-span-1 md:col-span-2 row-span-2 h-96 md:h-full',
    },
    {
      url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
      title: 'Royal Bamboo Sanctuary Living Pavilion',
      category: 'Eco Architecture',
      aspect: 'col-span-1 h-64 md:h-72',
    },
    {
      url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      title: 'Master Suite Ocean Terrace',
      category: 'Master Bedroom',
      aspect: 'col-span-1 h-64 md:h-72',
    },
    {
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      title: 'The Glass Penthouse Lap Pool',
      category: 'Modern Minimalist',
      aspect: 'col-span-1 h-64 md:h-72',
    },
    {
      url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      title: 'Valley Hydrotherapy Pool',
      category: 'Wellness Retreat',
      aspect: 'col-span-1 h-64 md:h-72',
    },
    {
      url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
      title: 'Morning Floating Breakfast Setup',
      category: 'Dining Experience',
      aspect: 'col-span-1 md:col-span-2 h-72 md:h-80',
    },
  ];

  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    if (activeIdx !== null) {
      setActiveIdx((activeIdx - 1 + images.length) % images.length);
    }
  }, [activeIdx, images.length]);

  const handleNext = useCallback(() => {
    if (activeIdx !== null) {
      setActiveIdx((activeIdx + 1) % images.length);
    }
  }, [activeIdx, images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIdx === null) return;
      if (e.key === 'Escape') setActiveIdx(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx, handlePrev, handleNext]);

  return (
    <section id="gallery" className="py-24 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12372A]/5 text-[#2D6A4F] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>Visual Journey</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#12372A] tracking-tight">
            The Nusa Villa Gallery
          </h2>
          <p className="mt-4 text-gray-600 text-base sm:text-lg">
            Glimpse into the serene ambiance, infinity horizons, and artisan design of our Bali sanctuaries.
          </p>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 auto-rows-[220px]">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 ${
                i === 0
                  ? 'md:col-span-2 md:row-span-2'
                  : i === 5
                  ? 'md:col-span-2'
                  : 'md:col-span-1'
              }`}
            >
              <Image
                src={img.url}
                alt={img.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[11px] uppercase tracking-wider text-[#E9DFC7] font-semibold">
                  {img.category}
                </span>
                <div className="flex items-center justify-between mt-1">
                  <h4 className="font-serif text-lg font-bold text-white">
                    {img.title}
                  </h4>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setActiveIdx(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveIdx(null)}
            className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption */}
          <div
            className="relative max-w-5xl w-full h-[75vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={images[activeIdx].url}
                alt={images[activeIdx].title}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>

            <div className="mt-4 text-center">
              <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
                {images[activeIdx].category} • {activeIdx + 1} of {images.length}
              </span>
              <h3 className="font-serif text-xl font-bold text-white mt-1">
                {images[activeIdx].title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
