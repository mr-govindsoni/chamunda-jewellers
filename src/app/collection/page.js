"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Filter, ChevronDown, ChevronRight, X, ArrowRight, MessageCircle } from 'lucide-react';

export default function CollectionPage() {
  const { PRODUCTS } = useCart();
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeCollection, setActiveCollection] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const categories = ['All', 'Gold Jewellery', 'Diamond Jewellery', 'Silver Articles', 'Bullion'];
  const collections = ['All', 'Rajputana Royal Heritage', 'Solitaires', 'Daily Wear', 'Pooja Items', 'Coins', 'Eternity'];

  useEffect(() => {
    let result = PRODUCTS;
    
    if (activeFilter !== 'All') {
      result = result.filter(p => p.category === activeFilter);
    }
    
    if (activeCollection !== 'All') {
      result = result.filter(p => p.collection === activeCollection);
    }

    setFilteredProducts(result);
  }, [activeFilter, activeCollection, PRODUCTS]);

  const getWhatsAppLink = (product) => {
    const text = `Hello Chamunda Jewellers, I want inquiry about this jewellery design: ${product.name} (${product.category}).`;
    return `https://wa.me/916367246095?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans">
      <Header />
      
      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-[#110722] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2000&auto=format&fit=crop" 
          alt="Luxury Collection" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#110722] via-transparent to-transparent"></div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif text-[#eebf63] font-medium tracking-wide mb-4"
          >
            Discover Collections
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-gray-300 text-sm tracking-widest uppercase font-light max-w-lg mx-auto"
          >
            Explore our handcrafted masterpieces and royal heirlooms
          </motion.p>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Mobile Filter Toggle */}
          <button 
            className="lg:hidden flex items-center gap-2 justify-center w-full py-3 border border-gray-200 rounded-full font-bold uppercase tracking-widest text-xs text-[#1f163b] hover:bg-gray-50 transition-colors"
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          >
            <Filter className="w-4 h-4" /> 
            {isMobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Sidebar Filters */}
          <div className={`lg:w-64 shrink-0 space-y-10 ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#1f163b] mb-5 pb-3 border-b border-gray-200">Category</h3>
              <ul className="space-y-3">
                {categories.map(cat => (
                  <li key={cat}>
                    <button 
                      onClick={() => setActiveFilter(cat)}
                      className={`text-sm tracking-wide transition-all duration-300 flex items-center justify-between w-full text-left ${activeFilter === cat ? 'text-[#d4a54c] font-semibold' : 'text-gray-500 hover:text-[#1f163b]'}`}
                    >
                      {cat}
                      {activeFilter === cat && <ChevronRight className="w-3 h-3" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#1f163b] mb-5 pb-3 border-b border-gray-200">Collection</h3>
              <ul className="space-y-3">
                {collections.map(col => (
                  <li key={col}>
                    <button 
                      onClick={() => setActiveCollection(col)}
                      className={`text-sm tracking-wide transition-all duration-300 flex items-center justify-between w-full text-left ${activeCollection === col ? 'text-[#d4a54c] font-semibold' : 'text-gray-500 hover:text-[#1f163b]'}`}
                    >
                      {col}
                      {activeCollection === col && <ChevronRight className="w-3 h-3" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Active Filters Display */}
            <div className="flex items-center gap-3 mb-8 flex-wrap">
              <span className="text-xs text-gray-400 font-bold tracking-widest uppercase">Active Filters:</span>
              {(activeFilter !== 'All' || activeCollection !== 'All') ? (
                <>
                  {activeFilter !== 'All' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#d4a54c]/30 rounded-full text-[10px] text-[#1f163b] font-bold uppercase tracking-widest">
                      {activeFilter}
                      <button onClick={() => setActiveFilter('All')} className="text-gray-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                    </span>
                  )}
                  {activeCollection !== 'All' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#d4a54c]/30 rounded-full text-[10px] text-[#1f163b] font-bold uppercase tracking-widest">
                      {activeCollection}
                      <button onClick={() => setActiveCollection('All')} className="text-gray-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                    </span>
                  )}
                  <button 
                    onClick={() => { setActiveFilter('All'); setActiveCollection('All'); }}
                    className="text-[10px] text-gray-500 hover:text-[#d4a54c] underline uppercase tracking-widest font-semibold"
                  >
                    Clear All
                  </button>
                </>
              ) : (
                <span className="text-[10px] text-[#d4a54c] border border-[#d4a54c]/30 px-3 py-1 rounded-full font-bold uppercase tracking-widest">Showing Everything</span>
              )}
            </div>

            {/* Grid Container */}
            {filteredProducts.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
              >
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <motion.div 
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(31,22,59,0.08)] border border-gray-100 hover:border-[#d4a54c]/40 transition-all duration-500"
                    >
                      <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out" 
                        />
                        <div className="absolute top-4 left-4 px-2 py-1 bg-white/90 backdrop-blur rounded text-[9px] text-[#1f163b] tracking-widest uppercase font-bold shadow-sm">
                          {product.code}
                        </div>

                        {/* Premium Glass Hover Overlay */}
                        <div className="absolute inset-0 bg-[#1f163b]/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 px-6 z-20">
                          <a 
                            href={getWhatsAppLink(product)}
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
                      <div className="p-5 text-center flex-1 flex flex-col justify-center">
                        <span className="text-[9px] text-[#d4a54c] tracking-[0.2em] font-bold uppercase block mb-1">{product.category}</span>
                        <h3 className="font-serif text-[#1f163b] text-lg font-medium group-hover:text-[#d4a54c] transition-colors leading-snug">
                          {product.name}
                        </h3>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <Filter className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif text-[#1f163b] mb-2">No Jewellery Found</h3>
                <p className="text-sm text-gray-500 font-light max-w-md mx-auto">
                  We couldn't find any designs matching your current filters. Please try removing some filters to see more results.
                </p>
                <button 
                  onClick={() => { setActiveFilter('All'); setActiveCollection('All'); }}
                  className="mt-6 px-8 py-3 bg-[#1f163b] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#d4a54c] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
