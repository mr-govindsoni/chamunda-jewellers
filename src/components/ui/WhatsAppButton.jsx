"use client";
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = "916367246095"; // +91 6367246095
  const message = "Hello Chamunda Jewellers! I would like to inquire about...";

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip / Bubble */}
      <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-gray-100 hidden md:flex items-center">
        <span className="text-sm font-medium text-gray-700">Chat with us</span>
      </div>
      
      {/* Button */}
      <button 
        onClick={handleClick}
        className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-colors group relative hover:scale-110 duration-300"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-ping"></span>
        <MessageCircle className="w-8 h-8 relative z-10" />
      </button>
    </div>
  );
}
