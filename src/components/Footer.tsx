import React from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Share2,
  ShieldCheck,
  Award,
  Sparkles,
  Globe,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-[#12372A] text-white pt-20 pb-12 border-t border-[#C5A46D]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Col 1 & 2: Brand Story */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden border border-[#C5A46D]/60 shadow-lg shrink-0">
                <img
                  src="/images/logo.jpg"
                  alt="Nusa Villa Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-serif text-2xl tracking-[0.25em] font-bold text-white block">
                  NUSA VILLA
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#E9DFC7] font-medium block">
                  Bali Luxury Sanctuaries
                </span>
              </div>
            </div>

            <p className="text-[#FAF9F6]/80 text-sm leading-relaxed max-w-md">
              Handcrafted luxury stays across the island of gods. From private cliffside sanctuaries in Uluwatu to serene rainforest bamboo estates in Ubud, we deliver bespoke Balinese hospitality for the discerning traveler.
            </p>

            <div className="flex items-center gap-4 text-[#C5A46D]">
              <div className="flex items-center gap-1.5 text-xs text-white/90">
                <ShieldCheck className="w-4 h-4 text-[#C5A46D]" /> Verified Villas
              </div>
              <div className="flex items-center gap-1.5 text-xs text-white/90">
                <Award className="w-4 h-4 text-[#C5A46D]" /> Best Price Guarantee
              </div>
              <div className="flex items-center gap-1.5 text-xs text-white/90">
                <Sparkles className="w-4 h-4 text-[#C5A46D]" /> 24/7 Butler
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C5A46D] hover:text-[#12372A] transition-all flex items-center justify-center text-white/90"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C5A46D] hover:text-[#12372A] transition-all flex items-center justify-center text-white/90"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C5A46D] hover:text-[#12372A] transition-all flex items-center justify-center text-white/90"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C5A46D] hover:text-[#12372A] transition-all flex items-center justify-center text-white/90"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="font-serif text-lg text-[#C5A46D] mb-5 tracking-wide">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <Link href="/villas" className="hover:text-[#C5A46D] transition-colors">
                  All Luxury Villas
                </Link>
              </li>
              <li>
                <Link href="/villas?destination=Uluwatu" className="hover:text-[#C5A46D] transition-colors">
                  Uluwatu Cliff Villas
                </Link>
              </li>
              <li>
                <Link href="/villas?destination=Ubud" className="hover:text-[#C5A46D] transition-colors">
                  Ubud Rainforest Retreats
                </Link>
              </li>
              <li>
                <Link href="/villas?destination=Seminyak" className="hover:text-[#C5A46D] transition-colors">
                  Seminyak Designer Penthouses
                </Link>
              </li>
              <li>
                <Link href="/villas?destination=Nusa+Dua" className="hover:text-[#C5A46D] transition-colors">
                  Nusa Dua Beachfront
                </Link>
              </li>
              <li>
                <Link href="/#experiences" className="hover:text-[#C5A46D] transition-colors">
                  Bespoke Experiences
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Guest Support & Policies */}
          <div>
            <h4 className="font-serif text-lg text-[#C5A46D] mb-5 tracking-wide">
              Guest Support
            </h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <Link href="/dashboard" className="hover:text-[#C5A46D] transition-colors">
                  Guest Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/bookings" className="hover:text-[#C5A46D] transition-colors">
                  Check Booking Status
                </Link>
              </li>
              <li>
                <Link href="/#why-us" className="hover:text-[#C5A46D] transition-colors">
                  Cancellation Policies
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-[#C5A46D] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#C5A46D] hover:underline flex items-center gap-1">
                  Owner & Staff Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Bali Concierge Office */}
          <div>
            <h4 className="font-serif text-lg text-[#C5A46D] mb-5 tracking-wide">
              Bali Concierge
            </h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C5A46D] shrink-0 mt-0.5" />
                <span>Jl. Raya Uluwatu No. 108, Pecatu, Badung, Bali 80361, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C5A46D] shrink-0" />
                <a href="tel:+62361889900" className="hover:text-[#C5A46D]">
                  +62 (361) 889-900
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C5A46D] shrink-0" />
                <a href="mailto:reservations@nusa-villa.test" className="hover:text-[#C5A46D]">
                  reservations@nusa-villa.test
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {currentYear} NUSA VILLA — Luxury Villa Booking Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#C5A46D] cursor-pointer">Privacy Notice</span>
            <span className="hover:text-[#C5A46D] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#C5A46D] cursor-pointer">Security Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
