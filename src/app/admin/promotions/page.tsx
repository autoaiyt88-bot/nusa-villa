'use client';

import React, { useState } from 'react';
import { Tag, Plus, CheckCircle2, Trash2, Calendar, Sparkles } from 'lucide-react';
import { PROMOTIONS, FORMAT_IDR } from '@/lib/data';

export default function AdminPromotionsPage() {
  const [promos, setPromos] = useState(PROMOTIONS);
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState('PERCENTAGE');
  const [value, setValue] = useState('15');
  const [minSpend, setMinSpend] = useState('3000000');

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    const newPromo = {
      code: code.toUpperCase().trim(),
      description,
      discountType,
      value: parseFloat(value),
      minSpend: parseFloat(minSpend),
      isActive: true,
    };
    setPromos([...promos, newPromo]);
    setCode('');
    setDescription('');
  };

  const removePromo = (codeToRemove: string) => {
    setPromos(promos.filter((p) => p.code !== codeToRemove));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-serif text-3xl font-bold text-gray-900">
          Promotion & Coupon System
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">
          Create seasonal voucher codes, percentage discounts, and minimum stay criteria.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Create Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100 font-serif font-bold text-lg text-gray-900">
            <Tag className="w-5 h-5 text-[#2D6A4F]" />
            <span>Create Promo Voucher</span>
          </div>

          <form onSubmit={handleCreatePromo} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-bold text-gray-600 mb-1">
                Coupon Code *
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. SUMMER15"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs uppercase font-bold tracking-wider focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-gray-600 mb-1">
                Description *
              </label>
              <input
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="15% discount on 3 nights or more"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase font-bold text-gray-600 mb-1">
                  Type
                </label>
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                >
                  <option value="PERCENTAGE">Percentage (%)</option>
                  <option value="FIXED_AMOUNT">Fixed IDR Amount</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-gray-600 mb-1">
                  Discount Value
                </label>
                <input
                  type="number"
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={discountType === 'PERCENTAGE' ? '15' : '500000'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-gray-600 mb-1">
                Minimum Spend (IDR)
              </label>
              <input
                type="number"
                value={minSpend}
                onChange={(e) => setMinSpend(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#12372A] hover:bg-[#2D6A4F] text-white text-xs font-bold uppercase tracking-wider transition-all shadow flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Launch Promo Code</span>
            </button>
          </form>
        </div>

        {/* Active Promos List (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="font-serif font-bold text-lg text-gray-900">
              Active Promotional Codes
            </h3>
            <span className="text-xs text-gray-400 font-bold">
              {promos.length} Coupons Live
            </span>
          </div>

          <div className="space-y-3">
            {promos.map((p) => (
              <div
                key={p.code}
                className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E9DFC7] flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-[#12372A] bg-[#C5A46D] px-2.5 py-0.5 rounded-md">
                      {p.code}
                    </span>
                    <span className="text-[11px] font-bold text-[#2D6A4F]">
                      {p.discountType === 'PERCENTAGE' ? `${p.value}% OFF` : `-${FORMAT_IDR(p.value)}`}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 font-medium">
                    {p.description}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Min spend: {FORMAT_IDR(p.minSpend)}
                  </p>
                </div>

                <button
                  onClick={() => removePromo(p.code)}
                  className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-white transition-colors"
                  title="Delete voucher"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
