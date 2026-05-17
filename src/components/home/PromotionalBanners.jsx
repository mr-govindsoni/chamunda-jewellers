"use client";
import React from 'react';
import { Percent, Sparkles, Gem, Landmark, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PromotionalBanners() {
  const promos = [
    {
      id: 1,
      title: "Flat 20% Off",
      tagline: "ON MAKING CHARGES",
      desc: "Celebrate grand moments with zero heavy charge constraints.",
      icon: <Percent className="w-5 h-5 text-[#eebf63]" />,
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop",
      link: "/collection",
      cols: "md:col-span-3 lg:col-span-2"
    },
    {
      id: 2,
      title: "Exclusive Diamonds",
      tagline: "LUMINOUS COLLECTION",
      desc: "Breathtaking round solitaires and premium bridal rings.",
      icon: <Gem className="w-5 h-5 text-[#eebf63]" />,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop",
      link: "/collection",
      cols: "md:col-span-3 lg:col-span-2"
    },
    {
      id: 3,
      title: "Heritage Gold Rings",
      tagline: "IMPERIAL RAJPUTANA",
      desc: "Fine intricate gold rings hand-carved in Charwas, Rajasthan.",
      icon: <Sparkles className="w-5 h-5 text-[#eebf63]" />,
      image: "https://images.unsplash.com/photo-1605100804763-247f66126e28?q=80&w=600&auto=format&fit=crop",
      link: "/collection/rings",
      cols: "md:col-span-2 lg:col-span-2"
    },
    {
      id: 4,
      title: "Royal Bridal Jewellery",
      tagline: "CHARWAS LEGACY SETS",
      desc: "Exquisite heavy antique designs matching regal pride.",
      icon: <ShieldCheck className="w-5 h-5 text-[#eebf63]" />,
      image: "https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?q=80&w=600&auto=format&fit=crop",
      link: "/collection/necklaces",
      cols: "md:col-span-2 lg:col-span-3"
    },
    {
      id: 5,
      title: "Gold Saving Plan",
      tagline: "SECURE YOUR FUTURE",
      desc: "Smart gold accumulation plans with guaranteed bonus benefits.",
      icon: <Landmark className="w-5 h-5 text-[#eebf63]" />,
      image: "https://images.unsplash.com/photo-1610660600122-bd885de5eaaf?q=80&w=600&auto=format&fit=crop",
      link: "/live-rates",
      cols: "md:col-span-2 lg:col-span-3"
    }
  ];

  return (
    <section className="py-24 bg-[#110722] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(238,191,99,0.06)_0%,_transparent_55%)] pointer-events-none z-0"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-[1px] bg-[#eebf63]/50"></div>
            <Sparkles className="w-4 h-4 text-[#eebf63] animate-pulse" />
            <div className="w-8 h-[1px] bg-[#eebf63]/50"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#fce2a6] via-[#eebf63] to-[#d4a54c] font-medium tracking-wide">
            Promotional Masterpieces
          </h2>
          <p className="text-gray-400 font-light mt-3 max-w-lg tracking-wide text-xs sm:text-sm">
            Experience exceptional designs crafted with heritage precision, paired with premier royal incentives.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-10 gap-8">
          {promos.map((promo) => (
            <Link 
              key={promo.id}
              href={promo.link}
              className={`group relative h-[320px] rounded-3xl overflow-hidden shadow-2xl border border-white/5 hover:border-[#eebf63]/40 transition-all duration-700 ease-out block ${promo.cols}`}
            >
              {/* Image & Dark Vignette */}
              <div className="absolute inset-0 z-0 bg-[#1f163b]">
                <img 
                  src={promo.image} 
                  alt={promo.title} 
                  className="w-full h-full object-cover opacity-80 filter brightness-[0.8] saturate-[1.05] group-hover:scale-105 transition-transform duration-[1000ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#110722] via-[#110722]/50 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0)_30%,_rgba(17,7,34,0.6)_100%)] z-10"></div>
              </div>

              {/* Glowing Outline Frame */}
              <div className="absolute inset-4 border border-[#eebf63]/10 group-hover:border-[#eebf63]/40 transition-colors duration-700 z-20 pointer-events-none rounded-2xl"></div>

              {/* Hover Light Sparkle / Glow on Corners */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#eebf63] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 animate-shimmer"></div>

              {/* Text / Badge Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between items-start z-30">
                {/* Top Badge Icon (White glassmorphism effect) */}
                <div 
                  style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
                  className="p-2.5 rounded-2xl shadow-lg flex items-center justify-center"
                >
                  {promo.icon}
                </div>

                {/* Bottom Copy Text */}
                <div className="space-y-1.5 w-full">
                  <span className="text-[#eebf63] font-bold text-[9px] tracking-[0.25em] uppercase block mb-1">
                    {promo.tagline}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-white font-medium tracking-wide">
                    {promo.title}
                  </h3>
                  <p className="text-gray-300 font-light text-xs max-w-xs leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    {promo.desc}
                  </p>
                  
                  {/* Subtle Call to Action */}
                  <div className="pt-2 flex items-center gap-1.5 text-white/90 text-[10px] font-bold tracking-widest uppercase pb-1 border-b border-[#eebf63]/0 group-hover:border-[#eebf63]/65 transition-all duration-500 w-fit">
                    EXPLORE NOW <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
