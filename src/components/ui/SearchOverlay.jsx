"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Search, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen, PRODUCTS } = useCart();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  // Focus input when overlay opens
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 300);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  // Live search filtering
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase().trim();
    const filtered = PRODUCTS.filter(product => {
      const matchName = product.name.toLowerCase().includes(lowerQuery);
      const matchCategory = product.category.toLowerCase().includes(lowerQuery);
      const matchCollection = product.collection.toLowerCase().includes(lowerQuery);
      const matchTags = product.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
      return matchName || matchCategory || matchCollection || matchTags;
    });

    setResults(filtered);
  }, [query, PRODUCTS]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#110722]/98 backdrop-blur-[20px] text-white flex flex-col animate-fade-in">
      
      {/* Header */}
      <div className="max-w-[1400px] mx-auto w-full px-6 py-6 md:px-8 flex items-center justify-between border-b border-white/10">
        <div className="flex flex-col select-none">
          <h2 className="text-xl font-serif text-[#eebf63] font-medium tracking-[0.15em] uppercase leading-none">Chamunda</h2>
          <p className="text-[8px] text-gray-400 uppercase tracking-[0.25em] mt-1 font-bold">Jewellers</p>
        </div>

        <button 
          onClick={() => setIsSearchOpen(false)}
          className="w-11 h-11 rounded-full bg-white/5 border border-[#eebf63]/25 flex items-center justify-center text-[#eebf63] shadow-lg hover:bg-white/10 active:scale-90 transition-all duration-300"
          aria-label="Close search"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Search Area */}
      <div className="flex-1 overflow-y-auto w-full max-w-[1400px] mx-auto px-6 py-12 md:px-8 flex flex-col items-center">
        
        {/* Input Bar */}
        <div className="w-full max-w-2xl relative mb-12 group">
          <input 
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search rings, necklaces, gold..."
            style={{ 
              background: 'rgba(255, 255, 255, 0.18)', 
              backdropFilter: 'blur(18px)', 
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              caretColor: '#eebf63' 
            }}
            className="w-full text-base sm:text-lg md:text-xl font-sans text-white rounded-[24px] focus:outline-none py-3.5 sm:py-4 px-12 sm:px-14 text-center transition-all duration-300 focus:scale-[1.01] focus:shadow-[0_0_30px_rgba(255,255,255,0.25)] focus:border-[rgba(255,255,255,0.5)] shadow-[0_8px_32px_rgba(0,0,0,0.15),0_0_20px_rgba(255,255,255,0.1)] font-light tracking-wide luxury-search-input"
          />
          <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-[#eebf63] hover:scale-115 group-hover:scale-110 transition-transform duration-300 pointer-events-none" />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:scale-110 active:scale-95 transition-transform duration-300 p-1"
            >
              <X className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
          )}
        </div>

        {/* Search Results */}
        <div className="w-full">
          {query.trim() === '' ? (
            /* Popular Tags / Guidance */
            <div className="text-center max-w-md mx-auto space-y-6 mt-8">
              <p className="text-xs tracking-[0.25em] uppercase text-gray-400 font-bold opacity-75">Popular Searches</p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Rings', 'Choker', 'Gold Choker', 'Solitaire', 'Pooja Thali', 'Coins', 'Earrings'].map((tag) => (
                  <button 
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#eebf63]/50 hover:text-[#eebf63] text-xs font-medium tracking-wide transition-all duration-300"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            /* Results Grid */
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-widest text-[#eebf63] font-bold opacity-75">{results.length} royal pieces found</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-12">
                {results.map((product) => (
                  <div 
                    key={product.id} 
                    className="group flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:border-[#eebf63]/30 transition-all duration-500"
                  >
                    <div className="relative aspect-[4/5] bg-black/20 rounded-xl overflow-hidden mb-4 border border-white/5">
                      <Link href={`/product/${product.id}`} onClick={() => setIsSearchOpen(false)} className="block w-full h-full">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      </Link>
                      <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-[#1f163b]/80 backdrop-blur rounded text-[9px] text-white tracking-widest uppercase font-bold">
                        {product.code}
                      </div>
                    </div>
                    
                    <div className="text-center px-1 flex flex-col flex-grow justify-between">
                      <div>
                        <span className="text-[9px] text-[#d4a54c] tracking-[0.2em] font-bold uppercase block mb-1">{product.category}</span>
                        <Link href={`/product/${product.id}`} onClick={() => setIsSearchOpen(false)}>
                          <h3 className="font-serif text-white text-base font-medium group-hover:text-[#eebf63] transition-colors leading-snug truncate">
                            {product.name}
                          </h3>
                        </Link>
                      </div>
                      <div className="mt-4">
                        <Link 
                          href={`/product/${product.id}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="inline-flex items-center gap-1.5 text-xs text-[#eebf63] hover:text-white font-bold tracking-widest uppercase transition-colors"
                        >
                          View Details <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Luxury Empty State */
            <div className="text-center py-20 max-w-md mx-auto space-y-6">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-dashed border-[#eebf63]/30 flex items-center justify-center mx-auto text-[#eebf63]/40">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-white font-medium tracking-wide">No Majestic Pieces Found</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed tracking-wide">
                We couldn't find any designs matching "<span className="text-[#eebf63] font-semibold">{query}</span>". Please check your spelling or search for popular terms like 'rings' or 'necklaces'.
              </p>
              <button 
                onClick={() => setQuery('')}
                className="px-6 py-2.5 bg-white/5 border border-white/10 hover:border-[#eebf63] hover:text-[#eebf63] text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-300"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .luxury-search-input::placeholder {
          color: rgba(255, 255, 255, 0.85) !important;
          opacity: 1 !important;
        }
        .luxury-search-input::-webkit-input-placeholder {
          color: rgba(255, 255, 255, 0.85) !important;
          opacity: 1 !important;
        }
        .luxury-search-input::-moz-placeholder {
          color: rgba(255, 255, 255, 0.85) !important;
          opacity: 1 !important;
        }
        .luxury-search-input:-ms-input-placeholder {
          color: rgba(255, 255, 255, 0.85) !important;
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
