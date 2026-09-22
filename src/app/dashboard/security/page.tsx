'use client';

import React, { useState } from 'react';
import { Lock, Shield, CheckCircle2, Smartphone, Globe } from 'lucide-react';

export default function SecurityPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    setSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#12372A]">
          Security & Password
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Keep your reservation account protected with strong encryption.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-[#E9DFC7] luxury-shadow space-y-6">
        <h2 className="font-serif text-lg font-bold text-[#12372A] pb-3 border-b border-gray-100">
          Change Account Password
        </h2>

        {success && (
          <div className="p-3.5 rounded-2xl bg-[#2D6A4F]/10 border border-[#2D6A4F]/30 text-[#2D6A4F] text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Password has been securely updated!</span>
          </div>
        )}

        {error && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-bold text-gray-600 mb-1.5">
              Current Password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-gray-600 mb-1.5">
              New Password (min 8 characters)
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-gray-600 mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-[#12372A] hover:bg-[#2D6A4F] text-white text-xs font-bold uppercase tracking-wider transition-all shadow"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* Active Login Sessions */}
      <div className="bg-white rounded-3xl p-8 border border-[#E9DFC7] luxury-shadow space-y-4">
        <h2 className="font-serif text-lg font-bold text-[#12372A]">
          Active Login Sessions
        </h2>

        <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E9DFC7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#2D6A4F]/10 text-[#2D6A4F] flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#12372A]">
                Current Session — Windows Chrome
              </div>
              <div className="text-[11px] text-gray-400">
                Denpasar, Bali, Indonesia • Active Now
              </div>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold text-[#2D6A4F] bg-[#2D6A4F]/10 px-2.5 py-1 rounded-full">
            This Device
          </span>
        </div>
      </div>
    </div>
  );
}
