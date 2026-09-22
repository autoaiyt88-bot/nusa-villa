'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Star,
  Bed,
  Bath,
  Users,
  Waves,
  Heart,
  ArrowRight,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react';
import { VillaType } from '@/types';
import { FORMAT_IDR, FACILITIES_LIST } from '@/lib/data';

function VillasContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [villas, setVillas] = useState<VillaType[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedWishlist, setSavedWishlist] = useState<string[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [destination, setDestination] = useState(searchParams.get('destination') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [guests, setGuests] = useState(searchParams.get('guests') || '');
  const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') || '');
  const [selectedFacility, setSelectedFacility] = useState(searchParams.get('facility') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'recommended');

  const destinations = ['Uluwatu', 'Ubud', 'Seminyak', 'Canggu', 'Nusa Dua', 'Sanur'];

  // Fetch villas based on filters
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (destination) params.set('destination', destination);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (guests) params.set('guests', guests);
    if (bedrooms) params.set('bedrooms', bedrooms);
    if (selectedFacility) params.set('facility', selectedFacility);
    if (sort) params.set('sort', sort);

    fetch(`/api/villas?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.villas) {
          setVillas(data.villas);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [searchQuery, destination, minPrice, maxPrice, guests, bedrooms, selectedFacility, sort]);

  // Fetch wishlist
  useEffect(() => {
    fetch('/api/wishlist')
      .then((res) => res.json())
      .then((data) => {
        if (data?.wishlist) setSavedWishlist(data.wishlist);
      })
      .catch(() => {});
  }, []);

  const toggleWishlist = async (e: React.MouseEvent, villaId: string) => {
    e.preventDefault();
    e.stopPropagation();

    const isSaved = savedWishlist.includes(villaId);
    setSavedWishlist((prev) =>
      isSaved ? prev.filter((id) => id !== villaId) : [...prev, villaId]
    );

    try {
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ villaId }),
      });
      if (res.status === 401) {
        router.push('/login?callbackUrl=/villas');
      }
    } catch {
      setSavedWishlist((prev) =>
        isSaved ? [...prev, villaId] : prev.filter((id) => id !== villaId)
      );
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setDestination('');
    setMinPrice('');
    setMaxPrice('');
    setGuests('');
    setBedrooms('');
    setSelectedFacility('');
    setSort('recommended');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-[#12372A] text-white pt-36 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2D6A4F]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#C5A46D] text-xs font-semibold uppercase tracking-wider mb-4 border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Complete Collection</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Curated Luxury Villas in Bali
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base">
            Filter through private cliffside sanctuaries, bamboo eco-estates, and beachfront retreats tailored to your party.
          </p>

          {/* Quick Search Input */}
          <div className="max-w-xl mx-auto mt-8 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by villa name, location, or feature..."
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white text-[#111827] placeholder-gray-400 text-sm font-medium shadow-xl focus:outline-none focus:ring-2 focus:ring-[#C5A46D]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Catalog Layout */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Mobile filter toggle button */}
        <div className="lg:hidden flex items-center justify-between mb-6">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E9DFC7] rounded-xl text-sm font-bold text-[#12372A] shadow-sm"
          >
            <Filter className="w-4 h-4 text-[#2D6A4F]" />
            <span>Filters & Search</span>
          </button>

          <span className="text-xs text-gray-500 font-medium">
            {villas.length} Villas Available
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-[#E9DFC7] luxury-shadow sticky top-28 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2 font-serif text-lg font-bold text-[#12372A]">
                  <SlidersHorizontal className="w-5 h-5 text-[#2D6A4F]" />
                  <span>Filters</span>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#2D6A4F] hover:underline flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* Destination Filter */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#12372A] mb-2.5">
                  Destination
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setDestination('')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      destination === ''
                        ? 'bg-[#12372A] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Bali
                  </button>
                  {destinations.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDestination(destination === d ? '' : d)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        destination === d
                          ? 'bg-[#12372A] text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#12372A] mb-2.5">
                  Price Range (IDR)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                  />
                </div>
              </div>

              {/* Guests Capacity */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#12372A] mb-2.5">
                  Guest Capacity
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                >
                  <option value="">Any Capacity</option>
                  <option value="2">2+ Guests</option>
                  <option value="4">4+ Guests</option>
                  <option value="6">6+ Guests</option>
                  <option value="8">8+ Guests</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#12372A] mb-2.5">
                  Bedrooms
                </label>
                <div className="flex gap-2">
                  {['', '1', '2', '3', '4+'].map((b) => (
                    <button
                      key={b}
                      onClick={() => setBedrooms(b === '4+' ? '4' : b)}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                        (b === '' && !bedrooms) || bedrooms === (b === '4+' ? '4' : b)
                          ? 'bg-[#2D6A4F] text-white border-[#2D6A4F]'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {b || 'All'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Facilities Checklist */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#12372A] mb-2.5">
                  Key Amenities
                </label>
                <div className="space-y-1.5">
                  {FACILITIES_LIST.slice(0, 6).map((fac) => (
                    <label
                      key={fac.name}
                      className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-[#12372A]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFacility === fac.name}
                        onChange={() =>
                          setSelectedFacility(
                            selectedFacility === fac.name ? '' : fac.name
                          )
                        }
                        className="rounded text-[#2D6A4F] focus:ring-[#2D6A4F]"
                      />
                      <span>{fac.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Sort & Count Header */}
            <div className="bg-white rounded-2xl p-4 border border-[#E9DFC7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-sm font-semibold text-[#12372A]">
                Showing{' '}
                <span className="text-[#2D6A4F] font-bold">{villas.length}</span>{' '}
                Luxury Properties
              </span>

              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-bold shrink-0">
                  Sort By:
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-[#12372A] focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                >
                  <option value="recommended">Featured & Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Guest Rating</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Villas Listing Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="bg-white rounded-3xl h-96 animate-pulse border border-gray-200"
                  />
                ))}
              </div>
            ) : villas.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center border border-[#E9DFC7] luxury-shadow">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#12372A] mb-2">
                  No villas match your criteria
                </h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
                  Try broadening your destination selection or adjusting your price and guest capacity filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-full bg-[#12372A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#2D6A4F] transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {villas.map((villa) => {
                  const isWishlisted = savedWishlist.includes(villa.id);
                  const mainImage = villa.images?.[0]?.url || '/images/hero-villa.jpg';

                  return (
                    <div
                      key={villa.id}
                      className="group bg-white rounded-3xl overflow-hidden border border-[#E9DFC7]/50 luxury-shadow luxury-shadow-hover transition-all duration-500 flex flex-col"
                    >
                      {/* Image Box */}
                      <div className="relative h-64 w-full overflow-hidden">
                        <Image
                          src={mainImage}
                          alt={villa.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                        {/* Destination */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider border border-white/20">
                            {villa.destination}
                          </span>
                        </div>

                        {/* Wishlist Button */}
                        <button
                          onClick={(e) => toggleWishlist(e, villa.id)}
                          className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md transition-all ${
                            isWishlisted
                              ? 'bg-red-500 text-white shadow-lg scale-110'
                              : 'bg-black/40 text-white hover:bg-white hover:text-red-500'
                          }`}
                          aria-label="Save to Wishlist"
                        >
                          <Heart
                            className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`}
                          />
                        </button>

                        {/* Private Pool */}
                        {villa.hasPrivatePool && (
                          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12372A]/85 backdrop-blur-md text-[#E9DFC7] text-xs font-medium border border-[#C5A46D]/30">
                            <Waves className="w-3.5 h-3.5 text-[#C5A46D]" />
                            <span>Private Pool</span>
                          </div>
                        )}

                        {/* Rating */}
                        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#12372A] text-xs font-bold shadow-md">
                          <Star className="w-3.5 h-3.5 fill-[#C5A46D] text-[#C5A46D]" />
                          <span>{villa.rating.toFixed(1)}</span>
                          <span className="text-gray-400 font-normal">
                            ({villa.reviewCount})
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-serif text-xl font-bold text-[#12372A] group-hover:text-[#2D6A4F] transition-colors line-clamp-1">
                            {villa.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1 mb-3">
                            {villa.location}
                          </p>

                          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
                            {villa.shortDescription}
                          </p>

                          <div className="flex items-center gap-4 py-3 border-y border-gray-100 text-xs text-gray-600">
                            <div className="flex items-center gap-1.5">
                              <Bed className="w-4 h-4 text-[#2D6A4F]" />
                              <span>{villa.bedrooms} Beds</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Bath className="w-4 h-4 text-[#2D6A4F]" />
                              <span>{villa.bathrooms} Baths</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Users className="w-4 h-4 text-[#2D6A4F]" />
                              <span>{villa.maxGuests} Guests</span>
                            </div>
                          </div>
                        </div>

                        {/* Price & View */}
                        <div className="mt-5 pt-2 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-gray-400 block">
                              From
                            </span>
                            <div className="flex items-baseline gap-1">
                              <span className="font-serif text-lg font-bold text-[#12372A]">
                                {FORMAT_IDR(villa.pricePerNight)}
                              </span>
                              <span className="text-xs text-gray-500">/ night</span>
                            </div>
                          </div>

                          <Link
                            href={`/villa/${villa.slug}`}
                            className="px-4 py-2.5 rounded-full bg-[#12372A] hover:bg-[#2D6A4F] text-white text-xs font-bold tracking-wide transition-all shadow flex items-center gap-1.5 group-hover:bg-[#2D6A4F]"
                          >
                            <span>Explore Details</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function VillasPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF9F6]" />}>
      <VillasContent />
    </Suspense>
  );
}
