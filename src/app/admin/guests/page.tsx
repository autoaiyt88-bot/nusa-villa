'use client';

import React, { useState } from 'react';
import { Search, Mail, Phone, Globe, UserCheck, Shield } from 'lucide-react';
import { FORMAT_IDR } from '@/lib/data';

const sampleGuests = [
  {
    id: 'g-1',
    name: 'Liam Hemsworth',
    email: 'liam.h@example.com',
    phone: '+61 412 345 678',
    country: 'Australia',
    bookingsCount: 3,
    totalSpent: 42500000,
    lastStay: '10 Oct 2026',
  },
  {
    id: 'g-2',
    name: 'Sophia Lorenza',
    email: 'sophia@example.com',
    phone: '+62 812 9876 5432',
    country: 'Indonesia',
    bookingsCount: 2,
    totalSpent: 28147600,
    lastStay: '18 Oct 2026',
  },
  {
    id: 'g-3',
    name: 'Marcus Aurelius',
    email: 'marcus@example.com',
    phone: '+44 7700 900077',
    country: 'United Kingdom',
    bookingsCount: 1,
    totalSpent: 13331100,
    lastStay: '01 Sep 2026',
  },
  {
    id: 'g-4',
    name: 'Claire Moreau',
    email: 'claire.m@example.com',
    phone: '+33 612 345 678',
    country: 'France',
    bookingsCount: 2,
    totalSpent: 31200000,
    lastStay: '12 Sep 2026',
  },
  {
    id: 'g-5',
    name: 'David Tan',
    email: 'david.tan@example.com',
    phone: '+65 9123 4567',
    country: 'Singapore',
    bookingsCount: 4,
    totalSpent: 65400000,
    lastStay: '04 Sep 2026',
  },
];

export default function AdminGuestsPage() {
  const [search, setSearch] = useState('');

  const filtered = sampleGuests.filter(
    (g) =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.email.toLowerCase().includes(search.toLowerCase()) ||
      g.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-serif text-3xl font-bold text-gray-900">
          Guest & Client Directory
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">
          Review VIP guest profiles, lifetime stays, and total reservation spending.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-gray-200 flex items-center justify-between shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
          />
        </div>

        <span className="text-xs text-gray-400 font-bold">
          {filtered.length} Registered Guests
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/70 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-4 px-6">Guest Profile</th>
                <th className="py-4 px-6">Contact Channels</th>
                <th className="py-4 px-6">Origin</th>
                <th className="py-4 px-6">Completed Stays</th>
                <th className="py-4 px-6">Lifetime Value</th>
                <th className="py-4 px-6">Last Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((g) => (
                <tr key={g.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#12372A] text-white flex items-center justify-center font-bold text-xs">
                        {g.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{g.name}</div>
                        <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                          VIP Tier
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    <div>{g.email}</div>
                    <div className="text-gray-400 text-[11px]">{g.phone}</div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-800">
                    {g.country}
                  </td>
                  <td className="py-4 px-6 font-bold text-gray-900">
                    {g.bookingsCount} Stays
                  </td>
                  <td className="py-4 px-6 font-serif font-bold text-[#12372A]">
                    {FORMAT_IDR(g.totalSpent)}
                  </td>
                  <td className="py-4 px-6 text-gray-500">
                    {g.lastStay}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
