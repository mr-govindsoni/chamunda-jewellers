"use client";
import React from 'react';
import { ShieldCheck, Gem, RefreshCw, Award, HeartHandshake, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustBadges = () => {
  const badges = [
    {
      icon: <Award className="w-8 h-8 text-[#d4a54c]" />,
      title: "BIS Hallmarked",
      desc: "100% authentic government-certified 22K/18K/14K gold jewellery."
    },
    {
      icon: <Gem className="w-8 h-8 text-[#d4a54c]" />,
      title: "Certified Jewellery",
      desc: "Internationally graded IGI & GIA diamonds and precious gemstones."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#d4a54c]" />,
      title: "Trusted Heritage",
      desc: "Decades of authentic Rajasthan Rajputana trust and legacy."
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-[#d4a54c]" />,
      title: "Lifetime Exchange",
      desc: "100% buyback & lifetime exchange policy on gold and diamonds."
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-[#d4a54c]" />,
      title: "Handcrafted Designs",
      desc: "Bespoke creations by Charwas' most skilled master artisans."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-[#d4a54c]" />,
      title: "Transparent Pricing",
      desc: "No hidden charges. Clear breakdown of gold weight and making."
    }
  ];

  return (
    <section className="py-20 bg-[#110722] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(238,191,99,0.05)_0%,_transparent_70%)]"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] text-[#eebf63] uppercase tracking-[0.3em] font-bold mb-4"
          >
            The Argun Promise
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif text-white font-medium tracking-wide mb-6"
          >
            Purity, Trust & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fce2a6] to-[#d4a54c]">Excellence</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {badges.map((badge, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#eebf63]/40 hover:bg-white/10 transition-all duration-500 overflow-hidden"
            >
              {/* Glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#eebf63]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#110722] border border-[#eebf63]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(238,191,99,0.15)]">
                  {badge.icon}
                </div>
                <h3 className="text-white font-serif text-xl tracking-wide mb-3">{badge.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{badge.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustBadges;
