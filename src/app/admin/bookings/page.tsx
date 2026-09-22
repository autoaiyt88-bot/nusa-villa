'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  UserMinus,
  FileText,
  ChevronDown,
} from 'lucide-react';
import { FORMAT_IDR, INITIAL_BOOKINGS } from '@/lib/data';
import { format } from 'date-fns';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const updateStatus = (id: string, newStatus: any) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.bookingCode.toLowerCase().includes(search.toLowerCase()) ||
      b.guestName.toLowerCase().includes(search.toLowerCase()) ||
      b.villaName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-serif text-3xl font-bold text-gray-900">
          Booking Management
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">
          Monitor reservations, check in guests, confirm incoming payments, or manage cancellations.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search code, guest name, or villa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0">
            Filter Status:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
          >
            <option value="ALL">All Statuses</option>
            <option value="WAITING_PAYMENT">Waiting Payment</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CHECKED_IN">Checked In</option>
            <option value="CHECKED_OUT">Checked Out</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/70 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-4 px-6">Booking ID</th>
                <th className="py-4 px-6">Guest Info</th>
                <th className="py-4 px-6">Villa Reserved</th>
                <th className="py-4 px-6">Dates & Nights</th>
                <th className="py-4 px-6">Total Invoiced</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((b) => {
                const getStatusPill = (status: string) => {
                  switch (status) {
                    case 'CONFIRMED':
                      return 'bg-emerald-100 text-emerald-800';
                    case 'WAITING_PAYMENT':
                      return 'bg-amber-100 text-amber-800';
                    case 'CHECKED_IN':
                      return 'bg-blue-100 text-blue-800';
                    case 'CHECKED_OUT':
                      return 'bg-gray-100 text-gray-700';
                    case 'CANCELLED':
                      return 'bg-red-100 text-red-800';
                    default:
                      return 'bg-gray-100 text-gray-800';
                  }
                };

                return (
                  <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-[#2D6A4F]">
                      {b.bookingCode}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900">{b.guestName}</div>
                      <div className="text-gray-400 text-[11px]">{b.guestEmail}</div>
                      <div className="text-gray-400 text-[11px]">{b.guestPhone}</div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-800">
                      {b.villaName}
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      <div>{b.checkIn} to {b.checkOut}</div>
                      <div className="text-gray-400 text-[11px] font-semibold">{b.nightCount} Nights • {b.totalGuests} Guests</div>
                    </td>
                    <td className="py-4 px-6 font-serif font-bold text-gray-900">
                      {FORMAT_IDR(b.totalPrice)}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${getStatusPill(b.status)}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-1 whitespace-nowrap">
                      {b.status === 'WAITING_PAYMENT' && (
                        <button
                          onClick={() => updateStatus(b.id, 'CONFIRMED')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[11px] transition-colors"
                        >
                          Confirm
                        </button>
                      )}

                      {b.status === 'CONFIRMED' && (
                        <button
                          onClick={() => updateStatus(b.id, 'CHECKED_IN')}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-[11px] transition-colors"
                        >
                          Check In
                        </button>
                      )}

                      {b.status === 'CHECKED_IN' && (
                        <button
                          onClick={() => updateStatus(b.id, 'CHECKED_OUT')}
                          className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-bold text-[11px] transition-colors"
                        >
                          Check Out
                        </button>
                      )}

                      {b.status !== 'CANCELLED' && b.status !== 'CHECKED_OUT' && (
                        <button
                          onClick={() => updateStatus(b.id, 'CANCELLED')}
                          className="px-2.5 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-bold text-[11px] transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
