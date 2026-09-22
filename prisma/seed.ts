import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { INITIAL_VILLAS, FACILITIES_LIST, PROMOTIONS } from '../src/lib/data';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting NUSA VILLA database seed...');

  // 1. Clean existing records
  await prisma.notification.deleteMany({});
  await prisma.wishlist.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.bookingGuest.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.blockedDate.deleteMany({});
  await prisma.room.deleteMany({});
  await prisma.villaFacility.deleteMany({});
  await prisma.facility.deleteMany({});
  await prisma.villaImage.deleteMany({});
  await prisma.villa.deleteMany({});
  await prisma.promotionUsage.deleteMany({});
  await prisma.promotion.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.subscriber.deleteMany({});

  // 2. Seed Admin User
  const adminPasswordHash = await bcrypt.hash('Admin123!', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@nusa-villa.test',
      name: 'Nusa Villa General Manager',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
      phone: '+62 811 380 9999',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      country: 'Indonesia',
    },
  });
  console.log('✓ Admin user created:', admin.email);

  // 3. Seed Demo Guest User
  const guestPasswordHash = await bcrypt.hash('Guest123!', 10);
  const demoGuest = await prisma.user.create({
    data: {
      email: 'guest@nusa-villa.test',
      name: 'Alexander Hayes',
      passwordHash: guestPasswordHash,
      role: 'USER',
      phone: '+61 412 345 678',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      country: 'Australia',
    },
  });
  console.log('✓ Demo guest user created:', demoGuest.email);

  // 4. Seed 18 additional realistic users
  const sampleUsers = [
    { name: 'Claire Moreau', email: 'claire.m@example.com', country: 'France' },
    { name: 'Julien Moreau', email: 'julien.m@example.com', country: 'France' },
    { name: 'David Tan', email: 'david.tan@example.com', country: 'Singapore' },
    { name: 'Sarah Tan', email: 'sarah.tan@example.com', country: 'Singapore' },
    { name: 'Liam Hemsworth', email: 'liam.h@example.com', country: 'Australia' },
    { name: 'Sophia Lorenza', email: 'sophia@example.com', country: 'Indonesia' },
    { name: 'Marcus Aurelius', email: 'marcus@example.com', country: 'United Kingdom' },
    { name: 'Elena Rostova', email: 'elena.r@example.com', country: 'Germany' },
    { name: 'Takeshi Yamada', email: 'takeshi.y@example.com', country: 'Japan' },
    { name: 'Isabella Rossi', email: 'isabella.rossi@example.com', country: 'Italy' },
    { name: 'Putu Arya Danu', email: 'arya.danu@example.com', country: 'Indonesia' },
    { name: 'Made Sukarma', email: 'made.sukarma@example.com', country: 'Indonesia' },
    { name: 'Oliver Twist', email: 'oliver.t@example.com', country: 'United Kingdom' },
    { name: 'Charlotte Dubois', email: 'charlotte.d@example.com', country: 'France' },
    { name: 'Lucas Silva', email: 'lucas.silva@example.com', country: 'Brazil' },
    { name: 'Hannah Schmidt', email: 'hannah.s@example.com', country: 'Germany' },
    { name: 'Budi Santoso', email: 'budi.santoso@example.com', country: 'Indonesia' },
    { name: 'Jessica Miller', email: 'jessica.m@example.com', country: 'United States' },
  ];

  const createdUsers: any[] = [demoGuest];
  for (const u of sampleUsers) {
    const user = await prisma.user.create({
      data: {
        email: u.email,
        name: u.name,
        passwordHash: guestPasswordHash,
        role: 'USER',
        country: u.country,
      },
    });
    createdUsers.push(user);
  }
  console.log(`✓ Seeded ${createdUsers.length} total users`);

  // 5. Seed Facilities
  const facilityMap = new Map<string, string>();
  for (const fac of FACILITIES_LIST) {
    const createdFac = await prisma.facility.create({
      data: {
        name: fac.name,
        icon: fac.icon,
        category: fac.category,
      },
    });
    facilityMap.set(fac.name, createdFac.id);
  }
  console.log(`✓ Seeded ${FACILITIES_LIST.length} facilities`);

  // 6. Seed Villas with Images, Facilities, Rooms
  const createdVillas: any[] = [];
  for (const v of INITIAL_VILLAS) {
    const createdVilla = await prisma.villa.create({
      data: {
        id: v.id,
        slug: v.slug,
        name: v.name,
        tagline: v.tagline,
        description: v.description,
        shortDescription: v.shortDescription,
        location: v.location,
        destination: v.destination,
        address: v.address,
        latitude: v.latitude,
        longitude: v.longitude,
        pricePerNight: v.pricePerNight,
        cleaningFee: v.cleaningFee,
        serviceFeePercent: v.serviceFeePercent,
        taxPercent: v.taxPercent,
        bedrooms: v.bedrooms,
        bathrooms: v.bathrooms,
        maxGuests: v.maxGuests,
        sizeSqm: v.sizeSqm,
        hasPrivatePool: v.hasPrivatePool,
        villaType: v.villaType,
        rating: v.rating,
        reviewCount: v.reviewCount,
        isFeatured: v.isFeatured,
        isActive: v.isActive,
        cancellationPolicy: v.cancellationPolicy,
      },
    });

    // Images
    for (let i = 0; i < v.images.length; i++) {
      const img = v.images[i];
      await prisma.villaImage.create({
        data: {
          villaId: createdVilla.id,
          url: img.url,
          caption: img.caption,
          isThumbnail: img.isThumbnail ?? i === 0,
          order: i,
        },
      });
    }

    // Facilities
    for (const facName of v.facilities) {
      const facId = facilityMap.get(facName);
      if (facId) {
        await prisma.villaFacility.create({
          data: {
            villaId: createdVilla.id,
            facilityId: facId,
          },
        });
      }
    }

    // Rooms
    if (v.rooms && v.rooms.length > 0) {
      for (const r of v.rooms) {
        await prisma.room.create({
          data: {
            villaId: createdVilla.id,
            name: r.name,
            description: r.description,
            price: r.price,
            guestCapacity: r.guestCapacity,
            bedType: r.bedType,
          },
        });
      }
    }

    createdVillas.push(createdVilla);
  }
  console.log(`✓ Seeded ${createdVillas.length} luxury villas`);

  // 7. Seed Promotions
  for (const promo of PROMOTIONS) {
    await prisma.promotion.create({
      data: {
        code: promo.code,
        description: promo.description,
        discountType: promo.discountType,
        value: promo.value,
        minSpend: promo.minSpend,
        endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
      },
    });
  }
  console.log('✓ Seeded promotional discount codes');

  // 8. Seed Bookings with Payments
  const bookingConfigs = [
    {
      code: 'NV-2026-8921',
      villaIdx: 0,
      userIdx: 0,
      checkIn: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      checkOut: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
      nights: 4,
      status: 'CONFIRMED',
      total: 16650000,
      paymentMethod: 'QRIS',
    },
    {
      code: 'NV-2026-7432',
      villaIdx: 1,
      userIdx: 1,
      checkIn: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
      checkOut: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      nights: 3,
      status: 'WAITING_PAYMENT',
      total: 14073800,
      paymentMethod: 'VIRTUAL_ACCOUNT',
    },
    {
      code: 'NV-2026-5120',
      villaIdx: 2,
      userIdx: 2,
      checkIn: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      checkOut: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
      nights: 4,
      status: 'CHECKED_OUT',
      total: 13331100,
      paymentMethod: 'BANK_TRANSFER',
    },
    {
      code: 'NV-2026-3398',
      villaIdx: 3,
      userIdx: 3,
      checkIn: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      checkOut: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
      nights: 5,
      status: 'CONFIRMED',
      total: 21850000,
      paymentMethod: 'E_WALLET',
    },
    {
      code: 'NV-2026-6612',
      villaIdx: 4,
      userIdx: 4,
      checkIn: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      checkOut: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      nights: 3,
      status: 'CHECKED_IN',
      total: 18500000,
      paymentMethod: 'QRIS',
    },
    {
      code: 'NV-2026-9041',
      villaIdx: 5,
      userIdx: 5,
      checkIn: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      checkOut: new Date(Date.now() + 33 * 24 * 60 * 60 * 1000),
      nights: 3,
      status: 'PAID',
      total: 8250000,
      paymentMethod: 'VIRTUAL_ACCOUNT',
    },
    {
      code: 'NV-2026-1189',
      villaIdx: 6,
      userIdx: 6,
      checkIn: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      checkOut: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      nights: 2,
      status: 'CANCELLED',
      total: 7100000,
      paymentMethod: 'QRIS',
    },
    {
      code: 'NV-2026-4423',
      villaIdx: 7,
      userIdx: 7,
      checkIn: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
      checkOut: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      nights: 5,
      status: 'CONFIRMED',
      total: 16200000,
      paymentMethod: 'BANK_TRANSFER',
    },
    {
      code: 'NV-2026-7781',
      villaIdx: 0,
      userIdx: 8,
      checkIn: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
      checkOut: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
      nights: 4,
      status: 'CHECKED_OUT',
      total: 16650000,
      paymentMethod: 'QRIS',
    },
    {
      code: 'NV-2026-2245',
      villaIdx: 1,
      userIdx: 9,
      checkIn: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
      checkOut: new Date(Date.now() + 53 * 24 * 60 * 60 * 1000),
      nights: 3,
      status: 'CONFIRMED',
      total: 14073800,
      paymentMethod: 'E_WALLET',
    },
  ];

  for (const b of bookingConfigs) {
    const v = createdVillas[b.villaIdx];
    const u = createdUsers[b.userIdx % createdUsers.length];

    const booking = await prisma.booking.create({
      data: {
        bookingCode: b.code,
        userId: u.id,
        villaId: v.id,
        checkIn: b.checkIn,
        checkOut: b.checkOut,
        adults: 2,
        children: 0,
        infants: 0,
        totalGuests: 2,
        nightCount: b.nights,
        villaPrice: v.pricePerNight * b.nights,
        cleaningFee: v.cleaningFee,
        serviceFee: (v.pricePerNight * b.nights * v.serviceFeePercent) / 100,
        taxAmount: (v.pricePerNight * b.nights * v.taxPercent) / 100,
        discountAmount: 0,
        totalPrice: b.total,
        status: b.status,
        guestName: u.name,
        guestEmail: u.email,
        guestPhone: u.phone || '+62 812 3456 7890',
        guestCountry: u.country || 'Indonesia',
      },
    });

    // Create payment entry
    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        transactionId: `MID-${b.code}`,
        paymentMethod: b.paymentMethod,
        grossAmount: b.total,
        status: b.status === 'WAITING_PAYMENT' ? 'PENDING' : b.status === 'CANCELLED' ? 'REFUNDED' : 'PAID',
        paidAt: b.status === 'WAITING_PAYMENT' ? null : new Date(),
      },
    });
  }
  console.log('✓ Seeded 10 realistic bookings & payment transactions');

  // 9. Seed 15 Realistic Reviews
  const reviewsData = [
    { villaIdx: 0, rating: 5.0, title: 'Heaven on earth cliffside', comment: 'The view of the Uluwatu sunset from the private pool was beyond words. The butler prepared a five-course seafood dinner right on our terrace.', guest: 'Claire Moreau', country: 'France' },
    { villaIdx: 0, rating: 5.0, title: 'Exceptional service and privacy', comment: 'Cleanliness was immaculate, the air conditioning was ice cold, and the sound of waves crashing below made sleeping so peaceful.', guest: 'Julien Moreau', country: 'France' },
    { villaIdx: 1, rating: 5.0, title: 'Architectural wonder in the forest', comment: 'Staying inside this curved bamboo sanctuary was breathtaking. We loved the floating breakfast and afternoon tea.', guest: 'Alexander Hayes', country: 'Australia' },
    { villaIdx: 1, rating: 4.8, title: 'Soul-cleansing rainforest escape', comment: 'The river rapids soundscape is therapeutic. The staff took care of our yoga sessions and spa bookings seamlessly.', guest: 'Elena Rostova', country: 'Germany' },
    { villaIdx: 2, rating: 4.9, title: 'Ultra chic and central', comment: 'Literally 3 minutes walk to the best dining in Seminyak, yet completely quiet behind private tropical walls.', guest: 'Takeshi Yamada', country: 'Japan' },
    { villaIdx: 2, rating: 5.0, title: 'High quality finishing and great sound system', comment: 'The master bed was like sleeping on clouds. Modern glass living room looking over the pool was stunning.', guest: 'Isabella Rossi', country: 'Italy' },
    { villaIdx: 3, rating: 5.0, title: 'Best villa in Canggu!', comment: 'The lagoon pool is gigantic. Close to Echo Beach cafes and very aesthetic for photography.', guest: 'Liam Hemsworth', country: 'Australia' },
    { villaIdx: 3, rating: 4.9, title: 'Group vacation perfection', comment: 'All 4 bedrooms are equally grand with their own en-suite bathrooms so nobody felt shortchanged.', guest: 'Sophia Lorenza', country: 'Indonesia' },
    { villaIdx: 4, rating: 5.0, title: 'Unmatched 5-star beachfront bliss', comment: 'Having direct access to Nusa Dua white sand without crowds is worth every single rupiah.', guest: 'David Tan', country: 'Singapore' },
    { villaIdx: 4, rating: 5.0, title: 'Presidential class estate', comment: 'From security to chef service, everything is world-class. Our family will definitely return next year.', guest: 'Sarah Tan', country: 'Singapore' },
    { villaIdx: 5, rating: 4.9, title: 'Tranquil heritage oasis', comment: 'Very charming colonial aesthetics, beautiful lotus ponds, and Sanur beach is great for morning cycling.', guest: 'Putu Arya Danu', country: 'Indonesia' },
    { villaIdx: 6, rating: 5.0, title: 'Surf break panorama from bed', comment: 'Watching Bingin barrels from our infinity plunge pool was unforgettable. Mediterranean whitewash design is gorgeous.', guest: 'Marcus Aurelius', country: 'United Kingdom' },
    { villaIdx: 7, rating: 5.0, title: 'Deep healing in Tegallalang', comment: 'Surrounded by emerald green rice terraces with zero noise pollution. Heated stone pool in the evening was divine.', guest: 'Hannah Schmidt', country: 'Germany' },
    { villaIdx: 0, rating: 5.0, title: 'Our favorite Bali stay ever', comment: 'Top-notch hospitality, spectacular sunset, and instant WhatsApp support from the concierge team.', guest: 'Jessica Miller', country: 'United States' },
    { villaIdx: 1, rating: 5.0, title: 'Magical bamboo treehouse', comment: 'Every corner is a work of art. The jungle shower and open-air bath are unmatched experiences.', guest: 'Oliver Twist', country: 'United Kingdom' },
  ];

  for (let i = 0; i < reviewsData.length; i++) {
    const rev = reviewsData[i];
    const v = createdVillas[rev.villaIdx];
    const u = createdUsers[i % createdUsers.length];

    await prisma.review.create({
      data: {
        villaId: v.id,
        userId: u.id,
        rating: rev.rating,
        title: rev.title,
        comment: rev.comment,
        guestName: rev.guest,
        guestCountry: rev.country,
        isApproved: true,
      },
    });
  }
  console.log(`✓ Seeded ${reviewsData.length} verified reviews`);

  // 10. Seed Wishlist
  await prisma.wishlist.create({
    data: {
      userId: demoGuest.id,
      villaId: createdVillas[0].id,
    },
  });
  await prisma.wishlist.create({
    data: {
      userId: demoGuest.id,
      villaId: createdVillas[1].id,
    },
  });

  // 11. Seed Notifications
  await prisma.notification.create({
    data: {
      userId: demoGuest.id,
      title: 'Welcome to NUSA VILLA',
      message: 'Explore our curated collection of luxury sanctuaries across Bali.',
      type: 'SYSTEM',
    },
  });
  await prisma.notification.create({
    data: {
      userId: demoGuest.id,
      title: 'Special 20% Offer Unlocked',
      message: 'Use code WELCOME20 at checkout for your private villa retreat.',
      type: 'PROMO',
    },
  });

  console.log('✅ NUSA VILLA Database Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
