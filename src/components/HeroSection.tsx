'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import HeroSearch from './HeroSearch';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSearch = () => {
    const searchElem = document.getElementById('search-anchor');
    if (searchElem) {
      searchElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen flex flex-col justify-between overflow-hidden pt-28 pb-12">
      {/* Animated Ken Burns Background Container with Parallax */}
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.25}px)`,
        }}
      >
        <div className="relative w-full h-full animate-ken-burns origin-center">
          <Image
            src="/images/hero-villa.jpg"
            alt="Nusa Villa Luxury Sunset Cliffside Villa Uluwatu Bali"
            fill
            priority
            quality={95}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Cinematic Multi-stop Dark Gradient Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              'linear-gradient(to bottom, rgba(18,55,42,0.65) 0%, rgba(0,0,0,0.30) 40%, rgba(0,0,0,0.55) 75%, rgba(18,55,42,0.92) 100%)',
          }}
        />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto flex flex-col items-center">
        {/* Badge / Small text */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#C5A46D]/40 text-[#E9DFC7] text-xs uppercase tracking-[0.3em] font-semibold mb-6 backdrop-blur-md shadow-lg animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
          <span>ESCAPE • RELAX • EXPERIENCE</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-md">
          Find Your Perfect <br className="hidden sm:inline" />
          <span className="italic font-normal text-[#E9DFC7]">Private Villa</span>
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-white/90 font-light leading-relaxed mb-10 drop-shadow">
          Discover handpicked luxury villas designed for unforgettable stays, from peaceful tropical escapes to breathtaking ocean views.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/villas"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C5A46D] hover:bg-[#b59359] text-[#12372A] font-bold text-sm tracking-wide transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2 group"
          >
            <span>Explore Villas</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <button
            onClick={scrollToSearch}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md font-semibold text-sm tracking-wide transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
          >
            <span>View Availability</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Booking Search Anchor & Bar */}
      <div id="search-anchor" className="relative z-20 px-4 sm:px-6 lg:px-8 mt-10">
        <HeroSearch />
      </div>
    </section>
  );
}
