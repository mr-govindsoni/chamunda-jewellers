"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Link from 'next/link';

const CraftsmanshipStory = () => {
  return (
    <section className="py-24 bg-[#fafafa] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left: Video / Image Block */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden group cursor-pointer shadow-[0_20px_50px_rgba(31,22,59,0.1)]">
              <img 
                src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop" 
                alt="Jewellery Craftsmanship" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s]"
              />
              <div className="absolute inset-0 bg-[#1f163b]/30 group-hover:bg-[#1f163b]/40 transition-colors duration-500"></div>
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-white/40">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
              </div>

              {/* Decorative Frame */}
              <div className="absolute inset-6 border-2 border-[#eebf63]/40 rounded-2xl pointer-events-none opacity-80 group-hover:scale-95 transition-transform duration-700"></div>
            </div>

            {/* Floating Element */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden sm:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1f163b] rounded-full flex items-center justify-center text-[#eebf63] font-serif text-xl">
                  50
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Years of</p>
                  <p className="text-sm text-[#1f163b] font-serif font-medium">Mastery & Trust</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Text Content Block */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div>
              <p className="text-[10px] text-[#d4a54c] uppercase tracking-[0.3em] font-bold mb-4">Our Heritage</p>
              <h2 className="text-4xl md:text-5xl font-serif text-[#1f163b] font-medium tracking-wide mb-6 leading-[1.1]">
                The Fine Art of <br/> <span className="text-[#d4a54c]">Rajputana</span> Craftsmanship
              </h2>
            </div>
            
            <div className="space-y-6 text-gray-600 font-light leading-relaxed">
              <p>
                For over five decades, Chamunda Jewellers has been the custodian of Charwas’ royal jewellery-making traditions. Every piece in our collection is born from a legacy of uncompromising perfection.
              </p>
              <p>
                Our master artisans employ age-old techniques—from intricate Kundan-Polki settings to delicate Meenakari and Nakshi work—passing down their meticulous skills through generations. It is this dedication to handmade precision that transforms pure gold and flawless diamonds into timeless heirlooms.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 py-6 border-y border-gray-200">
              <div>
                <p className="text-3xl font-serif text-[#1f163b] mb-1">100%</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Handcrafted</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-[#1f163b] mb-1">24K</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Gold Standard</p>
              </div>
            </div>

            <div className="pt-4">
              <Link 
                href="/collection" 
                className="inline-flex items-center justify-center px-10 py-4 bg-[#1f163b] text-white hover:bg-[#d4a54c] hover:text-[#110722] transition-colors duration-300 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg"
              >
                Discover the Legacy
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CraftsmanshipStory;
