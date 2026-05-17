import Link from 'next/link';
import LiveRatesTicker from './LiveRatesTicker';
import { Menu, Search, ShoppingBag, User, ChevronDown, ChevronRight } from 'lucide-react';

export default function Header() {
  const categories = {
    'Gold Jewellery': {
      links: ['Rings', 'Chains', 'Necklaces', 'Temple Jewellery', 'Bridal Jewellery', 'Mangalsutra', 'Daily Wear', 'Earrings', 'Pendants', 'Bangles', 'Bracelets'],
      trending: ['Antiquity Collection', 'Rajwada Bridal Set', 'Everyday Elegance Chains'],
      banner: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop'
    },
    'Diamond Jewellery': {
      links: ['Engagement Rings', 'Diamond Necklaces', 'Solitaire Studs', 'Tennis Bracelets', 'Bridal Sets'],
      trending: ['Luminance Collection', 'Classic Solitaires', 'Eternity Bands'],
      banner: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop'
    },
    'Silver Articles': {
      links: ['Silver Coins', 'Pooja Thali Sets', 'Silver Idols', 'Corporate Gifts', 'Silver Utensils'],
      trending: ['Heritage Silver Artifacts', 'Pure Silver Diya Sets'],
      banner: 'https://images.unsplash.com/photo-1620608759551-7f9e160e1d16?q=80&w=800&auto=format&fit=crop'
    },
    'Bullion (Coins/Bars)': {
      links: ['24K Gold Coins', '24K Gold Bars', 'Silver Coins', 'Silver Bars', 'Digital Gold'],
      trending: ['10g 24K Bismillah Gold Coin', '50g Pure Silver Lakshmi Coin'],
      banner: 'https://images.unsplash.com/photo-1610660600122-bd885de5eaaf?q=80&w=800&auto=format&fit=crop'
    },
    'Gifts': {
      links: ['Anniversary Gifts', 'Wedding Gifts', 'Gifts for Her', 'Gifts for Him', 'Corporate Gifting'],
      trending: ['Personalized Pendants', 'Gold Gift Cards'],
      banner: 'https://images.unsplash.com/photo-1605100804763-247f66126e28?q=80&w=800&auto=format&fit=crop'
    }
  };

  return (
    <header className="w-full sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-[0_2px_20px_-5px_rgba(0,0,0,0.1)] font-sans border-b border-[#eebf63]/30">
      <LiveRatesTicker />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center py-4 md:py-5">
          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            <button className="text-[#1f163b] p-2 hover:bg-[#1f163b]/5 rounded-lg transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#3a225e] transform rotate-45 flex items-center justify-center border-[1.5px] border-[#d4a54c] group-hover:bg-[#1f163b] transition-colors duration-500 shadow-[0_0_15px_rgba(212,165,76,0.3)] group-hover:shadow-[0_0_20px_rgba(212,165,76,0.6)]">
                <div className="w-7 h-7 border-[1.5px] border-[#d4a54c] flex items-center justify-center">
                  <div className="w-3 h-3 bg-[#d4a54c] rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                </div>
              </div>
              <div className="text-center flex flex-col items-center">
                <h1 className="text-xl md:text-2xl font-serif text-[#1f163b] font-medium tracking-[0.15em] uppercase leading-none">
                  Chamunda
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-8 h-[1px] bg-[#d4a54c] group-hover:w-10 transition-all duration-500"></div>
                  <p className="text-[0.6rem] md:text-[10px] text-[#d4a54c] uppercase tracking-[0.25em] font-medium leading-none">
                    Jewellers
                  </p>
                  <div className="w-8 h-[1px] bg-[#d4a54c] group-hover:w-10 transition-all duration-500"></div>
                </div>
                <p className="text-[8px] text-gray-500 uppercase tracking-widest mt-1">
                  Charwas, Churu, Rajasthan
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Nav - Mega Menu Trigger Area */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 h-full">
            <Link href="/" className="text-[13px] font-bold tracking-wide text-[#1f163b] hover:text-[#d4a54c] transition-colors duration-300 uppercase">
              Home
            </Link>
            
            {Object.entries(categories).map(([categoryName, data]) => (
              <div key={categoryName} className="relative group flex items-center h-20 -my-4 cursor-pointer">
                <div className="flex items-center gap-1 text-[13px] font-bold tracking-wide text-[#1f163b] group-hover:text-[#d4a54c] transition-colors duration-300 uppercase">
                  {categoryName}
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#d4a54c] group-hover:rotate-180 transition-transform duration-300" />
                </div>

                {/* The Mega Menu Dropdown */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] bg-white/95 backdrop-blur-xl border border-[#eebf63]/30 shadow-[0_20px_50px_-12px_rgba(31,22,59,0.15)] opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out z-50 rounded-b-2xl overflow-hidden pointer-events-none group-hover:pointer-events-auto">
                  
                  {/* Decorative Top Border */}
                  <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#d4a54c] to-transparent opacity-50"></div>

                  <div className="flex p-8">
                    {/* Left: Category Links */}
                    <div className="w-1/3 pr-6 border-r border-gray-100">
                      <h3 className="font-serif text-lg text-[#1f163b] mb-4 flex items-center gap-2">
                        <span className="w-1 h-4 bg-[#eebf63] block"></span>
                        Shop by Category
                      </h3>
                      <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
                        {data.links.map(link => (
                          <li key={link}>
                            <Link href={link.toLowerCase() === 'necklaces' ? "/collection/necklaces" : link.toLowerCase() === 'rings' ? "/collection/rings" : "/collection"} className="text-sm text-gray-600 hover:text-[#d4a54c] hover:translate-x-1 transition-all duration-300 flex items-center group/link">
                              <span className="w-0 overflow-hidden group-hover/link:w-3 transition-all duration-300"><ChevronRight className="w-3 h-3 text-[#d4a54c]" /></span>
                              {link}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Center: Trending / Featured */}
                    <div className="w-1/3 px-6 border-r border-gray-100">
                      <h3 className="font-serif text-lg text-[#1f163b] mb-4 flex items-center gap-2">
                        <span className="w-1 h-4 bg-[#eebf63] block"></span>
                        Trending Collections
                      </h3>
                      <ul className="space-y-4">
                        {data.trending.map(trend => (
                          <li key={trend}>
                            <Link href="/collection" className="group/trend block p-3 rounded-lg hover:bg-[#fafafa] border border-transparent hover:border-[#eebf63]/20 transition-all duration-300">
                              <span className="text-sm font-medium text-gray-800 group-hover/trend:text-[#d4a54c] transition-colors">{trend}</span>
                              <p className="text-xs text-gray-400 mt-1">Explore the new arrivals</p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: Premium Banner */}
                    <div className="w-1/3 pl-6">
                      <Link href="/collection" className="relative h-full min-h-[200px] rounded-xl overflow-hidden group/banner block shadow-inner">
                        <div className="absolute inset-0 bg-[#1f163b]/20 group-hover/banner:bg-transparent transition-colors duration-500 z-10"></div>
                        <img 
                          src={data.banner} 
                          alt={`${categoryName} Promo`} 
                          className="w-full h-full object-cover transform group-hover/banner:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1f163b] to-transparent z-20 translate-y-2 group-hover/banner:translate-y-0 transition-transform duration-500">
                          <p className="text-white font-serif text-sm">Discover</p>
                          <p className="text-[#eebf63] font-bold text-lg leading-tight">{categoryName}</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <Link href="/live-rates" className="text-[13px] font-bold tracking-wide text-red-600 hover:text-red-700 transition-colors duration-300 uppercase relative flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              LIVE RATES
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <button className="text-gray-700 hover:text-[#d4a54c] hover:-translate-y-0.5 transition-all duration-300">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-gray-700 hover:text-[#d4a54c] hover:-translate-y-0.5 transition-all duration-300 hidden sm:block">
              <User className="w-5 h-5" />
            </button>
            <button className="text-gray-700 hover:text-[#d4a54c] hover:-translate-y-0.5 transition-all duration-300 relative group">
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="absolute -top-1.5 -right-2 bg-[#1f163b] text-[#eebf63] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg border border-[#eebf63]/50">0</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
