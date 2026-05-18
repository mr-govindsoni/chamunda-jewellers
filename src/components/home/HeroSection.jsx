"use client";
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, Gem, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const heroRef = useRef(null);

  const defaultSlides = [
    {
      type: 'image',
      src: "https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?q=80&w=2938&auto=format&fit=crop",
      title: "Imperial Diamonds",
      subtitle: "Eternity Collection",
      desc: "Celebrate rare milestones with modern brilliant-cut diamonds, masterfully handcrafted for endless light."
    },
    {
      type: 'image',
      src: "https://images.unsplash.com/photo-1605100804763-247f66126e28?q=80&w=2938&auto=format&fit=crop",
      title: "The Art of Rings",
      subtitle: "Elegance & Detail",
      desc: "Exquisite 22K gold rings featuring delicate Rajasthani Nakshi artwork and royal Rajputana motifs."
    },
    {
      type: 'image',
      src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2938&auto=format&fit=crop",
      title: "Royal Bridal Couture",
      subtitle: "Uncompromising Majesty",
      desc: "Immersive antique gold choker sets that preserve heritage royal values across generations."
    },
    {
      type: 'image',
      src: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=2938&auto=format&fit=crop",
      title: "Heritage Rajputana",
      subtitle: "Charwas Golden Legacy",
      desc: "Handcrafted heirloom masterpieces displaying traditional Kundan-Polki settings by master artisans."
    },
    {
      type: 'image',
      src: "https://images.unsplash.com/photo-1610660600122-bd885de5eaaf?q=80&w=2938&auto=format&fit=crop",
      title: "Pure Gold & Bullion",
      subtitle: "Sovereign Gold Coins",
      desc: "Secure absolute future purity with 24K BIS 999 certified gold coins and sovereign investment bars."
    },
    {
      type: 'image',
      src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2938&auto=format&fit=crop",
      title: "Bespoke Festive Couture",
      subtitle: "Exclusive Season Offers",
      desc: "Cherish spectacular moments with customized services and flat 20% off on premium gold making charges.",
      luxury_tag: "Festive Offer"
    }
  ];

  const [activeSlides, setActiveSlides] = useState(defaultSlides);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const { data, error } = await supabase.from('hero_banners').select('*').eq('is_active', true).order('display_order', { ascending: true });
        if (!error && data && data.length > 0) {
          const formattedSlides = data.map(b => ({
            type: 'image',
            src: b.desktop_image,
            mobileSrc: b.mobile_image || b.desktop_image,
            title: b.title,
            subtitle: b.subtitle,
            desc: b.description,
            cta_text: b.cta_text,
            cta_url: b.cta_url,
            luxury_tag: b.luxury_tag || "Luxury Campaign"
          }));
          setActiveSlides(formattedSlides);
        } else {
          setActiveSlides(defaultSlides);
        }
      } catch (err) {
        setActiveSlides(defaultSlides);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBanners();
  }, []);

  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [activeSlides.length]);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % activeSlides.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + activeSlides.length) % activeSlides.length);

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) nextSlide();
    if (touchStart - touchEnd < -75) prevSlide();
  };

  return (
    <section 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[600px] sm:h-[650px] md:h-[780px] bg-[#110722] flex items-center justify-center overflow-hidden group/hero select-none"
    >
      {/* Background Slides with continuous soft zoom & parallax */}
      {activeSlides.map((slide, idx) => (
        <div 
          key={idx}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          style={{
            transform: idx === currentSlide 
              ? `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px) scale(1.05)` 
              : 'scale(1.15)',
            transition: 'transform 0.3s ease-out, opacity 1s ease-in-out'
          }}
        >
          <img 
            src={slide.src} 
            alt={slide.title} 
            className="hidden sm:block w-full h-full object-cover object-right opacity-40 sm:opacity-55 filter brightness-[0.7] saturate-[1.1] contrast-[1.05]"
          />
          <img 
            src={slide.mobileSrc || slide.src} 
            alt={slide.title} 
            className="block sm:hidden w-full h-full object-cover object-center opacity-40 filter brightness-[0.7] saturate-[1.1] contrast-[1.05]"
          />
        </div>
      ))}

      {/* Luxury Color Vignettes & Gradient Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#110722] via-[#110722]/85 to-transparent w-full md:w-[75%]" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#110722] via-transparent to-transparent h-[30%] bottom-0" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_right,_rgba(238,191,99,0.12)_0%,_transparent_75%)] mix-blend-screen pointer-events-none" />

      {/* Floating Sparkles & Gold Particles */}
      <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => {
          const pseudoRandom1 = (Math.abs(Math.sin(i * 12.34)) * 3 + 1).toFixed(2);
          const pseudoRandom2 = (Math.abs(Math.cos(i * 43.21)) * 100).toFixed(2);
          const pseudoRandom3 = (Math.abs(Math.sin(i * 87.65)) * 100).toFixed(2);
          const pseudoRandom4 = (Math.abs(Math.cos(i * 34.56)) * 4 + 4).toFixed(2);
          const pseudoRandom5 = (Math.abs(Math.sin(i * 56.78)) * 3).toFixed(2);
          const pseudoRandom6 = (Math.abs(Math.cos(i * 98.76)) * 0.4 + 0.1).toFixed(2);
          
          return (
            <div 
              key={i}
              className="absolute rounded-full bg-[#eebf63] blur-[0.5px] animate-float"
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
        <div className="max-w-2xl pt-12 text-left">
          
          {/* Animated Hero Header/Title Block */}
          <div className="relative min-h-[260px] sm:min-h-[300px] md:min-h-[340px] w-full">
            {activeSlides.map((slide, idx) => (
              <div 
                key={idx}
                className={`absolute inset-0 transition-all duration-1000 transform ${
                  idx === currentSlide ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                }`}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-[#eebf63]/30 rounded-full mb-5 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#eebf63] animate-pulse"></span>
                  <span className="text-[9px] tracking-[0.25em] font-bold text-[#eebf63] uppercase">{slide.luxury_tag || "Luxury Campaign"}</span>
                </div>

                <h2 className="text-[clamp(1.85rem,7.5vw,4rem)] font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#fce2a6] via-[#eebf63] to-[#d4a54c] font-medium leading-[1.1] mb-4 sm:mb-5 drop-shadow-[0_0_15px_rgba(238,191,99,0.25)] select-none">
                  <span className="block">{slide.title}</span>
                  <span className="text-white drop-shadow-md block mt-1">{slide.subtitle}</span>
                </h2>
                
                <p className="text-gray-300 text-xs sm:text-sm md:text-base font-light max-w-[90vw] sm:max-w-lg leading-relaxed tracking-wide mb-8">
                  {slide.desc}
                </p>

                {slide.cta_text && (
                  <a href={slide.cta_url || '/collection'} className="inline-flex items-center justify-center px-8 py-3 bg-transparent border border-[#eebf63] text-[#eebf63] hover:bg-[#eebf63] hover:text-[#110722] rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-300 shadow-[0_0_15px_rgba(238,191,99,0.15)]">
                    {slide.cta_text}
                  </a>
                )}
              </div>
            ))}
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 text-white mt-12 border-t border-white/10 pt-8 w-full max-w-lg">
            <div className="flex items-center gap-3.5 group/badge">
              <div className="p-2.5 rounded-full bg-white/5 border border-[#eebf63]/35 group-hover/badge:bg-[#eebf63]/15 transition-colors duration-300">
                <ShieldCheck className="w-5 h-5 text-[#eebf63] stroke-[1.5]" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-semibold leading-tight text-gray-300">100% Certified<br/>Jewellery</span>
            </div>
            <div className="flex items-center gap-3.5 group/badge">
              <div className="p-2.5 rounded-full bg-white/5 border border-[#eebf63]/35 group-hover/badge:bg-[#eebf63]/15 transition-colors duration-300">
                <Gem className="w-5 h-5 text-[#eebf63] stroke-[1.5]" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-semibold leading-tight text-gray-300">IGI Graded<br/>Diamonds</span>
            </div>
            <div className="flex items-center gap-3.5 group/badge">
              <div className="p-2.5 rounded-full bg-white/5 border border-[#eebf63]/35 group-hover/badge:bg-[#eebf63]/15 transition-colors duration-300">
                <RefreshCw className="w-5 h-5 text-[#eebf63] stroke-[1.5]" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-semibold leading-tight text-gray-300">Lifetime<br/>Exchange</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Editorial Slide Navigation Control Bar */}
      <div className="absolute left-4 right-4 bottom-6 md:left-auto md:right-8 md:bottom-12 z-30 flex items-center justify-between md:justify-end gap-5 bg-[#110722]/60 backdrop-blur-md md:bg-transparent p-2.5 md:p-0 rounded-full border border-white/10 md:border-none">
        {/* Animated Pagination Dots */}
        <div className="flex gap-2 ml-4">
          {activeSlides.map((_, idx) => (
            <div 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 cursor-pointer transition-all duration-500 rounded-full ${
                idx === currentSlide ? 'w-10 bg-[#eebf63] shadow-[0_0_8px_#eebf63]' : 'w-3 bg-white/30 hover:bg-white/60'
              }`}
            ></div>
          ))}
        </div>
        
        {/* Left/Right Navigation Arrows */}
        <div className="flex gap-2">
          <button onClick={prevSlide} className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 hover:border-[#eebf63] active:scale-95 transition-all duration-300">
            <ChevronLeft className="w-4.5 h-4.5" />
          </button>
          <button onClick={nextSlide} className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 hover:border-[#eebf63] active:scale-95 transition-all duration-300">
            <ChevronRight className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
