"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Clock, Sparkles } from 'lucide-react';

export default function LiveRates({ variant = 'ticker' }) {
  const [rates, setRates] = useState({ gold: null, silver: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');

  const fetchRates = async () => {
    try {
      setError(false);
      
      const [goldRes, silverRes] = await Promise.all([
        fetch('https://api.gold-api.com/price/XAU'),
        fetch('https://api.gold-api.com/price/XAG')
      ]);

      if (!goldRes.ok || !silverRes.ok) {
        throw new Error('Network response was not ok');
      }

      const goldData = await goldRes.json();
      const silverData = await silverRes.json();

      setRates({
        gold: goldData,
        silver: silverData
      });
      
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (err) {
      console.error('Error fetching live rates:', err);
      // Don't clear previous rates on error to prevent layout jumps, just mark error
      if (!rates.gold) setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const RateDisplay = ({ metal, data }) => {
    if (!data) return null;
    
    const isPositive = data.ch >= 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    const colorClass = isPositive ? 'text-green-400' : 'text-red-400';
    const bgClass = isPositive ? 'bg-green-400/10' : 'bg-red-400/10';

    if (variant === 'ticker') {
      return (
        <div className="flex items-center gap-3 px-8 border-r border-white/10 shrink-0 group hover:bg-white/5 transition-colors duration-300 h-full">
          <span className="font-serif text-[11px] tracking-[0.2em] uppercase text-gray-300 group-hover:text-white transition-colors">
            COMEX {metal}
          </span>
          <span className="font-bold text-[#eebf63] tracking-widest text-sm drop-shadow-[0_0_8px_rgba(238,191,99,0.5)]">
            {formatPrice(data.price)}
          </span>
          <div className={`flex items-center gap-1 ${colorClass} ${bgClass} px-2 py-0.5 rounded text-[10px] font-bold tracking-wider`}>
            {isPositive ? '▲' : '▼'} {isPositive ? '+' : ''}{data.ch.toFixed(2)}
          </div>
        </div>
      );
    }

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-2xl bg-[#1f163b] border border-[#eebf63]/20 p-8 shadow-[0_20px_50px_rgba(17,7,34,0.5)] group hover:border-[#eebf63]/50 transition-all duration-500"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(238,191,99,0.1)_0%,_transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-1">COMEX LIVE</h3>
            <h2 className="text-3xl font-serif text-white tracking-widest">{metal}</h2>
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bgClass} ${colorClass} group-hover:scale-110 transition-transform duration-500`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          <div className="flex items-end gap-4">
            <span className="text-4xl sm:text-5xl font-light text-[#eebf63] tracking-wider drop-shadow-[0_0_15px_rgba(238,191,99,0.2)]">
              {formatPrice(data.price)}
            </span>
            <div className={`flex items-center gap-1 ${colorClass} mb-2 text-sm font-bold`}>
              {isPositive ? '▲' : '▼'} {isPositive ? '+' : ''}{data.ch.toFixed(2)}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs text-gray-400">
            <div>
              <span className="block text-[9px] uppercase tracking-widest mb-1">High</span>
              <span className="text-white">{formatPrice(data.high_price)}</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-widest mb-1">Low</span>
              <span className="text-white">{formatPrice(data.low_price)}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  if (variant === 'ticker') {
    return (
      <div className="bg-[#110722] border-b border-[#eebf63]/20 h-10 flex items-center overflow-hidden relative select-none">
        {/* Mobile / Desktop Label */}
        <div className="absolute left-0 top-0 bottom-0 z-20 bg-[#110722] flex items-center px-4 md:px-6 border-r border-[#eebf63]/20 shadow-[10px_0_20px_-5px_rgba(17,7,34,1)]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[9px] md:text-[10px] font-bold text-[#eebf63] tracking-[0.2em] uppercase hidden sm:block">Live Market</span>
            <span className="text-[9px] md:text-[10px] font-bold text-[#eebf63] tracking-[0.2em] uppercase sm:hidden">Live</span>
          </div>
        </div>

        {/* Scrolling Content */}
        <div className="flex-1 pl-[80px] sm:pl-[140px] h-full relative z-10 overflow-hidden">
          {loading ? (
            <div className="h-full flex items-center px-4">
              <div className="h-4 w-48 bg-white/5 rounded animate-pulse"></div>
            </div>
          ) : error ? (
            <div className="h-full flex items-center px-4 text-xs text-red-400 tracking-widest uppercase">
              Market Offline
            </div>
          ) : (
            <div className="h-full flex animate-marquee hover:[animation-play-state:paused]">
              {/* Double up for seamless scrolling */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex h-full items-center shrink-0">
                  <RateDisplay metal="GOLD" data={rates.gold} />
                  <RateDisplay metal="SILVER" data={rates.silver} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Section Variant
  return (
    <section className="py-20 bg-[#110722] relative overflow-hidden border-t border-[#eebf63]/20">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#eebf63]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#d4a54c]" />
              <p className="text-[10px] text-[#eebf63] uppercase tracking-[0.3em] font-bold">Global Markets</p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wide">
              Live Bullion <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fce2a6] to-[#d4a54c]">Rates</span>
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-xs text-gray-400 font-medium tracking-widest bg-white/5 border border-white/10 px-4 py-2 rounded-full"
          >
            <Clock className="w-3.5 h-3.5 text-[#eebf63]" />
            Updated: {loading ? 'Fetching...' : lastUpdated}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {loading ? (
            <>
              <div className="h-[200px] bg-white/5 rounded-2xl animate-pulse border border-white/10"></div>
              <div className="h-[200px] bg-white/5 rounded-2xl animate-pulse border border-white/10"></div>
            </>
          ) : error ? (
            <div className="col-span-full py-12 text-center border border-red-500/20 bg-red-500/5 rounded-2xl">
              <p className="text-red-400 tracking-widest text-sm uppercase">Unable to connect to live market feed.</p>
            </div>
          ) : (
            <AnimatePresence>
              <RateDisplay key="gold" metal="GOLD" data={rates.gold} />
              <RateDisplay key="silver" metal="SILVER" data={rates.silver} />
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}
