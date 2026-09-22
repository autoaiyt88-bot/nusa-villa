'use client';

import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Globe, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Indonesia');
  const [birthday, setBirthday] = useState('1992-06-15');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
          setName(data.user.name || '');
          setPhone(data.user.phone || '+61 412 345 678');
          setCountry(data.user.country || 'Australia');
        }
      })
      .catch(() => {});
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#12372A]">
          My Profile
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your personal details for quick and seamless hotel reservations.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-[#E9DFC7] luxury-shadow space-y-6">
        {saved && (
          <div className="p-3.5 rounded-2xl bg-[#2D6A4F]/10 border border-[#2D6A4F]/30 text-[#2D6A4F] text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile details updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5">
          <div className="flex items-center gap-5 pb-6 border-b border-gray-100">
            <div className="w-16 h-16 rounded-full bg-[#12372A] text-[#C5A46D] font-serif font-bold text-2xl flex items-center justify-center shadow">
              {name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h3 className="font-bold text-[#12372A] text-base">{name || 'Guest User'}</h3>
              <p className="text-xs text-gray-400">{user?.email || 'guest@nusa-villa.test'}</p>
              <span className="inline-block mt-1 text-[10px] uppercase font-bold text-[#2D6A4F] bg-[#2D6A4F]/10 px-2 py-0.5 rounded">
                Verified Guest
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-bold text-gray-600 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-gray-600 mb-1.5">
                Email Address (Locked)
              </label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-gray-600 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-gray-600 mb-1.5">
                Country
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-gray-600 mb-1.5">
                Date of Birth
              </label>
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#12372A] hover:bg-[#2D6A4F] text-white text-xs font-bold uppercase tracking-wider transition-all shadow"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
