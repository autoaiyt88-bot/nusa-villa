'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarCheck,
  Building,
  CalendarDays,
  Users,
  CreditCard,
  Tag,
  Star,
  Home,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Shield,
  Bell,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) {
          if (data.user.role === 'ADMIN' || data.user.role === 'STAFF') {
            setCurrentUser(data.user);
            setAuthorized(true);
          } else {
            router.push('/dashboard');
          }
        } else {
          router.push('/login?callbackUrl=/admin');
        }
      })
      .catch(() => router.push('/login?callbackUrl=/admin'));
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
    { label: 'Villa Portfolio', href: '/admin/villas', icon: Building },
    { label: 'Calendar & Blocks', href: '/admin/calendar', icon: CalendarDays },
    { label: 'Guest Directory', href: '/admin/guests', icon: Users },
    { label: 'Payments', href: '/admin/payments', icon: CreditCard },
    { label: 'Promo Codes', href: '/admin/promotions', icon: Tag },
    { label: 'Guest Reviews', href: '/admin/reviews', icon: Star },
  ];

  if (!authorized && !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#2D6A4F] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-gray-500 font-medium">Verifying Administrative Access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col md:flex-row">
      {/* Mobile Bar */}
      <div className="md:hidden bg-[#12372A] text-white p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#C5A46D] text-[#12372A] font-bold flex items-center justify-center text-xs">
            A
          </div>
          <span className="font-serif font-bold text-sm tracking-wide">NUSA VILLA ADMIN</span>
        </div>
        <button onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)} className="p-1">
          {mobileDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Admin SaaS Sidebar */}
      <aside
        className={`fixed md:sticky top-0 h-screen w-64 bg-[#111827] text-white flex flex-col justify-between p-5 z-50 transition-transform duration-300 ${
          mobileDrawerOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-xl bg-[#C5A46D] text-[#12372A] font-serif font-bold flex items-center justify-center text-lg shadow">
              N
            </div>
            <div>
              <span className="font-serif tracking-[0.15em] font-bold text-white block text-sm">
                NUSA VILLA
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#C5A46D] font-semibold">
                Executive Portal
              </span>
            </div>
          </div>

          {/* Admin User Chip */}
          <div className="bg-gray-800/70 rounded-2xl p-3 border border-gray-700/50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2D6A4F] text-white font-bold flex items-center justify-center text-xs shrink-0">
              {currentUser?.name?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{currentUser?.name}</p>
              <span className="text-[10px] bg-[#C5A46D] text-[#12372A] font-bold px-1.5 py-0.2 rounded">
                {currentUser?.role || 'ADMIN'}
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileDrawerOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#2D6A4F] text-white shadow-md'
                      : 'text-gray-400 hover:bg-gray-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#C5A46D]" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/70" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-gray-800 space-y-1.5">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Public Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-xl transition-colors text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Admin Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <header className="bg-white border-b border-gray-200 px-6 sm:px-10 py-4 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Current Date: <span className="font-semibold text-gray-800">21 September 2026</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#2D6A4F] font-bold bg-[#2D6A4F]/10 px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse" />
              Midtrans Sandbox Active
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-10">{children}</main>
      </div>
    </div>
  );
}
