"use client";
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function LoginPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);

  useEffect(() => {
    // Check if user has already seen or closed the popup in this session
    const seen = sessionStorage.getItem('hasSeenLoginPopup');
    if (seen) {
      setHasSeenPopup(true);
      return;
    }

    // Show popup after 1 minute (60000 ms)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setHasSeenPopup(true);
    sessionStorage.setItem('hasSeenLoginPopup', 'true');
  };

  if (!isOpen || hasSeenPopup) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in zoom-in-95 duration-500">
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#1f163b] transition-colors z-10 bg-white/50 rounded-full p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Decorative Header */}
        <div className="bg-[#1f163b] p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#3a225e] to-[#1f163b]"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 bg-[#3a225e] transform rotate-45 flex items-center justify-center border border-[#d4a54c] mb-4">
              <div className="w-8 h-8 border border-[#d4a54c] flex items-center justify-center">
                <div className="w-3 h-3 bg-[#d4a54c] rounded-full"></div>
              </div>
            </div>
            <h2 className="text-2xl font-serif text-[#eebf63] font-medium tracking-wide">Welcome Back</h2>
            <p className="text-sm text-gray-300 mt-2 font-light">Sign in to unlock exclusive offers and manage your wishlist.</p>
          </div>
        </div>

        {/* Form Area */}
        <div className="p-8">
          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleClose(); }}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email or Mobile Number</label>
              <input 
                type="text" 
                placeholder="Enter your email or mobile"
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg focus:ring-[#1f163b] focus:border-[#1f163b] block p-3 transition-colors text-sm"
                required
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <a href="#" className="text-xs text-[#d4a54c] hover:underline font-medium">Forgot?</a>
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg focus:ring-[#1f163b] focus:border-[#1f163b] block p-3 transition-colors text-sm"
                required
              />
            </div>
            
            <button 
              type="submit"
              className="w-full mt-2 bg-[#1f163b] text-[#eebf63] py-3.5 rounded-lg font-bold text-sm tracking-wider uppercase hover:bg-[#3a225e] transition-colors shadow-lg"
            >
              Login
            </button>
            
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don't have an account? <a href="#" className="text-[#1f163b] font-bold hover:text-[#d4a54c] transition-colors">Sign up</a>
              </p>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
}
