'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, Key } from 'lucide-react';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        if (data.user?.role === 'ADMIN') {
          router.push('/admin');
        } else {
          router.push(callbackUrl);
        }
        router.refresh();
      } else {
        setErrorMessage(data.error || 'Invalid credentials');
      }
    } catch {
      setErrorMessage('Network error during login');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAdmin = () => {
    setEmail('admin@nusa-villa.test');
    setPassword('Admin123!');
  };

  const fillDemoGuest = () => {
    setEmail('guest@nusa-villa.test');
    setPassword('Guest123!');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FAF9F6] px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group mb-4">
            <div className="w-10 h-10 rounded-full bg-[#C5A46D] flex items-center justify-center text-[#12372A] font-serif font-bold text-xl shadow-md">
              N
            </div>
            <span className="font-serif text-2xl tracking-[0.2em] font-bold text-[#12372A]">
              NUSA VILLA
            </span>
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#12372A]">
            Sign In to Your Account
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Access your bookings, saved villas, and personalized concierge.
          </p>
        </div>

        {/* Quick Demo Credentials Helpers */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-[#E9DFC7] mb-6 shadow-sm space-y-2 text-xs">
          <div className="flex items-center justify-between text-gray-600 font-semibold">
            <span className="flex items-center gap-1.5 text-[#2D6A4F]">
              <Key className="w-3.5 h-3.5 text-[#C5A46D]" /> Quick Demo Logins:
            </span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={fillDemoAdmin}
              className="flex-1 py-1.5 px-2 rounded-lg bg-[#12372A] text-white hover:bg-[#2D6A4F] text-[11px] font-bold transition-colors"
            >
              Demo Admin (Manager)
            </button>
            <button
              type="button"
              onClick={fillDemoGuest}
              className="flex-1 py-1.5 px-2 rounded-lg bg-[#C5A46D] text-[#12372A] hover:bg-[#b09059] text-[11px] font-bold transition-colors"
            >
              Demo Guest User
            </button>
          </div>
        </div>

        {/* Card Form */}
        <div className="bg-white rounded-3xl p-8 border border-[#E9DFC7] luxury-shadow space-y-6">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-bold text-gray-600 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-gray-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-[#2D6A4F]" />
                <span>Remember me</span>
              </label>
              <span className="text-[#2D6A4F] hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-[#12372A] hover:bg-[#2D6A4F] text-white font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
            Don&apos;t have an account yet?{' '}
            <Link href="/register" className="font-bold text-[#2D6A4F] hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF9F6]" />}>
      <LoginFormContent />
    </Suspense>
  );
}
