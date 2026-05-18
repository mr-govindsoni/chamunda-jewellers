"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Clock, Sparkles, Info } from 'lucide-react';

export default function LiveRates({ variant = 'ticker' }) {
  const [rates, setRates] = useState({ gold: null, silver: null });
  const [exchangeRate, setExchangeRate] = useState(83.50);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');

  const fetchRates = async () => {
    try {
      setError(false);
      
      const [goldRes, silverRes, forexRes] = await Promise.all([
        fetch('https://api.gold-api.com/price/XAU'),
        fetch('https://api.gold-api.com/price/XAG'),
        fetch('https://api.exchangerate-api.com/v4/latest/USD').catch(() => null)
      ]);

      if (!goldRes.ok || !silverRes.ok) {
        throw new Error('Network response was not ok');
      }

      const goldData = await goldRes.json();
      const silverData = await silverRes.json();
      
      let usdinr = 83.50;
      if (forexRes && forexRes.ok) {
        const forexData = await forexRes.json();
        if (forexData?.rates?.INR) {
          usdinr = forexData.rates.INR;
        }
      }
      setExchangeRate(usdinr);

      setRates({
        gold: goldData,
        silver: silverData
      });
      
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (err) {
      console.error('Error fetching live rates:', err);
      if (!rates.gold) setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 10000); // 10 seconds refresh
    return () => clearInterval(interval);
  }, []);

  const calculateRates = (rawPrice, metal, type) => {
    if (type === 'COMEX') return rawPrice;
    
    // Base INR conversion
    let inrPrice = 0;
    if (metal === 'GOLD') {
      inrPrice = ((rawPrice * exchangeRate) / 31.103) * 10;
    } else {
      inrPrice = ((rawPrice * exchangeRate) / 31.103) * 1000;
    }

    // Apply accurate Indian market premiums (Import Duty + Custom Taxes + Logistics)
    // MCX generally carries ~13% premium for Gold, ~16% for Silver over COMEX
    if (type === 'MCX') {
      if (metal === 'GOLD') return inrPrice * 1.13;
      if (metal === 'SILVER') return inrPrice * 1.16;
    }

    // Retail Premium added (Additional 3% GST + Retailer Margin over MCX)
    // Total Retail Premium is ~16% for Gold, ~16% for Silver
    if (metal === 'GOLD') return inrPrice * 1.16;
    if (metal === 'SILVER') return inrPrice * 1.16;

    return 0;
  };

  const formatPrice = (price, type) => {
    if (type === 'COMEX') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(price);
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const RateCard = ({ metal, data, type }) => {
    if (!data) return null;
    
    const price = calculateRates(data.price, metal, type);
    const high = calculateRates(data.high_price || data.price, metal, type);
    const low = calculateRates(data.low_price || data.price, metal, type);
    const chRaw = data.ch || 0;
    const ch = calculateRates(chRaw, metal, type);

    const isPositive = chRaw >= 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    const colorClass = isPositive ? 'text-green-400' : 'text-red-400';
    const bgClass = isPositive ? 'bg-green-400/10' : 'bg-red-400/10';

    let displayName = '';
    let displayUnit = '';
    let typeLabel = '';

    if (type === 'RETAIL') {
      displayName = metal === 'GOLD' ? 'Gold 24K' : 'Silver 999';
      displayUnit = metal === 'GOLD' ? 'per 10g' : 'per 1kg';
      typeLabel = 'Indicative Retail Rate';
    } else if (type === 'MCX') {
      displayName = metal === 'GOLD' ? 'Gold Futures' : 'Silver Futures';
      displayUnit = metal === 'GOLD' ? 'per 10g' : 'per 1kg';
      typeLabel = 'MCX Approximation';
    } else {
      displayName = metal === 'GOLD' ? 'XAU/USD' : 'XAG/USD';
      displayUnit = 'per oz';
      typeLabel = 'International Spot';
    }

    if (variant === 'ticker') {
      // In ticker, we only show RETAIL rates to save space
      if (type !== 'RETAIL') return null;
      return (
        <div className="flex items-center gap-3 px-8 border-r border-white/10 shrink-0 group hover:bg-white/5 transition-colors duration-300 h-full">
          <span className="font-serif text-[11px] tracking-[0.2em] uppercase text-gray-300 group-hover:text-white transition-colors">
            {displayName} <span className="text-[9px] text-gray-500 ml-1">{displayUnit}</span>
          </span>
          <span className="font-bold text-[#eebf63] tracking-widest text-sm drop-shadow-[0_0_8px_rgba(238,191,99,0.5)]">
            {formatPrice(price, type)}
          </span>
          <div className={`flex items-center gap-1 ${colorClass} ${bgClass} px-2 py-0.5 rounded text-[10px] font-bold tracking-wider`}>
            {isPositive ? '▲' : '▼'} {isPositive ? '+' : ''}{ch.toFixed(2)}
          </div>
        </div>
      );
    }

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-2xl bg-[#1f163b]/80 backdrop-blur-sm border border-[#eebf63]/20 p-6 shadow-[0_20px_50px_rgba(17,7,34,0.5)] group hover:border-[#eebf63]/50 transition-all duration-500"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(238,191,99,0.1)_0%,_transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <h3 className="text-[#eebf63] text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{typeLabel}</h3>
            <h2 className="text-2xl font-serif text-white tracking-widest">{displayName}</h2>
            <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">{displayUnit}</p>
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bgClass} ${colorClass} group-hover:scale-110 transition-transform duration-500`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          <div className="flex items-end gap-3 flex-wrap">
            <span className="text-3xl sm:text-4xl font-light text-[#eebf63] tracking-wider drop-shadow-[0_0_15px_rgba(238,191,99,0.2)]">
              {formatPrice(price, type)}
            </span>
            <div className={`flex items-center gap-1 ${colorClass} mb-2 text-xs font-bold`}>
              {isPositive ? '▲' : '▼'} {isPositive ? '+' : ''}{formatPrice(Math.abs(ch), type)}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-[10px] text-gray-400">
            <div>
              <span className="block uppercase tracking-widest mb-1 opacity-70">High</span>
              <span className="text-white font-medium">{formatPrice(high, type)}</span>
            </div>
            <div>
              <span className="block uppercase tracking-widest mb-1 opacity-70">Low</span>
              <span className="text-white font-medium">{formatPrice(low, type)}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  if (variant === 'ticker') {
    return (
      <div className="bg-[#110722] border-b border-[#eebf63]/20 h-10 flex items-center overflow-hidden relative select-none">
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
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex h-full items-center shrink-0">
                  <RateCard metal="GOLD" data={rates.gold} type="RETAIL" />
                  <RateCard metal="SILVER" data={rates.silver} type="RETAIL" />
                  <RateCard metal="GOLD" data={rates.gold} type="MCX" />
                  <RateCard metal="SILVER" data={rates.silver} type="MCX" />
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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-[200px] bg-white/5 rounded-2xl animate-pulse border border-white/10"></div>
            ))}
          </div>
        ) : error ? (
          <div className="py-12 text-center border border-red-500/20 bg-red-500/5 rounded-2xl">
            <p className="text-red-400 tracking-widest text-sm uppercase">Unable to connect to live market feed.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Retail Section */}
            <div>
              <h3 className="text-white font-serif text-xl mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#eebf63]"></span> 
                Indicative Retail Rate (India)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RateCard key="retail-gold" metal="GOLD" data={rates.gold} type="RETAIL" />
                <RateCard key="retail-silver" metal="SILVER" data={rates.silver} type="RETAIL" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* MCX Section */}
              <div>
                <h3 className="text-white font-serif text-xl mb-6 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[#eebf63]"></span> 
                  MCX Approximation
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <RateCard key="mcx-gold" metal="GOLD" data={rates.gold} type="MCX" />
                  <RateCard key="mcx-silver" metal="SILVER" data={rates.silver} type="MCX" />
                </div>
              </div>

              {/* COMEX Section */}
              <div>
                <h3 className="text-white font-serif text-xl mb-6 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[#eebf63]"></span> 
                  International Spot (COMEX)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <RateCard key="comex-gold" metal="GOLD" data={rates.gold} type="COMEX" />
                  <RateCard key="comex-silver" metal="SILVER" data={rates.silver} type="COMEX" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 mt-8 text-[10px] text-gray-500 uppercase tracking-widest text-center px-4">
              <Info className="w-3 h-3 flex-shrink-0" />
              <p>Rates are indicative and may vary by city, taxes, and dealer premium.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
