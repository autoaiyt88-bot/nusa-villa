'use client';

import React, { useState } from 'react';
import { Star, CheckCircle, EyeOff, Trash2 } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/data';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([
    ...TESTIMONIALS,
    {
      id: 'rev-4',
      villaId: 'villa-3',
      villaName: 'The Glass Penthouse Villa',
      guestName: 'Oliver Twist',
      guestCountry: 'United Kingdom',
      rating: 5.0,
      title: 'Flawless design in Seminyak',
      comment: 'Top quality beds, delicious breakfasts cooked by our butler, and walking distance to Ku De Ta.',
      date: '18 September 2026',
      isApproved: true,
    },
    {
      id: 'rev-5',
      villaId: 'villa-6',
      villaName: 'Coral Heritage Villa',
      guestName: 'Anonymous Traveler',
      guestCountry: 'Unknown',
      rating: 2.0,
      title: 'Rain during stay',
      comment: 'It rained for two days during the monsoon season.',
      date: '10 September 2026',
      isApproved: false,
    },
  ]);

  const toggleApproval = (id: string) => {
    setReviews((prev) =>
      prev.map((r: any) =>
        r.id === id ? { ...r, isApproved: !r.isApproved } : r
      )
    );
  };

  const deleteReview = (id: string) => {
    setReviews(reviews.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-serif text-3xl font-bold text-gray-900">
          Guest Review Moderation
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">
          Review authentic guest feedback, verify completed stays, and moderate public displays.
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((rev: any) => (
          <div
            key={rev.id}
            className={`bg-white rounded-3xl p-6 border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all ${
              rev.isApproved ? 'border-gray-200' : 'border-amber-200 bg-amber-50/20'
            }`}
          >
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(rev.rating)
                          ? 'fill-[#C5A46D] text-[#C5A46D]'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-900">
                  {rev.rating.toFixed(1)}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs font-semibold text-[#2D6A4F]">
                  {rev.villaName}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">
                  {rev.guestName} ({rev.guestCountry})
                </span>
              </div>

              {rev.title && (
                <h4 className="font-serif font-bold text-base text-gray-900">
                  &ldquo;{rev.title}&rdquo;
                </h4>
              )}

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {rev.comment}
              </p>
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
              <button
                onClick={() => toggleApproval(rev.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  rev.isApproved
                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                }`}
              >
                {rev.isApproved ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Approved</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Hidden</span>
                  </>
                )}
              </button>

              <button
                onClick={() => deleteReview(rev.id)}
                className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Delete inappropriate review"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
