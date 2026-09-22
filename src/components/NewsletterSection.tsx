'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Thank you for subscribing to Nusa Villa!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again later.');
    }
  };

  return (
    <section className="py-20 bg-[#12372A] relative overflow-hidden">
      {/* Decorative Blur Circles */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#2D6A4F]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C5A46D]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#C5A46D] text-xs font-semibold uppercase tracking-wider mb-4 border border-white/15">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Private Club Invitations</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Unlock Exclusive Member Rates
        </h2>

        <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Subscribe for secret seasonal promotions, newly unveiled architectural villas, and VIP concierge invitations.
        </p>

        {status === 'success' ? (
          <div className="bg-[#2D6A4F]/60 border border-[#C5A46D]/50 rounded-2xl p-6 max-w-md mx-auto flex items-center justify-center gap-3 text-white animate-fade-in shadow-xl">
            <CheckCircle className="w-6 h-6 text-[#C5A46D]" />
            <span className="text-sm font-medium">{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-2 bg-white/10 backdrop-blur-md p-2 rounded-2xl sm:rounded-full border border-white/20 shadow-2xl">
              <div className="flex items-center gap-3 px-4 py-2 w-full">
                <Mail className="w-5 h-5 text-[#C5A46D] shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="bg-transparent text-white placeholder-white/50 text-sm focus:outline-none w-full"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto px-6 py-3 bg-[#C5A46D] hover:bg-[#b09059] text-[#12372A] font-bold text-xs uppercase tracking-wider rounded-xl sm:rounded-full transition-all shrink-0 flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
              >
                <span>{status === 'loading' ? 'Joining...' : 'Get Exclusive Offers'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {status === 'error' && (
              <p className="mt-3 text-xs text-red-300 font-medium">{message}</p>
            )}

            <p className="mt-4 text-xs text-white/50">
              Zero spam. Unsubscribe at any time with a single click.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
