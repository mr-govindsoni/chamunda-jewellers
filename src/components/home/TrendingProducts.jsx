"use client";
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function TrendingProducts() {
  const scrollRef = useRef(null);
  const { PRODUCTS } = useCart();
  
  // Filter products by featured status
  const featured = PRODUCTS.filter(p => p.featured === true);
  
  const defaultProducts = [
    {
      id: 1,
      name: "Rajwada Kundan Choker",
      category: "Bridal Collection",
      price: "₹ 4,25,000",
      image: "https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?q=80&w=600&auto=format&fit=crop",
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Eternity Diamond Ring",
      category: "Diamond Collection",
      price: "₹ 1,85,000",
      image: "https://images.unsplash.com/photo-1605100804763-247f66126e28?q=80&w=600&auto=format&fit=crop",
      badge: "New Arrival"
    },
    {
      id: 3,
      name: "Temple Heritage Bangles",
      category: "Gold 22K",
      price: "₹ 2,10,000",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop",
      badge: "Trending"
    },
    {
      id: 4,
      name: "Luminance Solitaire Studs",
      category: "Daily Wear",
      price: "₹ 95,000",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop",
      badge: null
    },
    {
      id: 5,
      name: "Antique Gold Jhumkas",
      category: "Heritage Collection",
      price: "₹ 1,45,000",
      image: "https://images.unsplash.com/photo-1620608759551-7f9e160e1d16?q=80&w=600&auto=format&fit=crop",
      badge: "Must Have"
    }
  ];

  // Map database featured products to component schema
  const displayProducts = featured.length > 0 ? featured.map(p => {
    const badges = ["Best Seller", "New Arrival", "Trending", "Must Have"];
    const badge = Array.isArray(p.tags) ? p.tags.find(t => badges.includes(t)) : null;
    return {
      id: p.id,
      name: p.name || p.title,
      category: p.category,
      price: p.price || "On Request",
      image: p.image || (p.images && p.images[0]) || "https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?q=80&w=600&auto=format",
      badge: badge || null
    };
  }) : defaultProducts;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#eebf63]/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#d4a54c]" />
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#d4a54c]">Masterpieces</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1f163b] font-medium tracking-wide">
              Trending Designs
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4"
          >
            <Link href="/collection" className="text-sm font-bold tracking-widest uppercase text-[#1f163b] hover:text-[#d4a54c] border-b border-[#1f163b] hover:border-[#d4a54c] pb-1 mr-4 transition-all duration-300">
              View All
            </Link>
            <div className="flex gap-2">
              <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#eebf63] hover:text-[#eebf63] hover:bg-[#1f163b] transition-all duration-300">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#eebf63] hover:text-[#eebf63] hover:bg-[#1f163b] transition-all duration-300">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Horizontal Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative -mx-4 sm:mx-0 px-4 sm:px-0"
        >
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 sm:gap-8 snap-x snap-mandatory hide-scrollbar pb-10 pt-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayProducts.map((product) => (
              <div key={product.id} className="min-w-[280px] sm:min-w-[320px] max-w-[320px] snap-center group">
                <div className="relative h-[380px] rounded-2xl overflow-hidden mb-6 bg-gray-50 shadow-[0_10px_30px_rgba(0,0,0,0.05)] group-hover:shadow-[0_20px_40px_rgba(31,22,59,0.15)] group-hover:border group-hover:border-[#d4a54c]/50 transition-all duration-500">
                  {/* Image */}
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out" />
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#1f163b] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm z-10">
                      {product.badge}
                    </div>
                  )}
 
                  {/* Premium Glass Hover Overlay */}
                  <div className="absolute inset-0 bg-[#1f163b]/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 z-20 px-6">
                    <a 
                      href={`https://wa.me/916367246095?text=${encodeURIComponent(`Hello Chamunda Jewellers, I want inquiry about this jewellery design: ${product.name} (${product.category}).`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] text-white py-3 rounded-full flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest hover:bg-[#20ba5a] transition-colors shadow-[0_0_20px_rgba(37,211,102,0.4)] transform translate-y-4 group-hover:translate-y-0 duration-500"
                    >
                      WhatsApp Inquiry
                    </a>
                    <Link 
                      href={`/product/${product.id}`}
                      className="w-full bg-transparent border border-[#d4a54c] text-[#d4a54c] py-3 rounded-full flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest hover:bg-[#d4a54c] hover:text-[#1f163b] transition-colors transform translate-y-4 group-hover:translate-y-0 duration-500"
                      style={{ transitionDelay: '50ms' }}
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center px-2">
                  <p className="text-[10px] font-bold text-[#d4a54c] uppercase tracking-[0.2em] mb-2">{product.category}</p>
                  <h3 className="text-lg font-serif text-[#1f163b] font-medium tracking-wide mb-2 line-clamp-1 group-hover:text-[#d4a54c] transition-colors">{product.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
