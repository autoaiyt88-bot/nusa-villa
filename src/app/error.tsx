'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCcw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled platform error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6] text-center px-4">
      <span className="text-xs uppercase tracking-[0.25em] font-bold text-red-600 mb-2">
        System Notice
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#12372A] mb-4">
        Something Unexpected Occurred
      </h1>
      <p className="text-gray-600 max-w-md mx-auto text-sm mb-8">
        We apologize for the inconvenience. Our concierge system has logged this incident.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-full bg-[#12372A] hover:bg-[#2D6A4F] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow"
        >
          <RefreshCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
        <Link
          href="/"
          className="px-6 py-3 rounded-full border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </Link>
      </div>
    </div>
  );
}
