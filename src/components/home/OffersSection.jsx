"use client";
import { useState, useEffect } from 'react';
import { Gift, Gem, RefreshCcw, Percent, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OffersSection() {
  const [currentOffer, setCurrentOffer] = useState(0);

  const offers = [
    {
      id: 1,
      icon: <Gem className="w-10 h-10 text-[#eebf63]" />,
      title: "Flat 10% OFF",
      subtitle: "On Diamond Making Charges",
      validity: "Valid till 31st May 2025",
      bgImage: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      icon: <RefreshCcw className="w-10 h-10 text-[#eebf63]" />,
      title: "Zero Deduction",
      subtitle: "On Old Gold Exchange",
      validity: "Valid till 31st May 2025",
      bgImage: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 3,
      icon: <Percent className="w-10 h-10 text-[#eebf63]" />,
      title: "Flat 5% OFF",
      subtitle: "On Silver Articles",
      validity: "Valid till 31st May 2025",
      bgImage: "https://images.unsplash.com/photo-1620608759551-7f9e160e1d16?q=80&w=600&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [offers.length]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex-1 h-full flex flex-col relative group/offers bg-[#1f163b]"
    >
      {/* Background Images for Slider */}
      {offers.map((offer, idx) => (
        <div 
          key={offer.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentOffer ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={offer.bgImage} alt="Offer Background" className="w-full h-full object-cover opacity-20 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f163b] via-[#1f163b]/80 to-transparent"></div>
        </div>
      ))}

      {/* Floating Animated Border */}
      <div className="absolute inset-0 border border-[#eebf63]/20 rounded-2xl pointer-events-none group-hover/offers:border-[#eebf63]/50 transition-colors duration-500 z-10"></div>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#eebf63] to-transparent opacity-0 group-hover/offers:opacity-100 transition-opacity duration-500 animate-shimmer z-10"></div>

      <div className="relative z-20 flex flex-col h-full p-8">
        <div className="flex items-center gap-3 mb-auto">
          <div className="p-2 bg-[#eebf63]/10 rounded-lg backdrop-blur-sm border border-[#eebf63]/20">
            <Gift className="w-5 h-5 text-[#eebf63]" />
          </div>
          <h3 className="text-xl font-serif text-[#eebf63] font-medium tracking-wide">Exclusive Offers</h3>
        </div>

        <div className="mt-12 mb-12 relative h-[180px]">
          {offers.map((offer, idx) => (
            <div 
              key={offer.id} 
              className={`absolute inset-0 transition-all duration-700 transform flex flex-col items-center text-center justify-center ${
                idx === currentOffer ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
              }`}
            >
              <div className="mb-6 p-4 rounded-full bg-gradient-to-br from-[#1f163b] to-[#3a225e] border border-[#eebf63]/30 shadow-[0_0_20px_rgba(238,191,99,0.2)]">
                {offer.icon}
              </div>
              <h4 className="text-3xl font-serif font-bold text-white mb-2 drop-shadow-lg tracking-wide">{offer.title}</h4>
              <p className="text-lg font-medium text-[#eebf63] mb-3">{offer.subtitle}</p>
              <p className="text-xs text-gray-400 tracking-widest uppercase bg-white/5 py-1 px-4 rounded-full border border-white/10">{offer.validity}</p>
            </div>
          ))}
        </div>

        {/* Pagination & CTA */}
        <div className="mt-auto">
          <div className="flex justify-center gap-2 mb-6">
            {offers.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentOffer(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentOffer ? 'w-8 bg-[#eebf63]' : 'w-2 bg-white/20'}`}
              ></button>
            ))}
          </div>

          <button className="w-full bg-white/5 backdrop-blur-md border border-[#eebf63]/30 text-[#eebf63] py-4 rounded-xl font-bold text-[13px] tracking-widest uppercase hover:bg-[#eebf63] hover:text-[#1f163b] transition-all duration-300 flex justify-center items-center gap-2 group">
            CLAIM OFFER NOW
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
