"use client";
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Gem, RefreshCw } from 'lucide-react';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const slides = [
    {
      type: 'image',
      src: "https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?q=80&w=2938&auto=format&fit=crop",
      title: "A Legacy of Purity",
      subtitle: "A Promise of Trust",
      desc: "Celebrate every moment with timeless elegant bridal collections."
    },
    {
      type: 'image',
      src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2938&auto=format&fit=crop",
      title: "Royal Rajputana",
      subtitle: "Heritage Collection",
      desc: "Discover the magic of intricate antique artistry."
    },
    {
      type: 'image',
      src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2938&auto=format&fit=crop",
      title: "Luminous Diamonds",
      subtitle: "Eternity Rings",
      desc: "Crafted for the rare moments that last a lifetime."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);

  return (
    <section 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[600px] md:h-[750px] bg-[#1a0b2e] flex items-center justify-center overflow-hidden group/hero"
    >
      {/* Background Slides */}
      {slides.map((slide, idx) => (
        <div 
          key={idx}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          style={{
            transform: idx === currentSlide 
              ? `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) scale(1.05)` 
              : 'scale(1.1)',
            transition: 'transform 0.2s ease-out, opacity 1s ease-in-out'
          }}
        >
          {slide.type === 'image' ? (
            <img 
              src={slide.src} 
              alt={slide.title} 
              className="w-full h-full object-cover object-right opacity-80 mix-blend-screen filter contrast-125 saturate-110"
            />
          ) : (
            <video 
              src={slide.src} 
              autoPlay muted loop playsInline
              className="w-full h-full object-cover object-right opacity-80 mix-blend-screen filter contrast-125 saturate-110"
            />
          )}
        </div>
      ))}

      {/* Gradient Overlay for Text Readability & Glow */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#110722] via-[#110722]/80 to-transparent w-full md:w-[70%]" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-[#eebf63]/20 via-transparent to-transparent mix-blend-screen pointer-events-none" />

      {/* Floating Gold Particles */}
      <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => {
          // Use deterministic pseudo-random values based on index 'i' and round to 2 decimals to prevent SSR hydration errors
          const pseudoRandom1 = (Math.abs(Math.sin(i * 12.34)) * 4 + 1).toFixed(2);
          const pseudoRandom2 = (Math.abs(Math.cos(i * 43.21)) * 100).toFixed(2);
          const pseudoRandom3 = (Math.abs(Math.sin(i * 87.65)) * 100).toFixed(2);
          const pseudoRandom4 = (Math.abs(Math.cos(i * 34.56)) * 3 + 3).toFixed(2);
          const pseudoRandom5 = (Math.abs(Math.sin(i * 56.78)) * 2).toFixed(2);
          const pseudoRandom6 = (Math.abs(Math.cos(i * 98.76)) * 0.5 + 0.2).toFixed(2);
          
          return (
            <div 
              key={i}
              className="absolute rounded-full bg-[#eebf63] blur-[1px] animate-float"
              style={{
                width: pseudoRandom1 + 'px',
                height: pseudoRandom1 + 'px',
                top: pseudoRandom2 + '%',
                left: pseudoRandom3 + '%',
                animationDuration: pseudoRandom4 + 's',
                animationDelay: pseudoRandom5 + 's',
                opacity: parseFloat(pseudoRandom6)
              }}
            ></div>
          );
        })}
      </div>

      <div className="relative z-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center h-full">
        <div className="max-w-2xl pt-10">
          
          {/* Hero Content Area */}
          <div className="relative z-20">
            
            {/* Animated Text Content */}
            <div className="relative min-h-[250px] sm:min-h-[300px] lg:min-h-[320px] w-full">
              {slides.map((slide, idx) => (
                <div 
                  key={idx}
                  className={`absolute inset-0 transition-all duration-1000 transform ${
                    idx === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#fce2a6] via-[#eebf63] to-[#d4a54c] font-medium leading-[1.1] mb-6 drop-shadow-[0_0_15px_rgba(238,191,99,0.3)]">
                    {slide.title}, <br />
                    <span className="text-white drop-shadow-md">{slide.subtitle}</span>
                  </h2>
                  <p className="text-gray-300 text-base md:text-lg font-light max-w-xl leading-relaxed tracking-wide">
                    {slide.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 text-white mt-12 border-t border-white/10 pt-8 w-max">
            <div className="flex items-center gap-4 group/badge">
              <div className="p-2.5 rounded-full bg-white/5 border border-[#eebf63]/30 group-hover/badge:bg-[#eebf63]/10 transition-colors duration-300">
                <ShieldCheck className="w-6 h-6 text-[#eebf63] stroke-[1.5]" />
              </div>
              <span className="text-[11px] uppercase tracking-widest font-medium leading-tight text-gray-300">100% Certified<br/>Jewellery</span>
            </div>
            <div className="flex items-center gap-4 group/badge">
              <div className="p-2.5 rounded-full bg-white/5 border border-[#eebf63]/30 group-hover/badge:bg-[#eebf63]/10 transition-colors duration-300">
                <Gem className="w-6 h-6 text-[#eebf63] stroke-[1.5]" />
              </div>
              <span className="text-[11px] uppercase tracking-widest font-medium leading-tight text-gray-300">IGI Graded<br/>Diamonds</span>
            </div>
            <div className="flex items-center gap-4 group/badge">
              <div className="p-2.5 rounded-full bg-white/5 border border-[#eebf63]/30 group-hover/badge:bg-[#eebf63]/10 transition-colors duration-300">
                <RefreshCw className="w-6 h-6 text-[#eebf63] stroke-[1.5]" />
              </div>
              <span className="text-[11px] uppercase tracking-widest font-medium leading-tight text-gray-300">Lifetime<br/>Exchange</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Premium Carousel Controls */}
      <div className="absolute right-8 bottom-12 z-30 flex items-center gap-4">
        <div className="flex gap-2 mr-4">
          {slides.map((_, idx) => (
            <div 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1 cursor-pointer transition-all duration-500 rounded-full ${
                idx === currentSlide ? 'w-10 bg-[#eebf63] shadow-[0_0_10px_#eebf63]' : 'w-4 bg-white/30 hover:bg-white/60'
              }`}
            ></div>
          ))}
        </div>
        <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 hover:border-[#eebf63] transition-all duration-300">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 hover:border-[#eebf63] transition-all duration-300">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </section>
  );
}
