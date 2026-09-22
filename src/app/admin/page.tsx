'use client';

import React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  CalendarCheck,
  Building,
  Users,
  DollarSign,
  ArrowUpRight,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { FORMAT_IDR } from '@/lib/data';

const revenueData = [
  { month: 'Apr', revenue: 65000000, bookings: 12 },
  { month: 'May', revenue: 78000000, bookings: 15 },
  { month: 'Jun', revenue: 110000000, bookings: 21 },
  { month: 'Jul', revenue: 135000000, bookings: 26 },
  { month: 'Aug', revenue: 128000000, bookings: 24 },
  { month: 'Sep', revenue: 142800000, bookings: 28 },
];

const occupancyByDestination = [
  { name: 'Uluwatu', rate: 92 },
  { name: 'Ubud', rate: 88 },
  { name: 'Seminyak', rate: 85 },
  { name: 'Canggu', rate: 89 },
  { name: 'Nusa Dua', rate: 80 },
  { name: 'Sanur', rate: 76 },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">
            Executive Analytics & Performance
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Real-time reservation metrics, revenue yields, and villa occupancy.
          </p>
        </div>

        <Link
          href="/admin/villas"
          className="px-5 py-2.5 rounded-full bg-[#12372A] hover:bg-[#2D6A4F] text-white text-xs font-bold transition-all shadow flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>Manage Portfolio</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold uppercase mb-2">
            <span>Total Revenue</span>
            <div className="w-7 h-7 rounded-lg bg-[#2D6A4F]/10 text-[#2D6A4F] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-xl sm:text-2xl font-bold text-gray-900">
            Rp 142.8M
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-2">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold uppercase mb-2">
            <span>Total Bookings</span>
            <div className="w-7 h-7 rounded-lg bg-[#12372A]/10 text-[#12372A] flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-xl sm:text-2xl font-bold text-gray-900">
            28 Stays
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-2">
            <TrendingUp className="w-3 h-3" />
            <span>+12.5% vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold uppercase mb-2">
            <span>Occupancy Rate</span>
            <div className="w-7 h-7 rounded-lg bg-[#C5A46D]/15 text-[#C5A46D] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-xl sm:text-2xl font-bold text-gray-900">
            86.4%
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-2">
            <TrendingUp className="w-3 h-3" />
            <span>+4.2% MoM</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold uppercase mb-2">
            <span>Active Villas</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-xl sm:text-2xl font-bold text-gray-900">
            8 Villas
          </div>
          <div className="text-[11px] text-gray-400 mt-2">
            100% operational
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold uppercase mb-2">
            <span>Total Guests</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-xl sm:text-2xl font-bold text-gray-900">
            68 Guests
          </div>
          <div className="text-[11px] text-emerald-600 font-bold mt-2">
            +9.8% new clients
          </div>
        </div>
      </div>

      {/* Interactive Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Area Chart */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-gray-900">
                Gross Monthly Revenue Yield
              </h3>
              <p className="text-xs text-gray-400">Past 6 months trend in IDR</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              +18.4%
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D6A4F" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2D6A4F" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} textAnchor="middle" fontSize={11} stroke="#6B7280" />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  fontSize={10}
                  stroke="#6B7280"
                  tickFormatter={(val) => `${val / 1000000}M`}
                />
                <Tooltip
                  formatter={(value: any) => [FORMAT_IDR(Number(value)), 'Revenue']}
                  contentStyle={{ backgroundColor: '#111827', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2D6A4F" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Occupancy by Destination Bar Chart */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-gray-900">
                Occupancy by Destination (%)
              </h3>
              <p className="text-xs text-gray-400">Average September booking rate</p>
            </div>
            <span className="text-xs font-bold text-[#C5A46D] bg-[#C5A46D]/15 px-2.5 py-1 rounded-full">
              Uluwatu Leading (92%)
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={occupancyByDestination}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={11} stroke="#6B7280" />
                <YAxis tickLine={false} axisLine={false} fontSize={10} stroke="#6B7280" domain={[0, 100]} />
                <Tooltip
                  formatter={(value: any) => [`${value}%`, 'Occupancy']}
                  contentStyle={{ backgroundColor: '#111827', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="rate" fill="#12372A" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Quick Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-gray-900">
            Recent Reservation Activity
          </h3>
          <Link
            href="/admin/bookings"
            className="text-xs text-[#2D6A4F] hover:underline font-bold"
          >
            View All Bookings →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 uppercase tracking-wider font-semibold">
                <th className="pb-3">Booking ID</th>
                <th className="pb-3">Guest</th>
                <th className="pb-3">Villa</th>
                <th className="pb-3">Dates</th>
                <th className="pb-3">Total</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 font-mono font-bold text-[#2D6A4F]">NV-2026-8921</td>
                <td className="py-3 font-semibold">Liam Hemsworth</td>
                <td className="py-3 text-gray-600">Ocean Serenity Villa</td>
                <td className="py-3 text-gray-500">10 Oct – 14 Oct</td>
                <td className="py-3 font-bold">Rp 16.650.000</td>
                <td className="py-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    CONFIRMED
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-mono font-bold text-[#2D6A4F]">NV-2026-7432</td>
                <td className="py-3 font-semibold">Sophia Lorenza</td>
                <td className="py-3 text-gray-600">Royal Bamboo Sanctuary</td>
                <td className="py-3 text-gray-500">18 Oct – 21 Oct</td>
                <td className="py-3 font-bold">Rp 14.073.800</td>
                <td className="py-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                    WAITING_PAYMENT
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-mono font-bold text-[#2D6A4F]">NV-2026-5120</td>
                <td className="py-3 font-semibold">Marcus Aurelius</td>
                <td className="py-3 text-gray-600">The Glass Penthouse Villa</td>
                <td className="py-3 text-gray-500">01 Sep – 05 Sep</td>
                <td className="py-3 font-bold">Rp 13.331.100</td>
                <td className="py-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700">
                    CHECKED_OUT
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
