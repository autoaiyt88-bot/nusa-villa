'use client';

import React, { useState } from 'react';
import { Search, CreditCard, CheckCircle2, Clock, RotateCcw } from 'lucide-react';
import { FORMAT_IDR } from '@/lib/data';

const sampleTransactions = [
  {
    id: 'tx-1',
    transactionId: 'MID-NV-2026-8921-17899',
    bookingCode: 'NV-2026-8921',
    customer: 'Liam Hemsworth',
    method: 'QRIS (GoPay)',
    amount: 16650000,
    status: 'PAID',
    date: '2026-09-15 14:22',
  },
  {
    id: 'tx-2',
    transactionId: 'MID-NV-2026-7432-17901',
    bookingCode: 'NV-2026-7432',
    customer: 'Sophia Lorenza',
    method: 'BCA Virtual Account',
    amount: 14073800,
    status: 'PENDING',
    date: '2026-09-20 19:40',
  },
  {
    id: 'tx-3',
    transactionId: 'MID-NV-2026-5120-17812',
    bookingCode: 'NV-2026-5120',
    customer: 'Marcus Aurelius',
    method: 'Bank Transfer (Mandiri)',
    amount: 13331100,
    status: 'PAID',
    date: '2026-08-20 10:15',
  },
  {
    id: 'tx-4',
    transactionId: 'MID-NV-2026-1189-17855',
    bookingCode: 'NV-2026-1189',
    customer: 'Charlotte Dubois',
    method: 'QRIS',
    amount: 7100000,
    status: 'REFUNDED',
    date: '2026-09-02 11:05',
  },
];

export default function AdminPaymentsPage() {
  const [search, setSearch] = useState('');

  const filtered = sampleTransactions.filter(
    (t) =>
      t.transactionId.toLowerCase().includes(search.toLowerCase()) ||
      t.bookingCode.toLowerCase().includes(search.toLowerCase()) ||
      t.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-serif text-3xl font-bold text-gray-900">
          Payment Transactions Log
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">
          Real-time transaction settlement monitoring across Midtrans Sandbox gateway.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-gray-200 flex items-center justify-between shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search transaction ID, booking, guest..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
          />
        </div>

        <span className="text-xs text-gray-400 font-bold">
          {filtered.length} Transactions Recorded
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/70 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-4 px-6">Gateway Transaction ID</th>
                <th className="py-4 px-6">Booking Reference</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Payment Method</th>
                <th className="py-4 px-6">Gross Amount</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-mono text-gray-600 font-medium">
                    {t.transactionId}
                  </td>
                  <td className="py-4 px-6 font-mono font-bold text-[#2D6A4F]">
                    {t.bookingCode}
                  </td>
                  <td className="py-4 px-6 font-bold text-gray-900">
                    {t.customer}
                  </td>
                  <td className="py-4 px-6 text-gray-700 font-medium">
                    {t.method}
                  </td>
                  <td className="py-4 px-6 font-serif font-bold text-gray-900">
                    {FORMAT_IDR(t.amount)}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        t.status === 'PAID'
                          ? 'bg-emerald-100 text-emerald-800'
                          : t.status === 'PENDING'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-400">
                    {t.date}
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
