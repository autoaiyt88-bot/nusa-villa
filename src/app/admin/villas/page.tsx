'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  CheckCircle2,
  X,
  Building,
} from 'lucide-react';
import { INITIAL_VILLAS, FORMAT_IDR } from '@/lib/data';

export default function AdminVillasPage() {
  const [villas, setVillas] = useState(INITIAL_VILLAS);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // New Villa Form
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('Uluwatu');
  const [pricePerNight, setPricePerNight] = useState('3500000');
  const [bedrooms, setBedrooms] = useState('3');
  const [bathrooms, setBathrooms] = useState('3');
  const [maxGuests, setMaxGuests] = useState('6');
  const [description, setDescription] = useState('');

  const toggleActive = (id: string) => {
    setVillas((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isActive: !v.isActive } : v))
    );
  };

  const deleteVilla = (id: string) => {
    setVillas((prev) => prev.filter((v) => v.id !== id));
  };

  const handleCreateVilla = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newVilla: any = {
      id: `villa-${Date.now()}`,
      slug,
      name,
      location: `${destination}, Bali`,
      destination,
      pricePerNight: parseFloat(pricePerNight),
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      maxGuests: parseInt(maxGuests),
      description,
      shortDescription: description.substring(0, 100) + '...',
      rating: 5.0,
      reviewCount: 0,
      isActive: true,
      hasPrivatePool: true,
      images: [
        { url: '/images/hero-villa.jpg', caption: 'Villa Sunset' },
      ],
      facilities: ['Private Pool', 'WiFi', 'Breakfast Included'],
    };

    setVillas([newVilla, ...villas]);
    setCreateModalOpen(false);
    setName('');
    setDescription('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">
            Villa Portfolio & Property CRUD
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Create, edit, toggle availability, or adjust nightly rates for your Bali villas.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-[#12372A] hover:bg-[#2D6A4F] text-white text-xs font-bold transition-all shadow flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Villa</span>
        </button>
      </div>

      {/* Villas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {villas.map((v) => {
          const img = v.images?.[0]?.url || '/images/hero-villa.jpg';
          return (
            <div
              key={v.id}
              className={`bg-white rounded-3xl overflow-hidden border shadow-sm flex flex-col justify-between transition-all ${
                v.isActive ? 'border-gray-200' : 'border-gray-200 opacity-60'
              }`}
            >
              <div className="relative h-48 w-full">
                <Image src={img} alt={v.name} fill className="object-cover" />
                <div className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[11px] font-bold">
                  {v.destination}
                </div>
                <div className="absolute top-3 right-3 z-10">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      v.isActive
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-700 text-gray-200'
                    }`}
                  >
                    {v.isActive ? 'ACTIVE' : 'DISABLED'}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-gray-900 line-clamp-1">
                    {v.name}
                  </h3>
                  <p className="text-xs text-gray-500">{v.location}</p>

                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-600">
                    <span>{v.bedrooms} Beds</span>
                    <span>•</span>
                    <span>{v.bathrooms} Baths</span>
                    <span>•</span>
                    <span>Max {v.maxGuests} Guests</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-gray-400 block font-semibold">
                      Nightly Rate
                    </span>
                    <span className="font-serif font-bold text-[#12372A]">
                      {FORMAT_IDR(v.pricePerNight)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleActive(v.id)}
                      className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors"
                      title={v.isActive ? 'Disable listing' : 'Enable listing'}
                    >
                      {v.isActive ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => deleteVilla(v.id)}
                      className="p-2 rounded-xl border border-red-200 hover:bg-red-50 text-red-500 transition-colors"
                      title="Delete Villa"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Villa Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-serif text-xl font-bold text-gray-900">
                Add New Luxury Villa
              </h3>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateVilla} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold text-gray-600 mb-1">
                  Villa Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Celestial Horizon Villa"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-bold text-gray-600 mb-1">
                    Destination *
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                  >
                    <option value="Uluwatu">Uluwatu</option>
                    <option value="Ubud">Ubud</option>
                    <option value="Seminyak">Seminyak</option>
                    <option value="Canggu">Canggu</option>
                    <option value="Nusa Dua">Nusa Dua</option>
                    <option value="Sanur">Sanur</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-gray-600 mb-1">
                    Price per Night (IDR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={pricePerNight}
                    onChange={(e) => setPricePerNight(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs uppercase font-bold text-gray-600 mb-1">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-gray-600 mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-gray-600 mb-1">
                    Max Guests
                  </label>
                  <input
                    type="number"
                    value={maxGuests}
                    onChange={(e) => setMaxGuests(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-gray-600 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Architectural sanctuary overlooking ocean..."
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="flex-1 py-2.5 rounded-full border border-gray-300 text-xs font-bold text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-full bg-[#12372A] hover:bg-[#2D6A4F] text-white text-xs font-bold shadow"
                >
                  Save Villa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
