"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import LiveRates from '@/components/LiveRates';
import { Menu, X, Search, ShoppingBag, User, ChevronDown, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import SearchOverlay from '@/components/ui/SearchOverlay';
import CartDrawer from '@/components/ui/CartDrawer';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import AuthModal from '@/components/auth/AuthModal';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
  const { setIsSearchOpen, setIsCartOpen, cartCount } = useCart();
  const { user, setIsAuthModalOpen, logout } = useAuth();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > 150 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileCategory = (cat) => {
    setExpandedMobileCategory(expandedMobileCategory === cat ? null : cat);
  };

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
    <motion.header 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="w-full sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-[0_2px_20px_-5px_rgba(0,0,0,0.1)] font-sans border-b border-[#eebf63]/30"
    >
      <LiveRates variant="ticker" />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Mobile Header: Perfect 3-column layout for mathematically centered logo */}
        <div className="grid grid-cols-3 items-center py-3 md:hidden">
          {/* Left Column: Hamburger Menu */}
          <div className="flex justify-start items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-[#1f163b] p-2 hover:bg-[#1f163b]/5 rounded-xl transition-all active:scale-95 flex items-center justify-center"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Center Column: Perfectly Centered Logo */}
          <div className="flex justify-center items-center">
            <Link href="/" className="flex flex-col items-center">
              <h1 className="text-xl font-serif text-[#1f163b] font-medium tracking-[0.12em] uppercase leading-none drop-shadow-sm select-none">
                Chamunda
              </h1>
              <p className="text-[8px] text-[#d4a54c] uppercase tracking-[0.2em] mt-1.5 font-bold leading-none select-none">
                Jewellers
              </p>
            </Link>
          </div>

          {/* Right Column: Premium Search & Bag Icons */}
          <div className="flex justify-end items-center gap-3">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-700 hover:text-[#d4a54c] active:scale-90 transition-transform p-1.5"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <div className="relative">
              {user ? (
                <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="block p-1.5 active:scale-90 transition-transform">
                  <div className="w-6 h-6 rounded-full bg-[#110722] text-[#eebf63] flex items-center justify-center font-serif text-[10px] uppercase shadow-sm">
                    {user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                </Link>
              ) : (
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="text-gray-700 hover:text-[#d4a54c] active:scale-90 transition-transform p-1.5"
                >
                  <User className="w-5 h-5" />
                </button>
              )}
            </div>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-gray-700 hover:text-[#d4a54c] active:scale-90 transition-transform relative p-1.5"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-0.5 right-0.5 bg-[#1f163b] text-[#eebf63] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#eebf63]/50 shadow-sm">{cartCount}</span>
            </button>
          </div>
        </div>

        {/* Desktop Header: Premium Wide Flex Layout */}
        <div className="hidden md:flex justify-between items-center py-4 md:py-5">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
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
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-700 hover:text-[#d4a54c] hover:-translate-y-0.5 transition-all duration-300"
            >
              <Search className="w-5 h-5" />
            </button>
            <div className="relative hidden sm:block">
              {user ? (
                <div 
                  className="relative group"
                  onMouseEnter={() => setIsProfileDropdownOpen(true)}
                  onMouseLeave={() => setIsProfileDropdownOpen(false)}
                >
                  <Link href="/account" className="flex items-center gap-2 text-gray-700 hover:text-[#d4a54c] transition-colors py-2">
                    <div className="w-7 h-7 rounded-full bg-[#110722] text-[#eebf63] flex items-center justify-center font-serif text-sm uppercase shadow-sm">
                      {user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </div>
                  </Link>

                  <AnimatePresence>
                    {isProfileDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-full mt-0 w-48 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden z-50"
                      >
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-800 truncate">{user.full_name || 'Premium Member'}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        <div className="p-2 space-y-1">
                          <Link href="/account" className="block px-3 py-2 text-sm text-gray-600 hover:text-[#d4a54c] hover:bg-gray-50 rounded-lg transition-colors">My Account</Link>
                          <Link href="/account?tab=orders" className="block px-3 py-2 text-sm text-gray-600 hover:text-[#d4a54c] hover:bg-gray-50 rounded-lg transition-colors">Order History</Link>
                          <Link href="/account?tab=wishlist" className="block px-3 py-2 text-sm text-gray-600 hover:text-[#d4a54c] hover:bg-gray-50 rounded-lg transition-colors">Wishlist</Link>
                          <button onClick={logout} className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors">Sign Out</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-gray-700 hover:text-[#d4a54c] hover:-translate-y-0.5 transition-all duration-300 py-2"
                >
                  <User className="w-5 h-5" />
                </button>
              )}
            </div>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-gray-700 hover:text-[#d4a54c] hover:-translate-y-0.5 transition-all duration-300 relative group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="absolute -top-1.5 -right-2 bg-[#1f163b] text-[#eebf63] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg border border-[#eebf63]/50">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Immersive Full-Screen Mobile Menu Drawer */}
      <div 
        className={`fixed inset-0 z-50 md:hidden bg-gradient-to-b from-[#110722] via-[#1a0b2e] to-[#0d041a] backdrop-blur-[18px] text-white flex flex-col transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'
        }`}
        style={{ width: '100vw', height: '100vh', height: '100dvh' }}
      >
        {/* Custom Breathing Keyframes for Premium WhatsApp Enquiry Button */}
        <style jsx global>{`
          @keyframes wa-breath {
            0% { box-shadow: 0 0 10px rgba(37, 211, 102, 0.4); transform: scale(1); }
            50% { box-shadow: 0 0 25px rgba(37, 211, 102, 0.7); transform: scale(1.02); }
            100% { box-shadow: 0 0 10px rgba(37, 211, 102, 0.4); transform: scale(1); }
          }
          .animate-wa-premium-breath {
            animation: wa-breath 3s infinite ease-in-out;
          }
        `}</style>

        {/* Header of Full-Screen Mobile Menu */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          {/* Balanced Left Padding */}
          <div className="w-11"></div>

          {/* Centered Large Luxury Logo */}
          <div className="flex flex-col items-center select-none text-center">
            <h2 className="text-2xl font-serif text-[#eebf63] font-medium tracking-[0.15em] uppercase leading-none">Chamunda</h2>
            <p className="text-[9px] text-gray-400 uppercase tracking-[0.25em] mt-2 font-bold">Jewellers</p>
          </div>

          {/* Right: Circular glass close button with gold icons & hover glow */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-11 h-11 rounded-full bg-white/5 border border-[#eebf63]/25 flex items-center justify-center text-[#eebf63] shadow-lg hover:bg-white/10 active:scale-90 transition-all duration-300"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Links */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-4">
          <Link 
            href="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full flex items-center min-h-[56px] text-lg font-serif font-medium tracking-wide text-white hover:text-[#eebf63] py-3 border-b border-white/10 transition-colors duration-300"
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            Home
          </Link>

          {/* Categories Collapsible */}
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#eebf63] font-bold mt-4 opacity-75">Collections</p>
            
            {Object.entries(categories).map(([categoryName, data]) => {
              const isExpanded = expandedMobileCategory === categoryName;
              return (
                <div key={categoryName} className="border-b border-white/10 pb-1">
                  <button 
                    onClick={() => toggleMobileCategory(categoryName)}
                    className="w-full flex items-center justify-between min-h-[56px] py-3 text-left font-medium text-gray-200 hover:text-[#eebf63] transition-all duration-300"
                  >
                    <span 
                      className="truncate font-serif text-lg tracking-wide select-none" 
                      style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {categoryName}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#eebf63]' : ''}`} />
                  </button>
                  
                  {isExpanded && (
                    <div className="pl-4 mt-2 space-y-1.5 animate-fade-in border-l border-[#eebf63]/20 pb-2">
                      {data.links.map(link => (
                        <Link 
                          key={link}
                          href={link.toLowerCase() === 'necklaces' ? "/collection/necklaces" : link.toLowerCase() === 'rings' ? "/collection/rings" : "/collection"}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="w-full flex items-center min-h-[48px] text-sm text-gray-400 hover:text-[#eebf63] py-2 border-b border-white/5 last:border-0 transition-all duration-300 font-sans tracking-wide truncate"
                          style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                        >
                          {link}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Live Rates Accordion Section */}
          <div className="border-b border-white/10 pb-1">
            <Link 
              href="/live-rates" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-between min-h-[56px] py-3 text-left font-serif text-lg font-medium text-red-500 hover:text-red-400 transition-all duration-300"
            >
              <span 
                className="truncate tracking-wide flex items-center gap-2.5"
                style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
                Live Gold Rates
              </span>
              <ChevronRight className="w-4 h-4 text-red-500/70" />
            </Link>
          </div>

          {/* Visit Boutique Accordion Section */}
          <div className="border-b border-white/10 pb-1">
            <a 
              href="https://maps.app.goo.gl/z2MMsspgUnUhFn6c6"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-between min-h-[56px] py-3 text-left font-serif text-lg font-medium text-gray-200 hover:text-[#eebf63] transition-all duration-300"
            >
              <span 
                className="truncate tracking-wide"
                style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                Visit Boutique
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </a>
          </div>
        </div>

        {/* Footer of Mobile Menu */}
        <div className="px-6 py-6 bg-white/5 border-t border-white/10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#eebf63]">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[9px] text-gray-400 uppercase tracking-wider font-light">Call Boutique</p>
              <p className="text-xs text-white font-medium">+91 63672 46095</p>
            </div>
          </div>

          <a 
            href="https://wa.me/916367246095" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full bg-[#25d366] hover:bg-[#20ba5a] text-white py-4 rounded-[18px] font-bold tracking-widest text-xs uppercase flex justify-center items-center gap-2.5 transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.3)] border border-transparent animate-wa-premium-breath"
          >
            <MessageCircle className="w-4 h-4 fill-white" /> WHATSAPP INQUIRY
          </a>
        </div>
      </div>
      <SearchOverlay />
      <CartDrawer />
      <AuthModal />
    </motion.header>
  );
}
