"use client";
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { TrendingUp, TrendingDown, Phone, MessageCircle } from 'lucide-react';

export default function LiveRatesPage() {
  const [rates, setRates] = useState(null);
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

      // Base conversion
      const calculate = (rawPrice, metal) => {
        let inrPrice = ((rawPrice * usdinr) / 31.103) * (metal === 'GOLD' ? 10 : 1000);
        return inrPrice * 1.16; // Retail premium
      };

      const gold24kPrice = calculate(goldData.price, 'GOLD');
      const gold24kCh = calculate(goldData.ch || 0, 'GOLD');
      
      // Calculate 22K from 24K (approx 91.6% purity)
      const gold22kPrice = gold24kPrice * 0.916;
      const gold22kCh = gold24kCh * 0.916;

      const silverPrice = calculate(silverData.price, 'SILVER');
      const silverCh = calculate(silverData.ch || 0, 'SILVER');

      setRates({
        gold24k: { price: gold24kPrice, ch: gold24kCh },
        gold22k: { price: gold22kPrice, ch: gold22kCh },
        silver: { price: silverPrice, ch: silverCh },
      });
      
      setLastUpdated(new Date().toLocaleTimeString('en-IN', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
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

  const formatPrice = (price) => {
    if (!price) return '--';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    }).format(price);
  };

  const PremiumSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-48 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite] shadow-[0_0_20px_rgba(212,175,55,0.2)]"></div>
          <div className="p-8 h-full flex flex-col justify-between relative z-10">
            <div className="w-24 h-4 bg-gray-200 rounded-full"></div>
            <div className="w-40 h-10 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const RateCard = ({ title, data, unit }) => {
    const isPositive = data.ch >= 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    const colorClass = isPositive ? 'text-green-600' : 'text-red-600';
    const bgClass = isPositive ? 'bg-green-50' : 'bg-red-50';

    return (
      <div className="group relative bg-white/60 backdrop-blur-xl rounded-2xl p-8 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(212,175,55,0.15)] hover:-translate-y-1 hover:border-[#D4AF37]/30 transition-all duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10 flex flex-col h-full justify-between gap-6">
          <div className="flex justify-between items-start">
            <h3 className="font-serif text-xl tracking-wide text-[#1f163b]">{title}</h3>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold px-2 py-1 bg-gray-50 rounded border border-gray-100">{unit}</span>
          </div>
          
          <div>
            <div className="text-4xl font-serif text-[#1f163b] drop-shadow-sm mb-3">
              {formatPrice(data.price)}
            </div>
            
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${bgClass} ${colorClass}`}>
              <Icon className="w-3.5 h-3.5" />
              <span className="text-xs font-bold tracking-wider">
                {isPositive ? '+' : ''}{formatPrice(Math.abs(data.ch))}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow pt-16 pb-24 relative overflow-hidden">
        {/* Subtle Luxury Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(212,175,55,0.03)_0%,_transparent_70%)] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(31,22,59,0.03)_0%,_transparent_70%)] pointer-events-none"></div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif text-[#1f163b] font-medium tracking-wide mb-4">
              Current Market Rates
            </h1>
            <div className="w-16 h-px bg-[#D4AF37] mx-auto"></div>
          </div>

          <div className="flex flex-col items-center max-w-5xl mx-auto w-full">
            
            {loading ? (
              <PremiumSkeleton />
            ) : error ? (
              <div className="py-12 px-6 text-center border border-red-200 bg-red-50 rounded-2xl w-full">
                <p className="text-red-600 font-medium tracking-wide">Market feed temporarily unavailable. Please contact the boutique for current rates.</p>
              </div>
            ) : (
              <div className="w-full space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
                  <RateCard title="24K Pure Gold (999)" data={rates.gold24k} unit="Per 10g" />
                  <RateCard title="22K Standard Gold (916)" data={rates.gold22k} unit="Per 10g" />
                  <RateCard title="Fine Silver (999)" data={rates.silver} unit="Per 1kg" />
                </div>
                
                <div className="text-center pt-2">
                  <p className="text-xs text-gray-400 tracking-widest font-medium uppercase">
                    Last Updated: <span className="text-gray-600">{lastUpdated}</span>
                  </p>
                </div>
              </div>
            )}

            <div className="mt-16 text-center max-w-2xl mx-auto space-y-8">
              <p className="text-sm text-gray-500 leading-relaxed font-light">
                Market rates are updated periodically. To lock in the current exact rate for your purchase, please contact our boutique directly.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="https://wa.me/916367246095?text=Hello%20Argun%20Jewellers,%20I%20would%20like%20to%20lock%20in%20today's%20live%20rate%20for%20my%20purchase"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-[#1f163b] text-white hover:bg-[#D4AF37] hover:text-[#1f163b] rounded-xl font-bold text-xs uppercase tracking-widest transition-colors duration-500 flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" /> Lock This Rate via WhatsApp
                </a>
                
                <a 
                  href="tel:+916367246095"
                  className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#1f163b] text-[#1f163b] hover:bg-gray-50 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors duration-500 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" /> Call Boutique
                </a>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
