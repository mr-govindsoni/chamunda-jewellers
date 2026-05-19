"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Search, ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen, PRODUCTS } = useCart();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef(null);
  const overlayRef = useRef(null);

  // Focus input & handle ESC
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 300);
      
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setIsSearchOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setDebouncedQuery('');
      setResults([]);
      setIsDropdownOpen(false);
      setHasSearched(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen, setIsSearchOpen]);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Live search filtering
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsDropdownOpen(false);
      return;
    }

    const lowerQuery = debouncedQuery.toLowerCase().trim();
    const filtered = PRODUCTS.filter(product => {
      const matchName = product.name.toLowerCase().includes(lowerQuery);
      const matchCategory = product.category.toLowerCase().includes(lowerQuery);
      const matchCollection = product.collection.toLowerCase().includes(lowerQuery);
      const matchTags = product.tags?.some(tag => tag.toLowerCase().includes(lowerQuery));
      return matchName || matchCategory || matchCollection || matchTags;
    });

    setResults(filtered);
    if (!hasSearched) {
      setIsDropdownOpen(true);
    }
  }, [debouncedQuery, PRODUCTS, hasSearched]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    setIsDropdownOpen(false);
    setHasSearched(true);
  };

  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) {
      setIsSearchOpen(false);
    }
  };

  const getWhatsAppLink = (product) => {
    const text = `Hello Argun Jewellers, I'm interested in the ${product.name} (Code: ${product.code}). Please share more details and pricing.`;
    return `https://wa.me/916367246095?text=${encodeURIComponent(text)}`;
  };

  if (!isSearchOpen) return null;

  return (
    <div 
      ref={overlayRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] bg-[#110722]/98 backdrop-blur-[20px] text-white flex flex-col animate-fade-in"
    >
      
      {/* Header */}
      <div className="max-w-[1400px] mx-auto w-full px-6 py-6 md:px-8 flex items-center justify-between border-b border-white/10 shrink-0">
        <div className="flex flex-col select-none">
          <h2 className="text-xl font-serif text-[#eebf63] font-medium tracking-[0.15em] uppercase leading-none">Argun</h2>
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
      <div className="flex-1 overflow-y-auto w-full max-w-[1400px] mx-auto px-4 py-8 md:px-8 flex flex-col items-center">
        
        {/* Input Bar */}
        <form onSubmit={handleSearchSubmit} className="w-full max-w-3xl relative mb-12 group z-50">
          <input 
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHasSearched(false);
            }}
            placeholder="Search rings, necklaces, diamond..."
            style={{ 
              background: 'rgba(255, 255, 255, 0.18)', 
              backdropFilter: 'blur(18px)', 
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              caretColor: '#eebf63' 
            }}
            className="w-full text-base sm:text-lg md:text-xl font-sans text-white rounded-[24px] focus:outline-none py-4 sm:py-5 px-14 sm:px-16 transition-all duration-300 focus:scale-[1.01] focus:shadow-[0_0_30px_rgba(255,255,255,0.25)] focus:border-[rgba(255,255,255,0.5)] shadow-[0_8px_32px_rgba(0,0,0,0.15),0_0_20px_rgba(255,255,255,0.1)] font-light tracking-wide luxury-search-input"
          />
          <Search className="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 w-5 sm:w-6 h-5 sm:h-6 text-[#eebf63] hover:scale-115 transition-transform duration-300 pointer-events-none" />
          
          {query && (
            <button 
              type="button"
              onClick={() => { setQuery(''); setHasSearched(false); inputRef.current?.focus(); }}
              className="absolute right-5 sm:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:scale-110 active:scale-95 transition-transform duration-300 p-1"
            >
              <X className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>
          )}

          {/* Autocomplete Dropdown */}
          {isDropdownOpen && results.length > 0 && (
            <div className="absolute top-[110%] left-0 w-full bg-[#110722]/90 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden animate-fade-in-up">
              <div className="max-h-[40vh] overflow-y-auto hide-scrollbar py-2">
                {results.slice(0, 5).map((product) => (
                  <div 
                    key={product.id}
                    onClick={() => {
                      setQuery(product.name);
                      setHasSearched(true);
                      setIsDropdownOpen(false);
                    }}
                    className="flex items-center gap-4 px-6 py-3 hover:bg-[#eebf63]/10 cursor-pointer transition-colors group"
                  >
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover border border-white/10" />
                    <div className="flex-1">
                      <h4 className="text-white font-serif text-base group-hover:text-[#eebf63] transition-colors">{product.name}</h4>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">{product.category}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div 
                onClick={handleSearchSubmit}
                className="w-full text-center py-3 bg-[#eebf63]/10 text-[#eebf63] hover:bg-[#eebf63]/20 font-bold text-xs uppercase tracking-widest cursor-pointer transition-colors border-t border-[#eebf63]/20"
              >
                View All {results.length} Results
              </div>
            </div>
          )}
        </form>

        {/* Search Results Area */}
        <div className="w-full relative z-10 flex-1 flex flex-col">
          {!hasSearched ? (
            /* Popular Tags / Trending Searches */
            <div className="text-center max-w-2xl mx-auto space-y-8 mt-4 animate-fade-in">
              <p className="text-sm tracking-[0.2em] uppercase text-gray-400 font-bold opacity-75">Trending Searches</p>
              <div className="flex flex-wrap justify-center gap-4">
                {['Gold Rings', 'Bridal Jewellery', 'Diamond Earrings', 'Antique Collection', 'Daily Wear Rings'].map((tag) => (
                  <button 
                    key={tag}
                    onClick={() => {
                      setQuery(tag);
                      setDebouncedQuery(tag);
                      setHasSearched(true);
                    }}
                    className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-[#eebf63]/50 hover:bg-[#eebf63]/10 hover:shadow-[0_0_15px_rgba(238,191,99,0.2)] text-[#eebf63] text-sm font-medium tracking-wide transition-all duration-300"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            /* Results Grid (Search Results Page Equivalent) */
            <div className="space-y-8 animate-fade-in-up pb-12 flex-1">
              <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <h3 className="text-2xl font-serif text-white tracking-wide">Search Results for "{query}"</h3>
                <p className="text-xs uppercase tracking-widest text-[#eebf63] font-bold opacity-75">{results.length} royal pieces</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {results.map((product) => (
                  <div 
                    key={product.id} 
                    className="group flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:border-[#eebf63]/30 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                  >
                    <div className="relative aspect-[4/5] bg-black/20 rounded-xl overflow-hidden mb-4 border border-white/5">
                      <Link href={`/product/${product.id}`} onClick={() => setIsSearchOpen(false)} className="block w-full h-full">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                        />
                      </Link>
                      <div className="absolute bottom-3 left-3 px-2 py-1 bg-[#1f163b]/90 backdrop-blur rounded text-[9px] text-[#eebf63] tracking-widest uppercase font-bold border border-[#eebf63]/20">
                        {product.code}
                      </div>
                    </div>
                    
                    <div className="text-center px-1 flex flex-col flex-grow justify-between">
                      <div>
                        <span className="text-[9px] text-[#d4a54c] tracking-[0.2em] font-bold uppercase block mb-2">{product.category}</span>
                        <Link href={`/product/${product.id}`} onClick={() => setIsSearchOpen(false)}>
                          <h3 className="font-serif text-white text-lg font-medium group-hover:text-[#eebf63] transition-colors leading-snug">
                            {product.name}
                          </h3>
                        </Link>
                      </div>
                      <div className="mt-6 flex flex-col gap-3">
                        <a 
                          href={getWhatsAppLink(product)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white border border-[#25D366]/30 hover:border-[#25D366] text-xs font-bold uppercase tracking-widest transition-all duration-300"
                        >
                          <MessageCircle className="w-4 h-4" /> Inquiry
                        </a>
                        <Link 
                          href={`/product/${product.id}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="inline-flex items-center justify-center gap-1.5 text-xs text-[#eebf63] hover:text-white font-bold tracking-widest uppercase transition-colors"
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
            <div className="text-center py-20 max-w-lg mx-auto space-y-6 animate-fade-in-up">
              <div className="w-20 h-20 rounded-full bg-white/5 border border-dashed border-[#eebf63]/30 flex items-center justify-center mx-auto text-[#eebf63]/40 shadow-[0_0_30px_rgba(238,191,99,0.1)]">
                <Search className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-3xl text-white font-medium tracking-wide">No Majestic Pieces Found</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed tracking-wide">
                We couldn't find any designs matching "<span className="text-[#eebf63] font-semibold">{query}</span>". Please check your spelling or explore our trending collections.
              </p>
              <button 
                onClick={() => { setQuery(''); setHasSearched(false); inputRef.current?.focus(); }}
                className="mt-4 px-8 py-3 bg-[#eebf63] text-[#110722] hover:bg-white font-bold tracking-widest uppercase rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(238,191,99,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] text-xs"
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
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
