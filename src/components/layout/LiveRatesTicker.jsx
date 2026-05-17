"use client";
import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function LiveRatesTicker() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch('/api/get-rates');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setRates(data);
      } catch (err) {
        console.error("Failed to load rates");
      } finally {
        setLoading(false);
      }
    }
    fetchRates();
    const interval = setInterval(fetchRates, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatRate = (rateObj, isGold = true) => {
    if (!rateObj || !rateObj.price) return 'N/A';
    const pricePerOz = rateObj.price;
    let displayPrice = isGold ? (pricePerOz / 31.1034768) * 10 : (pricePerOz / 31.1034768) * 1000;
    
    if (rateObj.currency === 'USD') {
      displayPrice = pricePerOz;
    }

    return new Intl.NumberFormat(rateObj.currency === 'USD' ? 'en-US' : 'en-IN', { 
      style: 'currency', 
      currency: rateObj.currency 
    }).format(displayPrice);
  };

  const getChange = (rateObj) => {
    if (!rateObj) return { text: '', color: 'text-gray-400' };
    const ch = rateObj.ch || 0;
    if (ch > 0) return { text: `▲ +${ch.toFixed(2)}`, color: 'text-green-400 text-glow-gold' };
    if (ch < 0) return { text: `▼ ${ch.toFixed(2)}`, color: 'text-red-400' };
    return { text: `- 0.00`, color: 'text-gray-400' };
  };

  const RateItem = ({ label, rateObj, isGold }) => {
    if (!rateObj) return null;
    const change = getChange(rateObj);
    return (
      <div className="flex items-center space-x-3 px-6 flex-shrink-0 text-[11px] font-medium tracking-widest uppercase">
        <span className="text-gray-400">{label}</span>
        <span className="text-[#eebf63] text-glow-gold drop-shadow-md">{formatRate(rateObj, isGold)}</span>
        <span className={change.color}>{change.text}</span>
        <Sparkles className="w-3 h-3 text-[#d4a54c]/50 ml-6" />
      </div>
    );
  };

  const TickerGroup = () => (
    <>
      <RateItem label="GOLD 24K (MCX)" rateObj={rates?.['XAU/INR']} isGold={true} />
      <RateItem label="GOLD 22K (MCX)" rateObj={rates?.['XAU/INR'] ? {...rates['XAU/INR'], price: rates['XAU/INR'].price * (22/24)} : null} isGold={true} />
      <RateItem label="SILVER (MCX)" rateObj={rates?.['XAG/INR']} isGold={false} />
      <RateItem label="GOLD (COMEX)" rateObj={rates?.['XAU/USD']} isGold={true} />
      <RateItem label="SILVER (COMEX)" rateObj={rates?.['XAG/USD']} isGold={false} />
    </>
  );

  return (
    <div className="bg-[#1f163b] text-[#eebf63] py-2 overflow-hidden whitespace-nowrap relative z-50 flex items-center h-12 border-b border-[#eebf63]/10">
      <div className="absolute left-0 top-0 bottom-0 px-6 flex items-center bg-[#1f163b] z-20 font-serif font-bold text-[11px] tracking-[0.2em] uppercase border-r border-[#eebf63]/20 shadow-[10px_0_20px_-5px_rgba(31,22,59,1)]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          LIVE MARKET
        </div>
      </div>
      
      {/* Subtle background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4a54c]/5 to-transparent pointer-events-none"></div>

      <div className="pl-[160px] flex-1 overflow-hidden h-full relative z-10">
        {loading ? (
          <div className="text-[#d4a54c]/70 text-xs flex items-center h-full px-4 tracking-widest">LOADING LIVE RATES...</div>
        ) : (
          <div className="animate-marquee inline-flex items-center h-full">
            <TickerGroup />
            <TickerGroup />
            <TickerGroup />
          </div>
        )}
      </div>
    </div>
  );
}
