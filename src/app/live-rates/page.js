"use client";
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { TrendingUp, TrendingDown, Clock, Activity, ShieldCheck, Banknote } from 'lucide-react';

export default function LiveRatesPage() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');
  const [error, setError] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(83.50);

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

      const calculate = (rawPrice, metal, type) => {
        if (type === 'COMEX') return rawPrice;
        let inrPrice = ((rawPrice * usdinr) / 31.103) * (metal === 'GOLD' ? 10 : 1000);
        
        if (type === 'MCX') {
          return inrPrice * (metal === 'GOLD' ? 1.13 : 1.16);
        }
        if (type === 'RETAIL') {
          return inrPrice * (metal === 'GOLD' ? 1.16 : 1.16);
        }
        return 0;
      };

      const realData = {
        'XAU/INR_MCX': { 
          price: calculate(goldData.price, 'GOLD', 'MCX'), 
          ch: calculate(goldData.ch || 0, 'GOLD', 'MCX'), 
          high: calculate(goldData.high_price || goldData.price, 'GOLD', 'MCX'), 
          low: calculate(goldData.low_price || goldData.price, 'GOLD', 'MCX') 
        },
        'XAG/INR_MCX': { 
          price: calculate(silverData.price, 'SILVER', 'MCX'), 
          ch: calculate(silverData.ch || 0, 'SILVER', 'MCX'), 
          high: calculate(silverData.high_price || silverData.price, 'SILVER', 'MCX'), 
          low: calculate(silverData.low_price || silverData.price, 'SILVER', 'MCX') 
        },
        'XAU/USD_COMEX': { 
          price: goldData.price, 
          ch: goldData.ch || 0, 
          high: goldData.high_price || goldData.price, 
          low: goldData.low_price || goldData.price 
        },
        'XAG/USD_COMEX': { 
          price: silverData.price, 
          ch: silverData.ch || 0, 
          high: silverData.high_price || silverData.price, 
          low: silverData.low_price || silverData.price 
        },
        'XAU_SPOT': { 
          price: calculate(goldData.price, 'GOLD', 'RETAIL'), 
          ch: calculate(goldData.ch || 0, 'GOLD', 'RETAIL'), 
          high: calculate(goldData.high_price || goldData.price, 'GOLD', 'RETAIL'), 
          low: calculate(goldData.low_price || goldData.price, 'GOLD', 'RETAIL') 
        },
        'XAG_SPOT': { 
          price: calculate(silverData.price, 'SILVER', 'RETAIL'), 
          ch: calculate(silverData.ch || 0, 'SILVER', 'RETAIL'), 
          high: calculate(silverData.high_price || silverData.price, 'SILVER', 'RETAIL'), 
          low: calculate(silverData.low_price || silverData.price, 'SILVER', 'RETAIL') 
        },
        'USD/INR': { 
          price: usdinr, 
          ch: 0, 
          high: usdinr, 
          low: usdinr 
        },
      };

      setRates(realData);
      setLastUpdated(new Date().toLocaleTimeString('en-IN', { hour12: true }));
    } catch (err) {
      console.error('Error fetching live rates:', err);
      if (!rates) setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 10000); // refresh every 10 seconds
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
          <div className="flex items-end gap-3 flex-wrap">
            <span className="text-3xl md:text-4xl font-serif text-[#eebf63] text-glow-gold drop-shadow-md tracking-wide">
              {formatPrice(data.price, currency)}
            </span>
          </div>
          <div className={`inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-md ${changeBg} ${changeColor}`}>
            <Icon className="w-3.5 h-3.5" />
            <span className="text-sm font-bold tracking-wide">
              {isPositive ? '+' : ''}{formatPrice(Math.abs(data.ch), currency)} {data.price ? `(${((data.ch / data.price) * 100).toFixed(2)}%)` : ''}
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
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0a0514] mix-blend-multiply z-10"></div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(31,22,59,0.8)_0%,_rgba(10,5,20,0)_70%)] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(238,191,99,0.05)_0%,_rgba(10,5,20,0)_70%)] pointer-events-none"></div>
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 md:pt-20">
          
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

          {error ? (
            <div className="py-12 text-center border border-red-500/20 bg-red-500/5 rounded-2xl">
              <p className="text-red-400 tracking-widest text-sm uppercase">Unable to connect to live market feed.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
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

              <div className="lg:col-span-4 space-y-6">
                <h2 className="text-white font-serif text-xl mb-6 flex items-center gap-3">
                  <span className="w-1 h-5 bg-[#d4a54c]"></span>
                  Indicative Retail Rate
                </h2>
                
                <div className="space-y-4">
                  <RateCard title="Gold Retail" symbol="GOLD 24K" data={rates?.['XAU_SPOT']} />
                  <RateCard title="Silver Retail" symbol="SILVER 999" data={rates?.['XAG_SPOT']} unit="1 KG" />
                  
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
          )}
          
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
