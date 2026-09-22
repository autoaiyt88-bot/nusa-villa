'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  CreditCard,
  QrCode,
  Building2,
  Wallet,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Clock,
  Sparkles,
  Lock,
} from 'lucide-react';
import { format } from 'date-fns';
import { FORMAT_IDR } from '@/lib/data';

interface CheckoutClientProps {
  booking: any;
}

export default function CheckoutClient({ booking }: CheckoutClientProps) {
  const router = useRouter();

  // Form State
  const [fullName, setFullName] = useState(booking.guestName || '');
  const [email, setEmail] = useState(booking.guestEmail || '');
  const [phone, setPhone] = useState(booking.guestPhone || '');
  const [country, setCountry] = useState(booking.guestCountry || 'Indonesia');
  const [specialRequest, setSpecialRequest] = useState(booking.specialRequests || '');

  // Payment method
  const [selectedMethod, setSelectedMethod] = useState<'QRIS' | 'VIRTUAL_ACCOUNT' | 'BANK_TRANSFER' | 'E_WALLET'>('QRIS');
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sandbox Test Simulator Modal
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [snapData, setSnapData] = useState<any>(null);

  const handleInitiatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/payment/create-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: booking.id,
          paymentMethod: selectedMethod,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSnapData(data);
        setSimulatorOpen(true);
      } else {
        setErrorMessage(data.error || 'Failed to initiate payment.');
      }
    } catch {
      setErrorMessage('Network error initiating payment.');
    } finally {
      setProcessing(false);
    }
  };

  const handleSimulateSuccess = async () => {
    setProcessing(true);
    try {
      const res = await fetch('/api/payment/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId: booking.id }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push(`/booking/success?bookingCode=${booking.bookingCode}`);
      } else {
        setErrorMessage(data.error || 'Payment confirmation failed');
      }
    } catch {
      setErrorMessage('Network error');
    } finally {
      setProcessing(false);
    }
  };

  const villaImage = booking.villa?.images?.[0]?.url || '/images/hero-villa.jpg';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full">
        {/* Progress Header */}
        <div className="mb-10 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12372A]/5 text-[#2D6A4F] text-xs font-semibold uppercase tracking-wider mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#12372A]">
            Confirm & Pay
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Reservation Code: <span className="font-bold text-[#12372A]">{booking.bookingCode}</span>
          </p>
        </div>

        {errorMessage && (
          <div className="max-w-4xl mx-auto mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left Form: Guest Details & Payment Method (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            <form onSubmit={handleInitiatePayment} className="space-y-8">
              {/* Step 1: Guest Information */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9DFC7] luxury-shadow space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-[#12372A] text-white flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <h2 className="font-serif text-xl font-bold text-[#12372A]">
                    Guest Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-gray-600 mb-1.5">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Liam Hemsworth"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-gray-600 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. liam@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-gray-600 mb-1.5">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +62 812 3456 7890"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-gray-600 mb-1.5">
                      Country of Residence
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g. Australia"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-gray-600 mb-1.5">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    placeholder="Floating breakfast arrangement, airport pickup flight number, dietary preferences..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                  />
                </div>
              </div>

              {/* Step 2: Payment Gateway Selection */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9DFC7] luxury-shadow space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-[#12372A] text-white flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#12372A]">
                      Select Payment Method
                    </h2>
                    <p className="text-xs text-gray-500">
                      Powered by Midtrans Sandbox Gateway
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* QRIS */}
                  <label
                    className={`relative p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      selectedMethod === 'QRIS'
                        ? 'border-[#2D6A4F] bg-[#2D6A4F]/5 ring-1 ring-[#2D6A4F]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="QRIS"
                      checked={selectedMethod === 'QRIS'}
                      onChange={() => setSelectedMethod('QRIS')}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <QrCode className="w-5 h-5 text-[#2D6A4F]" />
                        <span className="font-bold text-sm text-[#12372A]">
                          QRIS Instant
                        </span>
                      </div>
                      <span className="text-[10px] bg-[#C5A46D] text-[#12372A] font-bold px-2 py-0.5 rounded">
                        RECOMMENDED
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Scan with GoPay, BCA, OVO, ShopeePay, Dana, or any banking app.
                    </p>
                  </label>

                  {/* Virtual Account */}
                  <label
                    className={`relative p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      selectedMethod === 'VIRTUAL_ACCOUNT'
                        ? 'border-[#2D6A4F] bg-[#2D6A4F]/5 ring-1 ring-[#2D6A4F]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="VIRTUAL_ACCOUNT"
                      checked={selectedMethod === 'VIRTUAL_ACCOUNT'}
                      onChange={() => setSelectedMethod('VIRTUAL_ACCOUNT')}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-2.5 mb-3">
                      <Building2 className="w-5 h-5 text-[#2D6A4F]" />
                      <span className="font-bold text-sm text-[#12372A]">
                        Virtual Account (VA)
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      BCA, Mandiri, BNI, BRI, Permata with automatic verification.
                    </p>
                  </label>

                  {/* Bank Transfer */}
                  <label
                    className={`relative p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      selectedMethod === 'BANK_TRANSFER'
                        ? 'border-[#2D6A4F] bg-[#2D6A4F]/5 ring-1 ring-[#2D6A4F]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="BANK_TRANSFER"
                      checked={selectedMethod === 'BANK_TRANSFER'}
                      onChange={() => setSelectedMethod('BANK_TRANSFER')}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-2.5 mb-3">
                      <CreditCard className="w-5 h-5 text-[#2D6A4F]" />
                      <span className="font-bold text-sm text-[#12372A]">
                        Manual Bank Transfer
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Direct corporate account transfer with instant receipt upload.
                    </p>
                  </label>

                  {/* E-Wallet */}
                  <label
                    className={`relative p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      selectedMethod === 'E_WALLET'
                        ? 'border-[#2D6A4F] bg-[#2D6A4F]/5 ring-1 ring-[#2D6A4F]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="E_WALLET"
                      checked={selectedMethod === 'E_WALLET'}
                      onChange={() => setSelectedMethod('E_WALLET')}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-2.5 mb-3">
                      <Wallet className="w-5 h-5 text-[#2D6A4F]" />
                      <span className="font-bold text-sm text-[#12372A]">
                        E-Wallet Direct
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      GoPay & ShopeePay with 1-click seamless redirection.
                    </p>
                  </label>
                </div>

                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
                    <span>Transactions are sandbox-tested & encrypted</span>
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#12372A] hover:bg-[#2D6A4F] text-white font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <span>{processing ? 'Processing...' : 'Proceed to Payment'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Summary Sidebar (1 col) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9DFC7] luxury-shadow space-y-6 sticky top-28">
              <h3 className="font-serif text-lg font-bold text-[#12372A] pb-3 border-b border-gray-100">
                Reservation Summary
              </h3>

              {/* Villa Thumbnail & Title */}
              <div className="flex gap-4 items-center">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-md">
                  <Image
                    src={villaImage}
                    alt={booking.villa?.name || 'Villa'}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#12372A] line-clamp-1">
                    {booking.villa?.name}
                  </h4>
                  <p className="text-xs text-gray-500">{booking.villa?.location}</p>
                  <p className="text-xs text-[#2D6A4F] font-semibold mt-1">
                    {booking.totalGuests} Guests ({booking.adults} Adults)
                  </p>
                </div>
              </div>

              {/* Dates */}
              <div className="bg-[#FAF9F6] rounded-2xl p-4 border border-[#E9DFC7] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Check-In:</span>
                  <span className="font-bold text-[#12372A]">
                    {format(new Date(booking.checkIn), 'dd MMM yyyy')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Check-Out:</span>
                  <span className="font-bold text-[#12372A]">
                    {format(new Date(booking.checkOut), 'dd MMM yyyy')}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-gray-200">
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-bold text-[#2D6A4F]">
                    {booking.nightCount} Nights
                  </span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Villa Nightly Rate ({booking.nightCount}n)</span>
                  <span className="font-semibold text-gray-900">{FORMAT_IDR(booking.villaPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleaning & Prep Fee</span>
                  <span className="font-semibold text-gray-900">{FORMAT_IDR(booking.cleaningFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee (5%)</span>
                  <span className="font-semibold text-gray-900">{FORMAT_IDR(booking.serviceFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Govt. Luxury Tax (11%)</span>
                  <span className="font-semibold text-gray-900">{FORMAT_IDR(booking.taxAmount)}</span>
                </div>
                {booking.discountAmount > 0 && (
                  <div className="flex justify-between text-[#2D6A4F] font-bold">
                    <span>Discount ({booking.promoCode})</span>
                    <span>-{FORMAT_IDR(booking.discountAmount)}</span>
                  </div>
                )}
                <div className="pt-4 border-t border-gray-200 flex justify-between items-baseline">
                  <span className="font-serif text-sm font-bold text-[#12372A]">Total Amount</span>
                  <span className="font-serif text-2xl font-extrabold text-[#12372A]">
                    {FORMAT_IDR(booking.totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Midtrans Sandbox Simulator / Snap Modal */}
      {simulatorOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E9DFC7] text-center space-y-6">
            <div className="w-14 h-14 rounded-full bg-[#12372A] text-[#C5A46D] flex items-center justify-center mx-auto shadow-md">
              <QrCode className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-[#2D6A4F] bg-[#2D6A4F]/10 px-3 py-1 rounded-full">
                Midtrans Sandbox Gateway
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#12372A] mt-3">
                Complete Sandbox Payment
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                Amount to pay: <strong className="text-[#12372A] font-serif text-base">{FORMAT_IDR(booking.totalPrice)}</strong>
              </p>
            </div>

            {/* Simulated Payment Method Details */}
            <div className="bg-[#FAF9F6] rounded-2xl p-5 border border-[#E9DFC7] text-left space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Method:</span>
                <span className="font-bold text-[#12372A]">{selectedMethod}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Transaction ID:</span>
                <span className="font-mono text-gray-700">{snapData?.transactionId || 'MID-2026-TEST'}</span>
              </div>
              {snapData?.vaNumber && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Virtual Account #:</span>
                  <span className="font-mono font-bold text-[#2D6A4F] text-sm">{snapData.vaNumber}</span>
                </div>
              )}
            </div>

            {/* Test Simulation Action */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleSimulateSuccess}
                disabled={processing}
                className="w-full py-4 rounded-full bg-[#2D6A4F] hover:bg-[#23533e] text-white font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{processing ? 'Confirming...' : 'Simulate Successful Payment'}</span>
              </button>

              <button
                type="button"
                onClick={() => setSimulatorOpen(false)}
                className="w-full py-2.5 text-xs text-gray-500 hover:text-gray-800"
              >
                Cancel and edit details
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
