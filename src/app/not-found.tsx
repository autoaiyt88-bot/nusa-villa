import Link from 'next/link';
import { Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6] text-center px-4">
      <div className="w-16 h-16 rounded-full bg-[#12372A] text-[#C5A46D] font-serif font-bold text-2xl flex items-center justify-center mb-6 shadow-xl">
        N
      </div>
      <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#2D6A4F] mb-2">
        404 • Page Not Found
      </span>
      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#12372A] mb-4">
        Sanctuary Horizon Not Found
      </h1>
      <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base mb-8">
        The luxury retreat or page you are looking for might have been relocated or is temporarily unavailable.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-[#12372A] hover:bg-[#2D6A4F] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/villas"
          className="px-6 py-3 rounded-full border border-[#C5A46D] text-[#12372A] hover:bg-[#C5A46D]/10 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
        >
          <Compass className="w-4 h-4" />
          <span>Explore All Villas</span>
        </Link>
      </div>
    </div>
  );
}
