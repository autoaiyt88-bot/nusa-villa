'use client';

import React, { useState } from 'react';
import {
  CalendarDays,
  Lock,
  Plus,
  Trash2,
  CheckCircle2,
  Wrench,
  Sparkles,
} from 'lucide-react';
import { INITIAL_VILLAS } from '@/lib/data';

export default function AdminCalendarPage() {
  const [selectedVilla, setSelectedVilla] = useState(INITIAL_VILLAS[0].id);
  const [blockedDates, setBlockedDates] = useState([
    {
      id: 'blk-1',
      villaName: 'Ocean Serenity Villa',
      startDate: '2026-10-01',
      endDate: '2026-10-04',
      reason: 'Infinity Pool Deep Filtration & Retiling',
    },
    {
      id: 'blk-2',
      villaName: 'Royal Bamboo Sanctuary',
      startDate: '2026-11-12',
      endDate: '2026-11-15',
      reason: 'Private Wedding Buyout',
    },
  ]);

  const [startDate, setStartDate] = useState('2026-10-25');
  const [endDate, setEndDate] = useState('2026-10-28');
  const [reason, setReason] = useState('Scheduled Maintenance');

  const handleAddBlock = (e: React.FormEvent) => {
    e.preventDefault();
    const villa = INITIAL_VILLAS.find((v) => v.id === selectedVilla);
    const newBlock = {
      id: `blk-${Date.now()}`,
      villaName: villa?.name || 'Villa',
      startDate,
      endDate,
      reason,
    };
    setBlockedDates([...blockedDates, newBlock]);
  };

  const removeBlock = (id: string) => {
    setBlockedDates(blockedDates.filter((b) => b.id !== id));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-serif text-3xl font-bold text-gray-900">
          Calendar & Availability Blocking
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">
          Block dates for scheduled property maintenance, private events, or owner stays to prevent guest double-bookings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Block Dates Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100 font-serif font-bold text-lg text-gray-900">
            <Lock className="w-5 h-5 text-[#2D6A4F]" />
            <span>Block Villa Dates</span>
          </div>

          <form onSubmit={handleAddBlock} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-bold text-gray-600 mb-1.5">
                Target Villa
              </label>
              <select
                value={selectedVilla}
                onChange={(e) => setSelectedVilla(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
              >
                {INITIAL_VILLAS.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.destination})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase font-bold text-gray-600 mb-1.5">
                  Start Date
                </label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-gray-600 mb-1.5">
                  End Date
                </label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-gray-600 mb-1.5">
                Reason / Memo
              </label>
              <input
                type="text"
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. VIP Private Buyout"
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#12372A] hover:bg-[#2D6A4F] text-white text-xs font-bold uppercase tracking-wider transition-all shadow flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Apply Calendar Lock</span>
            </button>
          </form>
        </div>

        {/* Active Blocks List (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="font-serif font-bold text-lg text-gray-900">
              Active Calendar Blocks
            </h3>
            <span className="text-xs text-gray-400 font-bold">
              {blockedDates.length} Active Locks
            </span>
          </div>

          <div className="space-y-3">
            {blockedDates.map((block) => (
              <div
                key={block.id}
                className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E9DFC7] flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-gray-900">
                      {block.villaName}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {block.startDate} to {block.endDate} • {block.reason}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeBlock(block.id)}
                  className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-white transition-colors"
                  title="Remove lock"
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
