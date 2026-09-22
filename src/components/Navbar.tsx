'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu,
  X,
  User,
  Heart,
  Calendar,
  LogOut,
  Shield,
  Compass,
  ChevronDown,
} from 'lucide-react';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string | null;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check authentication state
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) {
          setCurrentUser(data.user);
        } else {
          setCurrentUser(null);
        }
      })
      .catch(() => setCurrentUser(null));
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setCurrentUser(null);
    setUserDropdownOpen(false);
    router.refresh();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHomePage
          ? 'glass-nav py-3.5 shadow-lg'
          : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#C5A46D]/60 shadow-md transition-transform group-hover:scale-105 relative shrink-0">
            <img
              src="/images/logo.jpg"
              alt="Nusa Villa Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl tracking-[0.25em] font-semibold text-white drop-shadow-sm">
              NUSA VILLA
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#E9DFC7] font-medium opacity-90">
              Bali Luxury Escapes
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-[#C5A46D] ${
              pathname === '/' ? 'text-[#C5A46D] font-semibold' : 'text-white/90'
            }`}
          >
            Home
          </Link>
          <Link
            href="/villas"
            className={`text-sm font-medium transition-colors hover:text-[#C5A46D] ${
              pathname.startsWith('/villas') ? 'text-[#C5A46D] font-semibold' : 'text-white/90'
            }`}
          >
            Villas
          </Link>
          <Link
            href="/#destinations"
            className="text-sm font-medium text-white/90 transition-colors hover:text-[#C5A46D]"
          >
            Destinations
          </Link>
          <Link
            href="/#experiences"
            className="text-sm font-medium text-white/90 transition-colors hover:text-[#C5A46D]"
          >
            Experiences
          </Link>
          <Link
            href="/#gallery"
            className="text-sm font-medium text-white/90 transition-colors hover:text-[#C5A46D]"
          >
            Gallery
          </Link>
          <Link
            href="/#why-us"
            className="text-sm font-medium text-white/90 transition-colors hover:text-[#C5A46D]"
          >
            About
          </Link>
        </nav>

        {/* Right Action Icons & User Dropdown */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/dashboard/wishlist"
            className="p-2 text-white/80 hover:text-[#C5A46D] transition-colors rounded-full hover:bg-white/10"
            title="Saved Villas"
          >
            <Heart className="w-5 h-5" />
          </Link>

          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white transition-all text-sm"
              >
                <div className="w-7 h-7 rounded-full bg-[#C5A46D] text-[#12372A] font-semibold flex items-center justify-center text-xs overflow-hidden">
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    currentUser.name.charAt(0).toUpperCase()
                  )}
                </div>
                <span className="max-w-[110px] truncate font-medium">
                  {currentUser.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-white/70" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#12372A] border border-[#C5A46D]/30 rounded-xl shadow-2xl py-2 z-50 text-white text-sm backdrop-blur-lg">
                  <div className="px-4 py-2 border-b border-white/10">
                    <p className="font-semibold text-white truncate">{currentUser.name}</p>
                    <p className="text-xs text-[#E9DFC7] truncate">{currentUser.email}</p>
                    {currentUser.role === 'ADMIN' && (
                      <span className="inline-block mt-1 text-[10px] bg-[#C5A46D] text-[#12372A] font-bold px-2 py-0.5 rounded">
                        ADMIN
                      </span>
                    )}
                  </div>

                  {currentUser.role === 'ADMIN' && (
                    <Link
                      href="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-white/10 text-[#C5A46D] font-medium"
                    >
                      <Shield className="w-4 h-4" />
                      Admin Dashboard
                    </Link>
                  )}

                  <Link
                    href="/dashboard"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-white/10"
                  >
                    <User className="w-4 h-4 text-[#C5A46D]" />
                    Dashboard Overview
                  </Link>

                  <Link
                    href="/dashboard/bookings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-white/10"
                  >
                    <Calendar className="w-4 h-4 text-[#C5A46D]" />
                    My Bookings
                  </Link>

                  <Link
                    href="/dashboard/wishlist"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-white/10"
                  >
                    <Heart className="w-4 h-4 text-[#C5A46D]" />
                    Saved Wishlist
                  </Link>

                  <div className="border-t border-white/10 my-1"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-red-500/20 text-red-300 text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-white hover:text-[#C5A46D] transition-colors px-3 py-1.5"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium bg-[#C5A46D] hover:bg-[#b09059] text-[#12372A] px-4 py-2 rounded-full transition-all shadow-md hover:shadow-lg font-semibold"
              >
                Register
              </Link>
            </div>
          )}

          <Link
            href="/villas"
            className="ml-1 hidden lg:inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold bg-[#2D6A4F] hover:bg-[#23533e] text-white px-4 py-2 rounded-full transition-all shadow-sm"
          >
            <Compass className="w-3.5 h-3.5" />
            Book Now
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-3">
          <Link
            href="/dashboard/wishlist"
            className="p-1.5 text-white/80 hover:text-[#C5A46D]"
          >
            <Heart className="w-5 h-5" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-[#C5A46D] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#12372A] border-b border-[#C5A46D]/30 px-6 py-6 space-y-4 shadow-2xl transition-all">
          <div className="flex flex-col space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#C5A46D] py-1 font-medium"
            >
              Home
            </Link>
            <Link
              href="/villas"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#C5A46D] py-1 font-medium"
            >
              Our Villas
            </Link>
            <Link
              href="/#destinations"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#C5A46D] py-1 font-medium"
            >
              Destinations
            </Link>
            <Link
              href="/#experiences"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#C5A46D] py-1 font-medium"
            >
              Experiences
            </Link>
            <Link
              href="/#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#C5A46D] py-1 font-medium"
            >
              Gallery
            </Link>
          </div>

          <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
            {currentUser ? (
              <>
                <div className="text-xs text-[#E9DFC7]">
                  Signed in as <span className="font-bold text-white">{currentUser.name}</span>
                </div>
                {currentUser.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-[#C5A46D] font-semibold py-1"
                  >
                    <Shield className="w-4 h-4" /> Admin Portal
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-white py-1"
                >
                  <User className="w-4 h-4 text-[#C5A46D]" /> Dashboard
                </Link>
                <Link
                  href="/dashboard/bookings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-white py-1"
                >
                  <Calendar className="w-4 h-4 text-[#C5A46D]" /> My Bookings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-red-400 py-1 text-left"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 border border-[#C5A46D] text-[#C5A46D] rounded-xl font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 bg-[#C5A46D] text-[#12372A] rounded-xl font-bold"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
