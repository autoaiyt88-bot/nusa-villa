import React from 'react';
import { Award, ShieldCheck, CreditCard, Headphones, Sparkles } from 'lucide-react';

export default function WhyChooseUs() {
  const perks = [
    {
      icon: Award,
      title: 'Handpicked Villas',
      description:
        'Every single property in our portfolio is personally inspected for architectural integrity, privacy, luxury amenities, and immaculate hygiene standards.',
    },
    {
      icon: ShieldCheck,
      title: 'Best Price Guarantee',
      description:
        'Direct contract relationships with estate owners ensure you receive the most competitive direct rates with zero hidden booking markups.',
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description:
        'Bank-grade encrypted payments integrated with Midtrans, supporting instant QRIS, Virtual Accounts, major cards, and e-wallets.',
    },
    {
      icon: Headphones,
      title: '24/7 Guest Support',
      description:
        'From personalized airport VIP transfers to in-villa master chefs, our dedicated Bali concierge team is on call around the clock.',
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-white border-y border-[#E9DFC7]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12372A]/5 text-[#2D6A4F] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>The Nusa Villa Difference</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#12372A] tracking-tight">
            Why Choose Us
          </h2>
          <p className="mt-4 text-gray-600 text-base sm:text-lg">
            Setting the benchmark for bespoke private escapes across Bali with unwavering hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <div
                key={index}
                className="bg-[#FAF9F6] rounded-3xl p-8 border border-[#E9DFC7]/60 luxury-shadow hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#12372A] text-[#C5A46D] flex items-center justify-center mb-6 shadow-md group-hover:bg-[#2D6A4F] group-hover:text-white transition-colors">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#12372A] mb-3 group-hover:text-[#2D6A4F] transition-colors">
                  {perk.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {perk.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
