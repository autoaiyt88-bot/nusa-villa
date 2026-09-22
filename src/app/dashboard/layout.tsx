'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Heart,
  User,
  Shield,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Home,
  Bell,
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) {
          setCurrentUser(data.user);
        } else {
          router.push('/login?callbackUrl=/dashboard');
        }
      })
      .catch(() => router.push('/login?callbackUrl=/dashboard'));
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Bookings', href: '/dashboard/bookings', icon: Calendar },
    { label: 'Saved Wishlist', href: '/dashboard/wishlist', icon: Heart },
    { label: 'My Profile', href: '/dashboard/profile', icon: User },
    { label: 'Security', href: '/dashboard/security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-[#12372A] text-white p-4 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#C5A46D] text-[#12372A] font-serif font-bold flex items-center justify-center text-sm">
            N
          </div>
          <span className="font-serif tracking-wider font-bold">NUSA VILLA</span>
        </Link>
        <button
          onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
          className="p-1.5 text-white"
        >
          {mobileDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 h-screen w-64 bg-[#12372A] text-white flex flex-col justify-between p-6 z-50 transition-transform duration-300 ${
          mobileDrawerOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-8">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#C5A46D] text-[#12372A] font-serif font-bold flex items-center justify-center text-lg shadow">
              N
            </div>
            <div>
              <span className="font-serif tracking-[0.2em] font-bold text-white block">
                NUSA VILLA
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#E9DFC7]">
                Guest Sanctuary Portal
              </span>
            </div>
          </Link>

          {/* User Profile Card */}
          {currentUser && (
            <div className="bg-white/10 rounded-2xl p-3.5 border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C5A46D] text-[#12372A] font-bold flex items-center justify-center shrink-0">
                {currentUser.name?.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-sm truncate">{currentUser.name}</p>
                <p className="text-[11px] text-[#E9DFC7] truncate">{currentUser.email}</p>
              </div>
            </div>
          )}

          {/* Nav List */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileDrawerOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#C5A46D] text-[#12372A] font-bold shadow-md'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-white/10 space-y-2">
          {currentUser?.role === 'ADMIN' && (
            <Link
              href="/admin"
              className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#C5A46D] font-bold hover:bg-white/10 rounded-xl transition-colors"
            >
              <Shield className="w-4 h-4" />
              <span>Admin Management</span>
            </Link>
          )}

          <Link
            href="/"
            className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-red-300 hover:text-red-200 hover:bg-red-500/20 rounded-xl transition-colors text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 p-6 sm:p-10">{children}</main>
      </div>
    </div>
  );
}
