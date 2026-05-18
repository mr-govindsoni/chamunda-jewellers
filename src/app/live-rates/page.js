"use client";
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ShieldCheck, Phone } from 'lucide-react';

export default function LiveRatesPage() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(83.50);

  // We add a tiny jitter to the prices every second to make the board feel "alive" 
  // since the free API only updates every few minutes.
  const [jitter, setJitter] = useState(0);

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
        'GOLD_RETAIL_995': { 
          price: calculate(goldData.price, 'GOLD', 'RETAIL') * 0.995, 
          ch: calculate(goldData.ch || 0, 'GOLD', 'RETAIL'), 
          high: calculate(goldData.high_price || goldData.price, 'GOLD', 'RETAIL') * 0.995, 
          low: calculate(goldData.low_price || goldData.price, 'GOLD', 'RETAIL') * 0.995 
        },
        'SILVER_RETAIL_999': { 
          price: calculate(silverData.price, 'SILVER', 'RETAIL'), 
          ch: calculate(silverData.ch || 0, 'SILVER', 'RETAIL'), 
          high: calculate(silverData.high_price || silverData.price, 'SILVER', 'RETAIL'), 
          low: calculate(silverData.low_price || silverData.price, 'SILVER', 'RETAIL') 
        },
        'GOLD_MCX': { 
          price: calculate(goldData.price, 'GOLD', 'MCX'), 
          ch: calculate(goldData.ch || 0, 'GOLD', 'MCX'), 
          high: calculate(goldData.high_price || goldData.price, 'GOLD', 'MCX'), 
          low: calculate(goldData.low_price || goldData.price, 'GOLD', 'MCX') 
        },
        'SILVER_MCX': { 
          price: calculate(silverData.price, 'SILVER', 'MCX'), 
          ch: calculate(silverData.ch || 0, 'SILVER', 'MCX'), 
          high: calculate(silverData.high_price || silverData.price, 'SILVER', 'MCX'), 
          low: calculate(silverData.low_price || silverData.price, 'SILVER', 'MCX') 
        },
        'XAU_USD': { 
          price: goldData.price, 
          ch: goldData.ch || 0, 
          high: goldData.high_price || goldData.price, 
          low: goldData.low_price || goldData.price 
        },
        'XAG_USD': { 
          price: silverData.price, 
          ch: silverData.ch || 0, 
          high: silverData.high_price || silverData.price, 
          low: silverData.low_price || silverData.price 
        },
        'USD_INR': { 
          price: usdinr, 
          ch: 0, 
          high: usdinr + 0.1, 
          low: usdinr - 0.1 
        },
      };

      setRates(realData);
    } catch (err) {
      console.error('Error fetching live rates:', err);
      if (!rates) setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60000); // refresh API every 60 seconds
    return () => clearInterval(interval);
  }, []);

  // Jitter effect to simulate real-time ticks
  useEffect(() => {
    const jitterInterval = setInterval(() => {
      // Create a random jitter between -2 and +2
      setJitter((Math.random() * 4) - 2);
    }, 2000);
    return () => clearInterval(jitterInterval);
  }, []);

  const formatIN = (num, addJitter = false) => {
    if (!num) return '--';
    const finalNum = addJitter ? num + jitter : num;
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    }).format(finalNum);
  };

  const formatSpot = (num, addJitter = false) => {
    if (!num) return '--';
    const finalNum = addJitter ? num + (jitter / 100) : num;
    return finalNum.toFixed(2);
  };

  const TableRow = ({ title, subtitle, buy, sell, low, high, change, addJitter = true }) => {
    const sellPrice = formatIN(sell, addJitter);
    const lowPrice = formatIN(low, addJitter);
    const highPrice = formatIN(high, addJitter);
    const changeVal = formatIN(Math.abs(change));
    
    // Dynamic background flash color for tick
    const isUp = jitter > 0;
    const bgClass = isUp ? 'bg-green-600/20' : 'bg-red-600/20';
    const textColor = isUp ? 'text-green-500' : 'text-red-500';

    return (
      <div className="grid grid-cols-12 border-b border-[#333] hover:bg-white/5 transition-colors">
        <div className="col-span-6 p-4 border-r border-[#333] flex flex-col justify-center">
          <h3 className="text-[#eebf63] font-bold text-sm md:text-base tracking-wide">{title}</h3>
          <p className="text-gray-400 text-xs mt-1">{subtitle}</p>
        </div>
        
        <div className="col-span-2 p-2 border-r border-[#333] flex flex-col justify-center items-center">
          <span className="text-white font-bold text-lg">--</span>
          <span className="text-[#eebf63] text-xs mt-1">L: {lowPrice}</span>
        </div>
        
        <div className="col-span-2 p-2 border-r border-[#333] flex flex-col justify-center items-center relative overflow-hidden group">
          {/* Simulated tick flash */}
          <div className={`absolute inset-0 ${bgClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
          <span className="bg-green-600 text-white font-bold text-sm md:text-lg px-2 py-1 rounded shadow-[0_0_10px_rgba(22,163,74,0.4)] relative z-10">
            {sellPrice}
          </span>
          <span className="text-[#eebf63] text-xs mt-1 relative z-10">H: {highPrice}</span>
        </div>
        
        <div className="col-span-2 p-4 flex flex-col justify-center items-center">
          <span className={`font-bold text-sm md:text-lg ${textColor}`}>
            [{change >= 0 ? '' : '-'}{changeVal}]
          </span>
        </div>
      </div>
    );
  };

  const FutureCard = ({ title, buy, sell, high, low, addJitter = true }) => {
    const buyPrice = formatIN(buy, addJitter);
    const sellPrice = formatIN(sell, addJitter);
    const isUp = jitter > 0;
    
    return (
      <div className="border border-[#333] rounded overflow-hidden bg-[#0a0514]">
        <div className="bg-gradient-to-b from-[#1f163b] to-[#0a0514] border-b border-[#333] py-2 text-center">
          <h3 className="text-[#eebf63] font-bold tracking-widest">{title}</h3>
        </div>
        
        <div className="grid grid-cols-2 p-4">
          <div className="text-center border-r border-[#333]">
            <p className="text-[#eebf63] text-xs font-bold mb-2">BUY</p>
            <span className="text-white font-bold text-xl">{buyPrice}</span>
          </div>
          <div className="text-center relative">
            <p className="text-[#eebf63] text-xs font-bold mb-2">SELL</p>
            <span className="text-white font-bold text-xl">{sellPrice}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 bg-white/5 border-t border-[#333] py-2 px-4 text-xs">
          <div className="text-center text-gray-300">High - {formatIN(high, addJitter)}</div>
          <div className="text-center text-gray-300">Low - {formatIN(low, addJitter)}</div>
        </div>
      </div>
    );
  };

  const SpotCard = ({ title, bid, ask, high, low, addJitter = true }) => {
    const bidPrice = formatSpot(bid, addJitter);
    const askPrice = formatSpot(ask, addJitter);
    const isUp = jitter > 0;
    const bgClass = isUp ? 'bg-green-600' : 'bg-red-600';
    
    return (
      <div className="border border-[#333] rounded overflow-hidden bg-[#0a0514]">
        <div className="bg-gradient-to-b from-[#1f163b] to-[#0a0514] border-b border-[#333] py-2 text-center">
          <h3 className="text-[#eebf63] font-bold tracking-widest">{title}</h3>
        </div>
        
        <div className="grid grid-cols-2 p-4 gap-4">
          <div className="text-center">
            <p className="text-[#eebf63] text-xs font-bold mb-2">Bid</p>
            <div className={`px-2 py-1 rounded shadow-lg transition-colors duration-300 ${isUp ? 'bg-green-600' : 'bg-red-600'}`}>
              <span className="text-white font-bold text-lg">{bidPrice}</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-[#eebf63] text-xs font-bold mb-2">Ask</p>
            <div className={`px-2 py-1 rounded shadow-lg transition-colors duration-300 ${!isUp ? 'bg-green-600' : 'bg-red-600'}`}>
              <span className="text-white font-bold text-lg">{askPrice}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 bg-white/5 border-t border-[#333] py-2 px-4 text-xs">
          <div className="text-center text-gray-300">High - {formatSpot(high, addJitter)}</div>
          <div className="text-center text-gray-300">Low - {formatSpot(low, addJitter)}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#000] flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow pb-20">
        <div className="max-w-[1400px] mx-auto px-2 sm:px-4 mt-8">
          
          <div className="flex justify-between items-center mb-6 bg-[#0a0514] border border-[#eebf63] rounded p-4">
            <h1 className="text-2xl font-serif text-[#eebf63] tracking-widest uppercase">
              Live Rates Dashboard
            </h1>
            <a href="tel:+916367246095" className="flex items-center gap-2 bg-[#eebf63] text-[#000] px-4 py-2 rounded font-bold uppercase text-sm hover:bg-[#d4a54c] transition-colors">
              <Phone className="w-4 h-4" /> Booking Number
            </a>
          </div>

          {loading ? (
            <div className="text-center text-[#eebf63] py-20 font-bold tracking-widest animate-pulse">
              CONNECTING TO MARKET SERVER...
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-20 font-bold tracking-widest border border-red-500/30 rounded bg-red-500/5">
              CONNECTION LOST. PLEASE REFRESH.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              
              {/* Left Column - Large Table */}
              <div className="lg:col-span-8">
                <div className="border border-[#333] rounded overflow-hidden bg-[#0a0514]">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 bg-white/10 border-b border-[#333] py-3 px-4">
                    <div className="col-span-6 text-white font-bold text-sm tracking-widest">DESCRIPTION</div>
                    <div className="col-span-2 text-center text-white font-bold text-sm tracking-widest">BUY</div>
                    <div className="col-span-2 text-center text-white font-bold text-sm tracking-widest">SELL</div>
                    <div className="col-span-2 text-center text-white font-bold text-sm tracking-widest">T-CHANGE</div>
                  </div>
                  
                  {/* Table Body */}
                  <div className="flex flex-col">
                    <TableRow 
                      title="CHAMUNDA GOLD 995 JDR" 
                      subtitle="Ready Stock Available In JDR (3% GST Paid)"
                      sell={rates?.['GOLD_RETAIL_995']?.price}
                      low={rates?.['GOLD_RETAIL_995']?.low}
                      high={rates?.['GOLD_RETAIL_995']?.high}
                      change={rates?.['GOLD_RETAIL_995']?.ch}
                    />
                    <TableRow 
                      title="CHAMUNDA SILVER 999 JDR" 
                      subtitle="Ready Stock Available In JDR (3% GST Paid)"
                      sell={rates?.['SILVER_RETAIL_999']?.price}
                      low={rates?.['SILVER_RETAIL_999']?.low}
                      high={rates?.['SILVER_RETAIL_999']?.high}
                      change={rates?.['SILVER_RETAIL_999']?.ch}
                    />
                  </div>
                </div>

                {/* Futures Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <FutureCard 
                    title="GOLD FUTURE (MCX)"
                    buy={rates?.['GOLD_MCX']?.price - 25}
                    sell={rates?.['GOLD_MCX']?.price}
                    high={rates?.['GOLD_MCX']?.high}
                    low={rates?.['GOLD_MCX']?.low}
                  />
                  <FutureCard 
                    title="SILVER FUTURE (MCX)"
                    buy={rates?.['SILVER_MCX']?.price - 40}
                    sell={rates?.['SILVER_MCX']?.price}
                    high={rates?.['SILVER_MCX']?.high}
                    low={rates?.['SILVER_MCX']?.low}
                  />
                </div>
              </div>

              {/* Right Column - Spot Cards */}
              <div className="lg:col-span-4 space-y-4">
                <SpotCard 
                  title="GOLD SPOT (COMEX)"
                  bid={rates?.['XAU_USD']?.price - 0.20}
                  ask={rates?.['XAU_USD']?.price + 0.15}
                  high={rates?.['XAU_USD']?.high}
                  low={rates?.['XAU_USD']?.low}
                  addJitter={true}
                />
                <SpotCard 
                  title="SILVER SPOT (COMEX)"
                  bid={rates?.['XAG_USD']?.price - 0.05}
                  ask={rates?.['XAG_USD']?.price + 0.04}
                  high={rates?.['XAG_USD']?.high}
                  low={rates?.['XAG_USD']?.low}
                  addJitter={true}
                />
                <SpotCard 
                  title="INR SPOT"
                  bid={rates?.['USD_INR']?.price - 0.02}
                  ask={rates?.['USD_INR']?.price + 0.03}
                  high={rates?.['USD_INR']?.high}
                  low={rates?.['USD_INR']?.low}
                  addJitter={false}
                />
              </div>
              
            </div>
          )}

          <div className="mt-8 p-4 bg-[#1f163b]/30 border border-[#eebf63]/20 rounded flex items-start gap-4">
            <ShieldCheck className="w-5 h-5 text-[#eebf63] flex-shrink-0" />
            <p className="text-[10px] text-gray-400 tracking-wide uppercase">
              Note: The live market feed relies on external APIs. Real-time sub-second latency is simulated for visual feedback using jitter logic since the free API provides batched updates. For guaranteed exact booking rates, call the booking number above.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

