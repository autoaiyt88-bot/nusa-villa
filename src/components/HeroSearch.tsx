'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  Calendar as CalendarIcon,
  Users,
  Search,
  ChevronDown,
  Plus,
  Minus,
  Home,
} from 'lucide-react';
import { format, addDays } from 'date-fns';

export default function HeroSearch() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState(() => format(addDays(new Date(), 3), 'yyyy-MM-dd'));
  const [checkOut, setCheckOut] = useState(() => format(addDays(new Date(), 7), 'yyyy-MM-dd'));

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [rooms, setRooms] = useState(1);

  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const [destinationDropdownOpen, setDestinationDropdownOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const guestDropdownRef = useRef<HTMLDivElement>(null);
  const destDropdownRef = useRef<HTMLDivElement>(null);

  const destinationsList = [
    { name: 'All Destinations', value: '' },
    { name: 'Uluwatu (Cliffs & Ocean)', value: 'Uluwatu' },
    { name: 'Ubud (Rainforest & Culture)', value: 'Ubud' },
    { name: 'Seminyak (Chic & Dining)', value: 'Seminyak' },
    { name: 'Canggu (Surf & Bohemian)', value: 'Canggu' },
    { name: 'Nusa Dua (5-Star Beach)', value: 'Nusa Dua' },
    { name: 'Sanur (Sunrise & Calm)', value: 'Sanur' },
  ];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        guestDropdownRef.current &&
        !guestDropdownRef.current.contains(e.target as Node)
      ) {
        setGuestDropdownOpen(false);
      }
      if (
        destDropdownRef.current &&
        !destDropdownRef.current.contains(e.target as Node)
      ) {
        setDestinationDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (new Date(checkOut) <= new Date(checkIn)) {
      setErrorMessage('Check-out date must be later than check-in date');
      return;
    }

    if (adults < 1) {
      setErrorMessage('At least 1 adult is required');
      return;
    }

    const totalGuests = adults + children;
    const params = new URLSearchParams();

    if (destination) params.set('destination', destination);
    if (checkIn) params.set('checkin', checkIn);
    if (checkOut) params.set('checkout', checkOut);
    params.set('guests', totalGuests.toString());
    params.set('adults', adults.toString());
    params.set('children', children.toString());
    params.set('infants', infants.toString());
    params.set('rooms', rooms.toString());

    router.push(`/villas?${params.toString()}`);
  };

  const totalGuestLabel = `${adults + children} Guest${adults + children > 1 ? 's' : ''}${
    infants > 0 ? `, ${infants} Infant${infants > 1 ? 's' : ''}` : ''
  }`;

  return (
    <div className="w-full max-w-5xl mx-auto">
      {errorMessage && (
        <div className="mb-3 px-4 py-2 rounded-xl bg-red-600/90 text-white text-xs font-medium text-center shadow-lg animate-fade-in">
          {errorMessage}
        </div>
      )}

      <form
        onSubmit={handleSearch}
        className="glass-card rounded-2xl md:rounded-full p-2.5 md:p-3 shadow-2xl flex flex-col md:flex-row items-stretch md:items-center gap-2 border border-white/60 text-[#111827]"
      >
        {/* Destination Field */}
        <div
          ref={destDropdownRef}
          className="relative flex-1 px-4 py-2.5 rounded-xl hover:bg-black/5 transition-colors cursor-pointer"
          onClick={() => setDestinationDropdownOpen(!destinationDropdownOpen)}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#12372A]/10 flex items-center justify-center text-[#12372A]">
              <MapPin className="w-4 h-4 text-[#2D6A4F]" />
            </div>
            <div className="flex-1 text-left">
              <span className="block text-[11px] uppercase tracking-wider font-semibold text-gray-500">
                Destination
              </span>
              <span className="block text-sm font-bold text-[#12372A] truncate">
                {destination || 'Where in Bali?'}
              </span>
            </div>
          </div>

          {destinationDropdownOpen && (
            <div className="absolute top-full left-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-fade-in">
              {destinationsList.map((d) => (
                <button
                  key={d.name}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDestination(d.value);
                    setDestinationDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-[#FAF9F6] transition-colors flex items-center justify-between ${
                    destination === d.value
                      ? 'text-[#2D6A4F] font-bold bg-[#2D6A4F]/10'
                      : 'text-gray-700'
                  }`}
                >
                  <span>{d.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden md:block w-px h-10 bg-gray-200"></div>

        {/* Check-In Date */}
        <div className="flex-1 px-4 py-2.5 rounded-xl hover:bg-black/5 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#12372A]/10 flex items-center justify-center text-[#12372A]">
              <CalendarIcon className="w-4 h-4 text-[#2D6A4F]" />
            </div>
            <div className="flex-1">
              <label
                htmlFor="search-checkin"
                className="block text-[11px] uppercase tracking-wider font-semibold text-gray-500"
              >
                Check In
              </label>
              <input
                id="search-checkin"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={format(new Date(), 'yyyy-MM-dd')}
                className="w-full bg-transparent text-sm font-bold text-[#12372A] focus:outline-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="hidden md:block w-px h-10 bg-gray-200"></div>

        {/* Check-Out Date */}
        <div className="flex-1 px-4 py-2.5 rounded-xl hover:bg-black/5 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#12372A]/10 flex items-center justify-center text-[#12372A]">
              <CalendarIcon className="w-4 h-4 text-[#2D6A4F]" />
            </div>
            <div className="flex-1">
              <label
                htmlFor="search-checkout"
                className="block text-[11px] uppercase tracking-wider font-semibold text-gray-500"
              >
                Check Out
              </label>
              <input
                id="search-checkout"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || format(new Date(), 'yyyy-MM-dd')}
                className="w-full bg-transparent text-sm font-bold text-[#12372A] focus:outline-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="hidden md:block w-px h-10 bg-gray-200"></div>

        {/* Guests & Rooms Dropdown */}
        <div
          ref={guestDropdownRef}
          className="relative flex-1 px-4 py-2.5 rounded-xl hover:bg-black/5 transition-colors cursor-pointer"
          onClick={() => setGuestDropdownOpen(!guestDropdownOpen)}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#12372A]/10 flex items-center justify-center text-[#12372A]">
              <Users className="w-4 h-4 text-[#2D6A4F]" />
            </div>
            <div className="flex-1 text-left">
              <span className="block text-[11px] uppercase tracking-wider font-semibold text-gray-500">
                Guests & Rooms
              </span>
              <span className="block text-sm font-bold text-[#12372A] truncate">
                {totalGuestLabel}, {rooms} Rm
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>

          {guestDropdownOpen && (
            <div
              className="absolute top-full right-0 md:left-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 z-50 animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Adults Counter */}
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <div className="font-semibold text-sm text-[#12372A]">Adults</div>
                  <div className="text-xs text-gray-400">Ages 13 or above</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    disabled={adults <= 1}
                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-bold w-4 text-center">{adults}</span>
                  <button
                    type="button"
                    onClick={() => setAdults(adults + 1)}
                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Children Counter */}
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <div className="font-semibold text-sm text-[#12372A]">Children</div>
                  <div className="text-xs text-gray-400">Ages 2–12</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    disabled={children <= 0}
                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-bold w-4 text-center">{children}</span>
                  <button
                    type="button"
                    onClick={() => setChildren(children + 1)}
                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Infants Counter */}
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <div className="font-semibold text-sm text-[#12372A]">Infants</div>
                  <div className="text-xs text-gray-400">Under 2</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setInfants(Math.max(0, infants - 1))}
                    disabled={infants <= 0}
                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-bold w-4 text-center">{infants}</span>
                  <button
                    type="button"
                    onClick={() => setInfants(infants + 1)}
                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Rooms Counter */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="font-semibold text-sm text-[#12372A]">Rooms</div>
                  <div className="text-xs text-gray-400">Villa suites</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setRooms(Math.max(1, rooms - 1))}
                    disabled={rooms <= 1}
                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-bold w-4 text-center">{rooms}</span>
                  <button
                    type="button"
                    onClick={() => setRooms(rooms + 1)}
                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setGuestDropdownOpen(false)}
                className="w-full mt-3 py-2 bg-[#12372A] text-white text-xs uppercase tracking-wider font-bold rounded-xl"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Submit Search Button */}
        <button
          type="submit"
          className="bg-[#C5A46D] hover:bg-[#b59359] text-[#12372A] font-bold px-6 py-3.5 rounded-xl md:rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl shrink-0 group"
        >
          <Search className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span className="text-sm tracking-wide">Search Villa</span>
        </button>
      </form>
    </div>
  );
}
