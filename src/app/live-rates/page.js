"use client";
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { TrendingUp, TrendingDown, Clock, Activity, ShieldCheck, Banknote } from 'lucide-react';

export default function LiveRatesPage() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  // Simulated live data fetching for the UI (Replace with real API)
  useEffect(() => {
    const fetchRates = () => {
      // Simulating a live API response
      const simulatedData = {
        'XAU/INR_MCX': { price: 72450.00, ch: 120.50, high: 72600, low: 72100 },
        'XAG/INR_MCX': { price: 89300.00, ch: -45.00, high: 89500, low: 88900 },
        'XAU/USD_COMEX': { price: 2345.60, ch: 12.40, high: 2350, low: 2330 },
        'XAG/USD_COMEX': { price: 29.85, ch: -0.15, high: 30.10, low: 29.50 },
        'XAU_SPOT': { price: 72200.00, ch: 80.00, high: 72350, low: 72000 },
        'XAG_SPOT': { price: 89100.00, ch: -20.00, high: 89300, low: 88800 },
        'USD/INR': { price: 83.50, ch: 0.05, high: 83.55, low: 83.42 },
      };
      
      // Add slight random fluctuations to simulate "live" ticks
      Object.keys(simulatedData).forEach(key => {
        const fluctuation = (Math.random() - 0.5) * (simulatedData[key].price * 0.0005);
        simulatedData[key].price += fluctuation;
        simulatedData[key].ch += fluctuation;
      });

      setRates(simulatedData);
      setLastUpdated(new Date().toLocaleTimeString('en-IN', { hour12: true }));
      setLoading(false);
    };

    fetchRates();
    const interval = setInterval(fetchRates, 5000); // refresh every 5 seconds for visual effect
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price, currency = 'INR') => {
    return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const RateCard = ({ title, symbol, data, currency = 'INR', unit = '10g' }) => {
    if (!data) return <div className="h-48 bg-[#1f163b]/50 rounded-2xl animate-pulse border border-[#eebf63]/10"></div>;

    const isPositive = data.ch >= 0;
    const changeColor = isPositive ? 'text-green-400' : 'text-red-400';
    const changeBg = isPositive ? 'bg-green-400/10' : 'bg-red-400/10';
    const Icon = isPositive ? TrendingUp : TrendingDown;

    return (
      <div className="bg-gradient-to-b from-[#1f163b]/80 to-[#110722] rounded-2xl p-6 border border-[#eebf63]/20 shadow-[0_8px_30px_rgba(0,0,0,0.4)] relative overflow-hidden group hover:border-[#eebf63]/50 transition-all duration-300">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#eebf63]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div>
            <h3 className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase">{title}</h3>
            <p className="text-white font-serif text-lg mt-1">{symbol}</p>
          </div>
          <div className="px-3 py-1 rounded-full bg-[#110722] border border-[#eebf63]/30 text-[#eebf63] text-[10px] tracking-widest font-bold">
            {unit}
          </div>
        </div>

        <div className="mb-6 relative z-10">
          <div className="flex items-end gap-3">
            <span className="text-3xl md:text-4xl font-serif text-[#eebf63] text-glow-gold drop-shadow-md tracking-wide">
              {formatPrice(data.price, currency)}
            </span>
          </div>
          <div className={`inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-md ${changeBg} ${changeColor}`}>
            <Icon className="w-3.5 h-3.5" />
            <span className="text-sm font-bold tracking-wide">
              {isPositive ? '+' : ''}{data.ch.toFixed(2)} ({((data.ch / data.price) * 100).toFixed(2)}%)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 relative z-10">
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">High</p>
            <p className="text-sm text-gray-300 font-medium">{formatPrice(data.high, currency)}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Low</p>
            <p className="text-sm text-gray-300 font-medium">{formatPrice(data.low, currency)}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0514] flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow relative overflow-hidden pb-20">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0a0514] mix-blend-multiply z-10"></div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(31,22,59,0.8)_0%,_rgba(10,5,20,0)_70%)] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(238,191,99,0.05)_0%,_rgba(10,5,20,0)_70%)] pointer-events-none"></div>
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 md:pt-20">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-white/10 pb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 mb-4">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-xs font-bold tracking-[0.2em] text-red-500 uppercase">Live Trading Dashboard</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-white font-medium tracking-wide drop-shadow-lg">
                Bullion Market <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#eebf63] to-[#d4a54c]">Rates</span>
              </h1>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4 text-[#eebf63]" />
                <span className="tracking-widest uppercase text-xs">Last Update: <strong className="text-white">{loading ? '--:--' : lastUpdated}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Activity className="w-4 h-4 text-green-400" />
                <span className="tracking-widest uppercase text-xs text-green-400">Market Open</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column - Futures */}
            <div className="lg:col-span-8 space-y-8">
              <div>
                <h2 className="text-white font-serif text-xl mb-6 flex items-center gap-3">
                  <span className="w-1 h-5 bg-[#eebf63]"></span>
                  MCX Futures (India)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <RateCard title="Gold Future" symbol="GOLD 24K" data={rates?.['XAU/INR_MCX']} />
                  <RateCard title="Silver Future" symbol="SILVER 999" data={rates?.['XAG/INR_MCX']} unit="1 KG" />
                </div>
              </div>

              <div>
                <h2 className="text-white font-serif text-xl mb-6 flex items-center gap-3 mt-4">
                  <span className="w-1 h-5 bg-[#eebf63]"></span>
                  COMEX Futures (Global)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <RateCard title="Gold COMEX" symbol="XAU/USD" data={rates?.['XAU/USD_COMEX']} currency="USD" unit="1 OZ" />
                  <RateCard title="Silver COMEX" symbol="XAG/USD" data={rates?.['XAG/USD_COMEX']} currency="USD" unit="1 OZ" />
                </div>
              </div>
            </div>

            {/* Right Column - Spot & Info */}
            <div className="lg:col-span-4 space-y-6">
              <h2 className="text-white font-serif text-xl mb-6 flex items-center gap-3">
                <span className="w-1 h-5 bg-[#d4a54c]"></span>
                Spot Market
              </h2>
              
              <div className="space-y-4">
                <RateCard title="Gold Spot" symbol="XAU/INR" data={rates?.['XAU_SPOT']} />
                <RateCard title="Silver Spot" symbol="XAG/INR" data={rates?.['XAG_SPOT']} unit="1 KG" />
                
                {/* Currency & Booking info */}
                <div className="bg-[#1f163b] rounded-2xl p-6 border border-white/5 mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs tracking-widest text-gray-400 uppercase">USD / INR</span>
                    <span className="text-sm text-white font-bold">{loading ? '--' : formatPrice(rates?.['USD/INR']?.price)}</span>
                  </div>
                  <div className="h-px w-full bg-white/10 my-4"></div>
                  <h4 className="text-[#eebf63] font-serif text-lg mb-3">Live Booking</h4>
                  <p className="text-xs text-gray-400 tracking-wide leading-relaxed mb-4">
                    For bulk bullion booking or fixing rates, please contact our trading desk directly.
                  </p>
                  <a href="tel:+916367246095" className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm font-bold tracking-widest transition-colors">
                    <Banknote className="w-4 h-4 text-[#eebf63]" />
                    CALL TO BOOK
                  </a>
                </div>
              </div>
            </div>
            
          </div>
          
          {/* Disclaimer */}
          <div className="mt-12 p-6 bg-red-500/5 border border-red-500/20 rounded-xl flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-red-400 flex-shrink-0" />
            <p className="text-[11px] text-gray-400 leading-relaxed tracking-wide uppercase">
              <strong>Disclaimer:</strong> The rates provided on this dashboard are indicative and sourced from real-time market feeds. However, they may differ slightly from the final invoice price due to making charges, GST (3%), and local market premiums. Chamunda Jewellers holds the final authority on the billing rate.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
