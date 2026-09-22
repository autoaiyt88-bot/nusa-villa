import React from 'react';
import Image from 'next/image';
import {
  Waves,
  Coffee,
  Plane,
  UtensilsCrossed,
  Sparkles,
  Compass,
} from 'lucide-react';

export default function ExperienceSection() {
  const experiences = [
    {
      icon: Waves,
      title: 'Private Infinity Pools',
      description: 'Heated cliffside plunge pools and lagoon-style pools surrounded by lush tropical frangipani.',
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
    },
    {
      icon: Coffee,
      title: 'Floating Breakfast',
      description: 'Morning wicker tray feasts with exotic dragonfruit, avocado brioche, and barista coffee served right in your pool.',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    },
    {
      icon: Plane,
      title: 'VIP Airport Transfer',
      description: 'Chauffeured luxury SUV pickup straight from Ngurah Rai Denpasar airport with cold towels and refreshments.',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
    },
    {
      icon: UtensilsCrossed,
      title: 'Private In-Villa Chef',
      description: 'Custom multi-course beachfront barbecue, traditional Balinese suckling feast, or vegan fine dining in your dining pavilion.',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    },
    {
      icon: Sparkles,
      title: 'Holistic Spa & Wellness',
      description: 'Organic Balinese massage, herbal botanical flower baths, and sound healing meditation sessions on your private deck.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    },
    {
      icon: Compass,
      title: 'Curated Island Tours',
      description: 'Private catamaran charters to Nusa Penida manta rays, private helicopter rides over Mount Batur, and secret waterfall treks.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section id="experiences" className="py-24 bg-[#12372A] text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#2D6A4F]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#C5A46D]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C5A46D] bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
            Tailored Balinese Hospitality
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
            More Than Just A Stay
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed">
            Elevate every moment of your vacation with signature experiences orchestrated by our dedicated concierge team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <div
                key={index}
                className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-500 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12372A] via-transparent to-black/30" />

                  <div className="absolute top-4 left-4 w-11 h-11 rounded-full bg-[#C5A46D] text-[#12372A] flex items-center justify-center shadow-lg">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-[#C5A46D] transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-white/75 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center text-xs font-semibold text-[#C5A46D]">
                    <span>Included or on request with concierge</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
