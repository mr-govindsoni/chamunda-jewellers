"use client";
import { useState, useEffect } from 'react';
import { Calculator, RefreshCw, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Simple custom hook for count up animation
function useCountUp(value, duration = 1000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const startValue = count;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      // Ease out quad
      const easePercent = percent * (2 - percent);
      
      setCount(startValue + (value - startValue) * easePercent);
      
      if (percent < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value]);

  return count;
}

export default function EstimateCalculator() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Inputs
  const [metal, setMetal] = useState('gold22k'); // gold24k, gold22k, silver
  const [weight, setWeight] = useState(10);
  const [unit, setUnit] = useState('grams'); // grams, kg, oz
  const [makingCharge, setMakingCharge] = useState(800);

  useEffect(() => {
    setMounted(true);
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
  }, []);

  const getWeightInGrams = () => {
    let w = parseFloat(weight) || 0;
    if (unit === 'kg') return w * 1000;
    if (unit === 'oz') return w * 31.1034768;
    return w;
  };

  const getRatePerGram = () => {
    if (!rates) return 0;
    let pricePerOz = 0;
    if (metal === 'gold24k') {
      pricePerOz = rates['XAU/INR']?.price || 0;
    } else if (metal === 'gold22k') {
      pricePerOz = (rates['XAU/INR']?.price || 0) * (22 / 24);
    } else if (metal === 'silver') {
      pricePerOz = rates['XAG/INR']?.price || 0;
    }
    return pricePerOz / 31.1034768; 
  };

  const weightInGrams = getWeightInGrams();
  const ratePerGram = getRatePerGram();
  
  const basePrice = weightInGrams * ratePerGram;
  const totalMakingCharges = weightInGrams * (parseFloat(makingCharge) || 0);
  const subTotal = basePrice + totalMakingCharges;
  const gst = subTotal * 0.03;
  const finalTotal = subTotal + gst;

  // Animated values
  const animBasePrice = useCountUp(basePrice);
  const animMakingCharges = useCountUp(totalMakingCharges);
  const animSubTotal = useCountUp(subTotal);
  const animGst = useCountUp(gst);
  const animFinalTotal = useCountUp(finalTotal);

  const formatCurrency = (val) => {
    if (!mounted) return '';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="glass-dark rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex-1 relative group/calc"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
      
      {/* Header */}
      <div className="border-b border-white/10 px-8 py-6 flex items-start gap-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#eebf63]/10 rounded-full blur-3xl"></div>
        <div className="p-3 bg-gradient-to-br from-[#eebf63] to-[#d4a54c] rounded-xl shadow-[0_0_15px_rgba(238,191,99,0.4)] mt-1">
          <Calculator className="text-[#1f163b] w-6 h-6" />
        </div>
        <div className="relative z-10">
          <h3 className="text-[#eebf63] font-serif text-2xl font-medium tracking-wide drop-shadow-md">Live Estimate Calculator</h3>
          <p className="text-gray-400 text-sm mt-1 font-light tracking-wide">Real-time market rates and transparent breakdown</p>
        </div>
      </div>
      
      {/* Form */}
      <div className="p-8 relative">
        <div className="grid grid-cols-2 gap-6 mb-8 relative z-10">
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-2">Select Metal</label>
            <select 
              className="w-full bg-white/5 border border-white/10 text-white rounded-lg focus:ring-[#eebf63] focus:border-[#eebf63] block p-3 transition-colors appearance-none cursor-pointer"
              value={metal}
              onChange={(e) => setMetal(e.target.value)}
            >
              <option value="gold24k" className="bg-[#1f163b]">Gold 24K</option>
              <option value="gold22k" className="bg-[#1f163b]">Gold 22K</option>
              <option value="silver" className="bg-[#1f163b]">Silver</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-2">Unit</label>
            <select 
              className="w-full bg-white/5 border border-white/10 text-white rounded-lg focus:ring-[#eebf63] focus:border-[#eebf63] block p-3 transition-colors appearance-none cursor-pointer"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="grams" className="bg-[#1f163b]">Grams</option>
              <option value="kg" className="bg-[#1f163b]">Kilograms</option>
              <option value="oz" className="bg-[#1f163b]">Troy Ounces</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-2">Weight</label>
            <input 
              type="number" 
              min="0"
              step="0.01"
              className="w-full bg-white/5 border border-white/10 text-white rounded-lg focus:ring-[#eebf63] focus:border-[#eebf63] block p-3 transition-colors"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-2">Making (₹/gm)</label>
            <input 
              type="number" 
              min="0"
              className="w-full bg-white/5 border border-white/10 text-white rounded-lg focus:ring-[#eebf63] focus:border-[#eebf63] block p-3 transition-colors"
              value={makingCharge}
              onChange={(e) => setMakingCharge(e.target.value)}
            />
          </div>
        </div>

        {/* Live Rate Info */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 mb-8 relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#eebf63]/5 to-transparent opacity-0 group-hover/calc:opacity-100 transition-opacity duration-700"></div>
          <div className="flex items-center gap-4 w-full sm:w-auto relative z-10">
            <span className="text-[13px] font-medium text-gray-300 uppercase tracking-wider">{metal === 'silver' ? 'Silver' : metal === 'gold22k' ? 'Gold 22K' : 'Gold 24K'} Rate</span>
            <span className="text-xl font-bold text-[#eebf63] drop-shadow-md">
              {mounted ? formatCurrency(ratePerGram) : '...'} <span className="text-xs text-gray-500 font-normal tracking-widest">/ GM</span>
            </span>
            {mounted && rates && <span className="text-[10px] text-green-400 font-bold tracking-widest flex items-center px-2 py-1 bg-green-400/10 rounded border border-green-400/20">▲ +8.00</span>}
          </div>
          <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-3 sm:mt-0 w-full sm:w-auto justify-end uppercase tracking-widest font-medium relative z-10">
            <span>Live Sync</span>
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#eebf63]' : 'text-gray-400'}`} />
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-4 font-sans relative z-10">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400 tracking-wide">Base Price</span>
            <span className="font-medium text-white">{mounted ? formatCurrency(animBasePrice) : '...'}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400 tracking-wide">Making Charges</span>
            <span className="font-medium text-white">{mounted ? formatCurrency(animMakingCharges) : '...'}</span>
          </div>
          <div className="flex justify-between items-center text-sm border-t border-white/10 pt-4">
            <span className="text-gray-400 tracking-wide">Sub Total</span>
            <span className="font-medium text-white">{mounted ? formatCurrency(animSubTotal) : '...'}</span>
          </div>
          <div className="flex justify-between items-center text-sm border-b border-white/10 pb-4">
            <span className="text-gray-400 tracking-wide">GST (3%)</span>
            <span className="font-medium text-white">{mounted ? formatCurrency(animGst) : '...'}</span>
          </div>
          <div className="flex justify-between items-end pt-2 relative">
            <div className="absolute -left-4 -right-4 bottom-0 h-12 bg-gradient-to-t from-[#eebf63]/10 to-transparent pointer-events-none opacity-0 group-hover/calc:opacity-100 transition-opacity duration-700"></div>
            <span className="text-lg font-serif text-[#eebf63] font-medium tracking-wide">Estimated Total</span>
            <span className="text-3xl font-bold text-[#eebf63] text-glow-gold transition-all duration-300 transform group-hover/calc:scale-105 origin-right">
              {mounted ? formatCurrency(animFinalTotal) : '...'}
            </span>
          </div>
        </div>
        
      </div>
    </motion.div>
  );
}
