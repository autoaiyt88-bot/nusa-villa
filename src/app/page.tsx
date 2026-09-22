import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedVillas from '@/components/FeaturedVillas';
import DestinationsSection from '@/components/DestinationsSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ExperienceSection from '@/components/ExperienceSection';
import GallerySection from '@/components/GallerySection';
import TestimonialSection from '@/components/TestimonialSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import prisma from '@/lib/db';
import { INITIAL_VILLAS } from '@/lib/data';

export const dynamic = 'force-dynamic';

async function getFeaturedVillas() {
  try {
    const dbVillas = await prisma.villa.findMany({
      where: { isActive: true },
      orderBy: { isFeatured: 'desc' },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
        facilities: {
          include: { facility: true },
        },
      },
    });

    if (dbVillas && dbVillas.length > 0) {
      return dbVillas.map((v) => ({
        ...v,
        facilities: v.facilities.map((f) => f.facility.name),
      }));
    }
    return INITIAL_VILLAS;
  } catch (err) {
    console.warn('Fallback to initial villas due to error:', err);
    return INITIAL_VILLAS;
  }
}

export default async function HomePage() {
  const villas = await getFeaturedVillas();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] selection:bg-[#C5A46D] selection:text-[#12372A]">
      {/* Dynamic Glassmorphic Navigation */}
      <Navbar />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 100vh Hero with Ken Burns & Parallax */}
        <HeroSection />

        {/* Featured Villas Grid */}
        <FeaturedVillas villas={villas} />

        {/* Explore Destinations in Bali */}
        <DestinationsSection />

        {/* Why Choose Us Perks */}
        <WhyChooseUs />

        {/* Bespoke Experiences */}
        <ExperienceSection />

        {/* Masonry Lightbox Gallery */}
        <GallerySection />

        {/* Testimonials Carousel */}
        <TestimonialSection />

        {/* Exclusive Newsletter */}
        <NewsletterSection />
      </main>

      {/* Luxury Footer */}
      <Footer />
    </div>
  );
}
