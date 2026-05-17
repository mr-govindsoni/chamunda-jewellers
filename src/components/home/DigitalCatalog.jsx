import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ShopByCategory() {
  const categories = [
    { title: "Rings", desc: "ETERNITY & SOLITAIRE", image: "/images/rings/ring1.png" },
    { title: "Necklaces", desc: "Bridal & Daily Wear", image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600&auto=format&fit=crop" },
    { title: "Earrings", desc: "Studs & Drops", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop" },
    { title: "Bangles", desc: "Antique & Modern", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop" },
    { title: "Bullion", desc: "24K Coins & Bars", image: "https://images.unsplash.com/photo-1610660600122-bd885de5eaaf?q=80&w=600&auto=format&fit=crop" },
    { title: "Silver Articles", desc: "Pooja & Gifting", image: "https://images.unsplash.com/photo-1620608759551-7f9e160e1d16?q=80&w=600&auto=format&fit=crop" }
  ];

  const getCategoryRoute = (title) => {
    if (title.toLowerCase() === 'necklaces') return '/collection/necklaces';
    if (title.toLowerCase() === 'rings') return '/collection/rings';
    if (title.toLowerCase() === 'bullion') return '/live-rates';
    return '/collection';
  };

  return (
    <section className="py-20 bg-[#fafafa]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-12 h-[1px] bg-[#d4a54c]"></div>
            <Sparkles className="w-4 h-4 text-[#d4a54c]" />
            <div className="w-12 h-[1px] bg-[#d4a54c]"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1f163b] font-medium tracking-wide mb-4">Discover Collections</h2>
          <p className="text-gray-500 font-light max-w-lg tracking-wide">Explore our meticulously crafted jewelry, designed to celebrate the extraordinary moments of your life.</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => {
            const isRings = cat.title === "Rings";
            
            if (isRings) {
              return (
                <Link 
                  key={idx}
                  href={getCategoryRoute(cat.title)}
                  className="relative h-[400px] md:h-[480px] rounded-2xl overflow-hidden group cursor-pointer shadow-[0_10px_35px_rgba(31,22,59,0.08)] hover:shadow-[0_20px_50px_rgba(212,165,76,0.35)] border border-transparent hover:border-[#eebf63]/40 transition-all duration-700 ease-out block shine-sweep animate-float-subtle"
                >
                  {/* Image & Dark Vignette Layering */}
                  <div className="absolute inset-0 bg-[#1f163b] z-0">
                    <img 
                      src={cat.image} 
                      alt={cat.title} 
                      className="w-full h-full object-cover opacity-90 filter brightness-[0.9] saturate-[1.05] transform group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                    />
                  </div>
                  
                  {/* Luxury Overlays: Gradient, Vignette & Gold Spotlight */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1f163b] via-[#1f163b]/35 to-transparent opacity-95 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0)_20%,_rgba(31,22,59,0.5)_100%)] z-10"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(238,191,99,0.15)_0%,_transparent_55%)] z-10 pointer-events-none"></div>
                  
                  {/* Royal Gold Inner Frame */}
                  <div className="absolute inset-4 sm:inset-5 border border-[#eebf63]/10 group-hover:border-[#eebf63]/50 transition-all duration-700 z-20 pointer-events-none rounded-xl"></div>

                  {/* Typography & Interactive Button (Bottom-Left Alignment) */}
                  <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-end items-start z-30">
                    <div className="space-y-1.5 sm:space-y-2">
                      <p className="text-[#eebf63] font-sans font-bold text-[10px] sm:text-xs tracking-[0.25em] uppercase opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                        {cat.desc}
                      </p>
                      <h3 className="text-3xl sm:text-4xl font-serif text-white font-medium tracking-wide mb-3 sm:mb-4">
                        {cat.title}
                      </h3>
                      
                      {/* Premium Underlined Action Button */}
                      <div className="pt-2">
                        <span className="flex items-center gap-1.5 text-white text-xs sm:text-sm font-bold tracking-[0.2em] uppercase pb-1 border-b border-[#eebf63]/30 group-hover:border-[#eebf63] group-hover:text-[#eebf63] transition-all duration-500 inline-flex items-center">
                          <span className="transform group-hover:-translate-y-[2px] transition-transform duration-500 flex items-center gap-1.5">
                            EXPLORE NOW <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-500" />
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }

            return (
              <Link 
                key={idx}
                href={getCategoryRoute(cat.title)}
                className="relative h-[400px] md:h-[480px] rounded-2xl overflow-hidden group cursor-pointer shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-10px_rgba(212,165,76,0.3)] transition-all duration-500 block"
              >
                {/* Image & Overlays */}
                <div className="absolute inset-0 bg-[#1f163b] z-0">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="w-full h-full object-cover opacity-80 mix-blend-screen filter saturate-110 transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f163b] via-[#1f163b]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 z-10"></div>
                
                {/* Animated Gold Border */}
                <div className="absolute inset-4 border border-[#eebf63]/0 group-hover:border-[#eebf63]/50 transition-colors duration-700 z-20 pointer-events-none rounded-xl"></div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-30">
                  <div className="transform translate-y-0 sm:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[#eebf63] font-medium text-sm tracking-widest uppercase mb-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{cat.desc}</p>
                    <h3 className="text-3xl font-serif text-white font-medium tracking-wide mb-6">{cat.title}</h3>
                    
                    {/* Action Button */}
                    <div className="overflow-hidden">
                      <span className="flex items-center gap-2 text-white text-sm font-bold tracking-widest uppercase pb-1 border-b border-[#eebf63] transform translate-y-0 sm:translate-y-[150%] group-hover:translate-y-0 transition-transform duration-500 delay-150 hover:text-[#eebf63] inline-block">
                        Explore Now <ArrowRight className="w-4 h-4 inline-block ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        <div className="mt-16 flex justify-center">
          <button className="px-10 py-4 border border-[#1f163b] text-[#1f163b] font-bold text-sm tracking-widest uppercase hover:bg-[#1f163b] hover:text-[#eebf63] transition-all duration-300 rounded">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
}
