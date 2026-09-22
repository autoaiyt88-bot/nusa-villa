export interface VillaType {
  id: string;
  slug: string;
  name: string;
  tagline?: string | null;
  description: string;
  shortDescription: string;
  location: string;
  destination: string;
  address: string;
  latitude: number;
  longitude: number;
  pricePerNight: number;
  cleaningFee: number;
  serviceFeePercent: number;
  taxPercent: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  sizeSqm: number;
  hasPrivatePool: boolean;
  villaType: string;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isActive: boolean;
  cancellationPolicy: string;
  images: {
    id?: string;
    url: string;
    caption?: string | null;
    isThumbnail?: boolean;
  }[];
  facilities: string[];
  rooms?: {
    id?: string;
    name: string;
    description: string;
    price: number;
    guestCapacity: number;
    bedType: string;
  }[];
}

export interface BookingDetails {
  id: string;
  bookingCode: string;
  villaId: string;
  villaName: string;
  villaImage: string;
  location: string;
  checkIn: string;
  checkOut: string;
  nightCount: number;
  adults: number;
  children: number;
  infants: number;
  totalGuests: number;
  villaPrice: number;
  cleaningFee: number;
  serviceFee: number;
  taxAmount: number;
  discountAmount: number;
  totalPrice: number;
  status: 'PENDING' | 'WAITING_PAYMENT' | 'PAID' | 'CONFIRMED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED' | 'REFUNDED';
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestCountry: string;
  specialRequests?: string;
  promoCode?: string;
  createdAt: string;
}

export interface ReviewType {
  id: string;
  villaId: string;
  villaName?: string;
  guestName: string;
  guestAvatar?: string;
  guestCountry: string;
  rating: number;
  title?: string;
  comment: string;
  date: string;
}
