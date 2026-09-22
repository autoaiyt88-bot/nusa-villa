import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { DESTINATIONS } from '@/lib/data';

export default function DestinationsSection() {
  return (
    <section id="destinations" className="py-24 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#2D6A4F] bg-[#2D6A4F]/10 px-4 py-1 rounded-full">
            Bali Island Destinations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#12372A] mt-4 mb-4">
            Explore Destinations
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Immerse yourself in distinct Balinese landscapes — from cliffside ocean panoramas in Uluwatu to sacred spiritual valleys in Ubud.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((dest) => (
            <Link
              key={dest.id}
              href={`/villas?destination=${encodeURIComponent(dest.name)}`}
              className="group relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-8"
            >
              {/* Image */}
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity group-hover:opacity-90" />

              {/* Content */}
              <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                    {dest.name}
                  </h3>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#C5A46D] group-hover:text-[#12372A] transition-all">
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <p className="text-white/80 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-3">
                  {dest.description}
                </p>

                <div className="text-xs text-[#E9DFC7] font-semibold tracking-wider uppercase">
                  {dest.villaCount}+ Available Villas
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
