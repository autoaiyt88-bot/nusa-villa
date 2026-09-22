'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/data';

export default function TestimonialSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIdx];

  return (
    <section
      className="py-24 bg-white relative overflow-hidden border-t border-[#E9DFC7]/40"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12372A]/5 text-[#2D6A4F] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>Verified Guest Experiences</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#12372A] tracking-tight">
            Loved By Discerning Travelers
          </h2>
          <p className="mt-4 text-gray-600 text-base sm:text-lg">
            Hear from international guests who celebrated life milestones in our sanctuaries.
          </p>
        </div>

        {/* Carousel Card */}
        <div className="bg-[#FAF9F6] rounded-3xl p-8 sm:p-12 border border-[#E9DFC7] luxury-shadow relative">
          <Quote className="w-16 h-16 text-[#C5A46D]/20 absolute top-8 right-8" />

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-[#C5A46D] text-[#C5A46D]"
              />
            ))}
            <span className="ml-2 text-sm font-bold text-[#12372A]">
              5.0 Exceptional
            </span>
          </div>

          {/* Review Title & Comment */}
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#12372A] mb-4">
            &ldquo;{current.title}&rdquo;
          </h3>

          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8 italic">
            {current.comment}
          </p>

          {/* Author Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#C5A46D]">
                {current.guestAvatar ? (
                  <Image
                    src={current.guestAvatar}
                    alt={current.guestName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#12372A] text-white flex items-center justify-center font-bold">
                    {current.guestName.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-bold text-[#12372A] text-base">
                  {current.guestName}
                </h4>
                <div className="text-xs text-gray-500">
                  {current.guestCountry} • Stayed at{' '}
                  <span className="font-semibold text-[#2D6A4F]">
                    {current.villaName}
                  </span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#12372A] hover:text-white hover:border-[#12372A] transition-all"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#12372A] hover:text-white hover:border-[#12372A] transition-all"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIdx === i ? 'w-8 bg-[#C5A46D]' : 'w-2 bg-gray-300'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
