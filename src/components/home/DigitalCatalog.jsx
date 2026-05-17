"use client";
import React from 'react';
import { ArrowRight, Sparkles, Gem } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function DigitalCatalog() {
  const categories = [
    { 
      title: "Rings", 
      desc: "ETERNITY & SOLITAIRES", 
      image: "https://images.unsplash.com/photo-1605100804763-247f66126e28?q=80&w=600&auto=format&fit=crop",
      link: "/collection/rings"
    },
    { 
      title: "Earrings", 
      desc: "STUDS & DROPS", 
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop",
      link: "/collection"
    },
    { 
      title: "Necklaces", 
      desc: "BRIDAL & HERITAGE SETS", 
      image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600&auto=format&fit=crop",
      link: "/collection/necklaces"
    },
    { 
      title: "Bangles", 
      desc: "ANTIQUE & BRACELETS", 
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop",
      link: "/collection"
    },
    { 
      title: "Pendants", 
      desc: "DAILY WEAR & MINIMALIST", 
      image: "https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?q=80&w=600&auto=format&fit=crop",
      link: "/collection"
    },
    { 
      title: "Diamond Jewellery", 
      desc: "MAJESTIC SOLITAIRE SETS", 
      image: "https://images.unsplash.com/photo-1605100804763-247f66126e28?q=80&w=600&auto=format&fit=crop",
      link: "/collection"
    }
  ];

  return (
    <section className="py-24 bg-[#faf9f5] relative overflow-hidden">
      {/* Subtle details background grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#1f163b 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center mb-16 text-center"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-12 h-[1px] bg-[#d4a54c]"></div>
            <Sparkles className="w-4 h-4 text-[#d4a54c]" />
            <div className="w-12 h-[1px] bg-[#d4a54c]"></div>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#1f163b] font-medium tracking-wide mb-4">
            Browse Latest Jewellery Collections
          </h2>
          <p className="text-gray-500 font-light max-w-lg tracking-wide text-xs sm:text-sm leading-relaxed">
            Delve into high-end collections styled with contemporary brilliance, carrying the royal soul of Rajasthan heritage.
          </p>
        </motion.div>

        {/* Categories Grid - Luxury editorial alignment */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 pb-10 -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat, idx) => (
            <motion.div key={idx} variants={itemVariants} className="min-w-[85vw] sm:min-w-[45vw] md:min-w-0 snap-center">
              <Link 
                href={cat.link}
                className="relative h-[420px] rounded-3xl overflow-hidden group cursor-pointer shadow-[0_10px_35px_rgba(31,22,59,0.06)] hover:shadow-[0_20px_50px_rgba(212,165,76,0.22)] border border-gray-100 hover:border-[#eebf63]/40 transition-all duration-700 ease-out block shine-sweep animate-float-subtle"
              >
                {/* Image & Vignette */}
                <div className="absolute inset-0 bg-[#1f163b] z-0">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="w-full h-full object-cover filter brightness-[0.9] saturate-[1.05] transform group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                  />
                </div>
                
                {/* High-End Purple & Dark Spotlight Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f163b] via-[#1f163b]/45 to-transparent opacity-95 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0)_20%,_rgba(31,22,59,0.5)_100%)] z-10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(238,191,99,0.15)_0%,_transparent_55%)] z-10 pointer-events-none"></div>
                
                {/* Royal Gold Inner Frame */}
                <div className="absolute inset-4 border border-[#eebf63]/10 group-hover:border-[#eebf63]/50 transition-all duration-700 z-20 pointer-events-none rounded-2xl"></div>

                {/* Typography Content */}
                <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-end items-start z-30">
                  <div className="space-y-2">
                    <p className="text-[#eebf63] font-sans font-bold text-[9px] tracking-[0.25em] uppercase opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                      {cat.desc}
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-serif text-white font-medium tracking-wide mb-3">
                      {cat.title}
                    </h3>
                    
                    {/* Premium Action Button (Gold Underlined) */}
                    <div className="pt-2">
                      <span className="flex items-center gap-1.5 text-white text-xs font-bold tracking-[0.2em] uppercase pb-1 border-b border-white/0 group-hover:border-[#eebf63] group-hover:text-[#eebf63] transition-all duration-500 inline-flex items-center">
                        EXPLORE NOW <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-500" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Luxury Section Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <Link 
            href="/collection" 
            className="px-10 py-4 bg-[#1f163b] hover:bg-[#d4a54c] text-[#eebf63] hover:text-[#110722] font-bold text-xs tracking-widest uppercase transition-all duration-300 rounded-xl shadow-[0_10px_30px_rgba(31,22,59,0.15)] hover:shadow-[0_15px_30px_rgba(212,165,76,0.3)] border border-[#eebf63]/25"
          >
            Explore Entire Range
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
