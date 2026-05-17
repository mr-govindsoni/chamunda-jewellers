"use client";
import React, { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Trash2, Minus, Plus, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    cartCount,
    getWhatsAppInquiryText 
  } = useCart();

  // Scroll lock when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  return (
    <>
      {/* Dim backdrop overlay */}
      <div 
        className={`fixed inset-0 z-[99] bg-black/75 backdrop-blur-sm transition-opacity duration-500 md:hidden ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
      />
      <div 
        className={`fixed inset-0 z-[99] bg-black/50 backdrop-blur-[2px] transition-opacity duration-500 hidden md:block ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 z-[100] w-full sm:w-[450px] bg-gradient-to-b from-[#1a0b2e] via-[#110722] to-[#23123a] backdrop-blur-2xl text-white shadow-[-25px_0_60px_rgba(0,0,0,0.6)] border-l border-[#eebf63]/30 flex flex-col transition-transform duration-500 ease-out transform ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ height: '100vh', height: '100dvh' }}
      >
        
        {/* Custom Breathing Keyframes for Premium Cart WhatsApp Inquiry Button */}
        <style jsx global>{`
          @keyframes cart-wa-breath {
            0% { box-shadow: 0 0 10px rgba(37, 211, 102, 0.4); transform: scale(1); }
            50% { box-shadow: 0 0 25px rgba(37, 211, 102, 0.7); transform: scale(1.02); }
            100% { box-shadow: 0 0 10px rgba(37, 211, 102, 0.4); transform: scale(1); }
          }
          .animate-cart-wa-breath {
            animation: cart-wa-breath 3s infinite ease-in-out;
          }
        `}</style>

        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex flex-col select-none">
            <h2 className="text-xl font-serif text-[#eebf63] font-medium tracking-[0.12em] uppercase leading-none">Your Selection</h2>
            <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mt-1 font-bold">{cartCount} royal item{cartCount !== 1 ? 's' : ''}</p>
          </div>

          <button 
            onClick={() => setIsCartOpen(false)}
            className="w-11 h-11 rounded-full bg-white/5 border border-[#eebf63]/25 flex items-center justify-center text-[#eebf63] shadow-lg hover:bg-white/10 active:scale-90 transition-all duration-300"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {cart.length > 0 ? (
            /* Items List */
            <div className="space-y-4">
              {cart.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-[#eebf63]/30 transition-all duration-300"
                >
                  {/* Item Image */}
                  <div className="w-20 aspect-[4/5] bg-black/10 rounded-xl overflow-hidden flex-shrink-0 border border-white/5">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[9px] text-[#eebf63] tracking-widest uppercase font-bold block">{item.category}</span>
                    <h4 className="text-sm font-serif font-medium text-white truncate leading-snug">{item.name}</h4>
                    <p className="text-[10px] text-gray-400 tracking-wider uppercase font-semibold">{item.code}</p>

                    {/* Quantity selectors */}
                    <div className="flex items-center gap-3 pt-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-[#eebf63] hover:border-[#eebf63] active:scale-90 transition-all"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-semibold select-none w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-[#eebf63] hover:border-[#eebf63] active:scale-90 transition-all"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="w-9 h-9 rounded-xl hover:bg-red-500/10 hover:border-red-500/30 flex items-center justify-center text-gray-400 hover:text-red-500 border border-transparent transition-all active:scale-90"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* Royal Empty State */
            <div className="text-center py-24 max-w-sm mx-auto space-y-6">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-dashed border-[#eebf63]/30 flex items-center justify-center mx-auto text-[#eebf63]/40 animate-pulse">
                <svg className="w-8 h-8 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-white font-medium tracking-wide">Your Selection is Empty</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed tracking-wide">
                No designs have been selected yet. Explore our exquisite Rajputana Gold and Solitaire Diamond Collections to begin your inquiry.
              </p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="px-8 py-3 bg-[#eebf63] hover:bg-white text-[#110722] text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-300 shadow-lg shadow-[#eebf63]/25"
              >
                Discover Collection
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-6 bg-white/5 border-t border-white/10 space-y-4">
            <div className="flex justify-between items-center text-xs tracking-wider text-gray-400 uppercase font-semibold">
              <span>Bespoke Selection</span>
              <span className="text-[#eebf63]">{cartCount} items ready</span>
            </div>

            <div className="border-t border-white/5 my-2"></div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#eebf63]">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase tracking-wider font-light">Valuation Hotline</p>
                <p className="text-xs text-white font-medium">+91 63672 46095</p>
              </div>
            </div>

            <a 
              href={`https://wa.me/916367246095?text=${getWhatsAppInquiryText()}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-[#25d366] hover:bg-[#20ba5a] text-white py-4 rounded-[18px] font-bold tracking-widest text-xs uppercase flex justify-center items-center gap-2.5 transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.3)] border border-transparent animate-cart-wa-breath"
            >
              <MessageCircle className="w-4 h-4 fill-white" /> SUBMIT ROYAL INQUIRY
            </a>
          </div>
        )}
      </div>
    </>
  );
}
