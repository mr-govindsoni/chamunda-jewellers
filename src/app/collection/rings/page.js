"use client";
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { 
  X, 
  Share2, 
  ShieldCheck, 
  RefreshCw, 
  ZoomIn,
  MessageSquareCode,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function RingsPage() {
  const { addToCart } = useCart();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState('');
  const [zoomStyle, setZoomStyle] = useState({ display: 'none', backgroundPosition: '0% 0%' });
  const [copied, setCopied] = useState(false);

  const filters = [
    'All',
    'Antique Rings',
    'Diamond Rings',
    'Polki Rings',
    'Bridal Rings',
    'Daily Wear',
    'Temple Rings',
    'Modern Rings'
  ];

  const products = [
    { 
      id: 1, 
      name: "Mayur Antique Teardrop Ring", 
      code: "CJ-RG-001", 
      categories: ["Antique Rings", "Temple Rings"],
      image: "/images/rings/ring1.png",
      images: [
        "/images/rings/ring1.png",
        "/images/rings/ring2.png",
        "/images/rings/ring3.png"
      ],
      desc: "A gorgeous teardrop gold ring with incredibly detailed antique gold patterns, representing the legendary Rajputana royal motifs.",
      specs: {
        "Metal Purity": "22K BIS Hallmarked Gold",
        "Artistry": "Rajasthani Nakshi Work",
        "Design": "Teardrop Royal Crest",
        "Origin": "Charwas, Rajasthan"
      }
    },
    { 
      id: 2, 
      name: "Royal Kundan Square Ruby Ring", 
      code: "CJ-RG-002", 
      categories: ["Polki Rings", "Bridal Rings"],
      image: "/images/rings/ring2.png",
      images: [
        "/images/rings/ring2.png",
        "/images/rings/ring1.png",
        "/images/rings/ring7.png"
      ],
      desc: "A bold square-shaped statement gold ring featuring traditional Kundan settings and an exquisite center ruby gemstone.",
      specs: {
        "Metal Purity": "22K Yellow Gold Base",
        "Stones": "Natural Ruby & Polki Kundan",
        "Artistry": "Jaipur Craft Guild Setting",
        "Design": "Imperial Square Signet"
      }
    },
    { 
      id: 3, 
      name: "Vaikuntha Flora Gemstone Ring", 
      code: "CJ-RG-003", 
      categories: ["Temple Rings", "Antique Rings"],
      image: "/images/rings/ring3.png",
      images: [
        "/images/rings/ring3.png",
        "/images/rings/ring6.png",
        "/images/rings/ring9.png"
      ],
      desc: "A gorgeous floral chakra-shaped gold ring adorned with natural red rubies, a green emerald core, and micro-gold beads.",
      specs: {
        "Metal Purity": "22K Hallmarked Gold",
        "Stones": "Ruby & Emerald",
        "Design": "Sri Chakra Floral",
        "Finish": "Antique Matte Gold"
      }
    },
    { 
      id: 4, 
      name: "Sacred Mesh Dome Ring", 
      code: "CJ-RG-004", 
      categories: ["Daily Wear", "Modern Rings"],
      image: "/images/rings/ring4.png",
      images: [
        "/images/rings/ring4.png",
        "/images/rings/ring5.png",
        "/images/rings/ring6.png"
      ],
      desc: "An elegant broad gold dome ring featuring an intricate mesh structure that captures the classic Jaali pattern of Rajasthan palaces.",
      specs: {
        "Metal Purity": "22K Gold Base",
        "Design": "Rajwada Palace Jaali Mesh",
        "Style": "Statement Dome",
        "Finish": "Dual gloss and sand-blast mix"
      }
    },
    { 
      id: 5, 
      name: "Elysian Gold Butterfly Ring", 
      code: "CJ-RG-005", 
      categories: ["Daily Wear", "Modern Rings"],
      image: "/images/rings/ring5.png",
      images: [
        "/images/rings/ring5.png",
        "/images/rings/ring6.png",
        "/images/rings/ring4.png"
      ],
      desc: "A modern minimalist masterpiece. This high-polish gold ring features a solid, perfectly sculpted butterfly motif.",
      specs: {
        "Metal Purity": "22K Yellow Gold",
        "Finish": "High Polish Mirror",
        "Theme": "Modern Nature Couture",
        "Occasion": "Daily Wear Elegance"
      }
    },
    { 
      id: 6, 
      name: "Golden Jasmine Flower Ring", 
      code: "CJ-RG-006", 
      categories: ["Daily Wear", "Modern Rings"],
      image: "/images/rings/ring6.png",
      images: [
        "/images/rings/ring6.png",
        "/images/rings/ring5.png",
        "/images/rings/ring3.png"
      ],
      desc: "A delicate floral ring featuring a beautifully detailed four-leaf jasmine blossom, bordered by micro-roped gold wires.",
      specs: {
        "Metal Purity": "18K/22K Hallmarked Gold",
        "Design": "Jasmine Floret",
        "Finish": "Glossy & Matte blend",
        "Aesthetic": "Lightweight Minimalist"
      }
    },
    { 
      id: 7, 
      name: "Imperial Rajwada Floral Ring", 
      code: "CJ-RG-007", 
      categories: ["Antique Rings", "Bridal Rings"],
      image: "/images/rings/ring7.png",
      images: [
        "/images/rings/ring7.png",
        "/images/rings/ring9.png",
        "/images/rings/ring2.png"
      ],
      desc: "An absolute marvel of traditional goldsmithing. A broad gold statement ring displaying intricate floral vines and gold filigree arches.",
      specs: {
        "Metal Purity": "22K BIS Hallmarked Gold",
        "Artistry": "Filigree & Wirework",
        "Origin": "Charwas Craft Guild",
        "Theme": "Rajwada Bridal"
      }
    },
    { 
      id: 8, 
      name: "Dual-Tone Solitaire Grid Ring", 
      code: "CJ-RG-008", 
      categories: ["Diamond Rings", "Modern Rings"],
      image: "/images/rings/ring8.png",
      images: [
        "/images/rings/ring8.png",
        "/images/rings/ring4.png",
        "/images/rings/ring5.png"
      ],
      desc: "A masculine and commanding statement ring in 18K yellow and white gold dual-tone styling, studded with a grid of brilliant round diamonds.",
      specs: {
        "Metal Purity": "18K Yellow & White Gold",
        "Stones": "Brilliant-Cut Diamonds",
        "Style": "Dual-Tone Signet Ring",
        "Certification": "SGL / IGI Certified"
      }
    },
    { 
      id: 9, 
      name: "Royal Palace Marquise Ring", 
      code: "CJ-RG-009", 
      categories: ["Bridal Rings", "Temple Rings"],
      image: "/images/rings/ring9.png",
      images: [
        "/images/rings/ring9.png",
        "/images/rings/ring7.png",
        "/images/rings/ring3.png"
      ],
      desc: "A lavish diamond-shaped gold statement ring, completely bordered with gold bead clusters and intricate internal lattice carvings.",
      specs: {
        "Metal Purity": "22K BIS 916 Gold",
        "Design": "Marquise Lattice",
        "Aesthetic": "Rajputana Royal Heritage",
        "Artistry": "Open filigree carving"
      }
    }
  ];

  const filteredProducts = selectedFilter === 'All' 
    ? products 
    : products.filter(p => p.categories.includes(selectedFilter));

  const handleWhatsAppEnquiry = (e, product) => {
    e.stopPropagation();
    const phoneNumber = "916367246095";
    const message = `Hello Chamunda Jewellers, I want enquiry about this ring design.\n\nProduct Name: ${product.name}\nProduct Code: ${product.code}\nImage Link: ${window.location.origin}${product.image}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const handleShare = (e, product) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/collection/rings?id=${product.id}`;
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Explore ${product.name} at Chamunda Jewellers`,
        url: shareUrl,
      }).catch(err => console.log(err));
    } else {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Gallery zoom on hover
  const handleZoomMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${activeGalleryImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '250%'
    });
  };

  const handleZoomLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  // Open modal with selected product
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setActiveGalleryImage(product.images ? product.images[0] : product.image);
  };

  return (
    <div className="min-h-screen bg-ivory font-sans text-[#1f163b]">
      <Header />

      {/* Main Banner */}
      <section className="relative py-24 md:py-32 bg-[#1f163b] overflow-hidden text-center">
        {/* Background glow and subtle dots */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(238,191,99,0.12)_0%,_rgba(31,22,59,0)_75%)] z-0 pointer-events-none"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#eebf63 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/5 border border-[#eebf63]/30 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#eebf63] animate-pulse"></span>
            <span className="text-[10px] tracking-[0.25em] font-bold text-[#eebf63] uppercase">Royal Signature Rings</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#fce2a6] via-[#eebf63] to-[#d4a54c] leading-[1.1] font-medium tracking-wide">
            Gold Rings Collection
          </h1>
          <p className="text-gray-300 font-light text-sm sm:text-base tracking-wide max-w-xl mx-auto leading-relaxed">
            Handcrafted with absolute devotion by the royal heritage artisans of Charwas, Rajasthan. 
            Experience pure luxury, timeless purity, and masterfully detailed gold rings.
          </p>
        </div>
      </section>

      {/* Filter Navigation */}
      <section className="sticky top-20 z-30 bg-ivory/90 backdrop-blur-md border-b border-gray-100 py-6">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-350 border ${
                  selectedFilter === filter
                    ? 'bg-[#1f163b] text-[#eebf63] border-[#1f163b] shadow-md'
                    : 'bg-white text-gray-500 border-gray-200/60 hover:border-[#eebf63] hover:text-[#d4a54c]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Catalog */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-32">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <p className="text-gray-400 font-light tracking-widest text-sm uppercase">No Rings Found in This Category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                onClick={() => openProductModal(product)}
                className="group flex flex-col h-full bg-[#fbfaf6] border border-gray-200/50 rounded-2xl p-4 cursor-pointer hover:bg-white hover:border-[#eebf63]/50 hover:shadow-[0_15px_40px_rgba(31,22,59,0.06)] transition-all duration-500 relative animate-float-subtle"
                style={{ animationDelay: `${product.id * 0.25}s` }}
              >
                {/* Product Card Image Container */}
                <div className="relative aspect-[4/5] bg-white rounded-xl overflow-hidden mb-5 border border-gray-100 shadow-inner shine-sweep">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    loading="lazy"
                    className="w-full h-full object-cover filter brightness-[0.98] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Subtle fade-in backdrop overlay on hover */}
                  <div className="absolute inset-0 bg-[#1f163b]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Code badge */}
                  <div className="absolute bottom-4 left-4 px-2.5 py-1 bg-[#1f163b]/70 backdrop-blur rounded text-[9px] text-white tracking-widest uppercase font-bold">
                    {product.code}
                  </div>

                  {/* Quick Enquiry overlay */}
                  <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0 z-20 px-4">
                    <button 
                      onClick={(e) => handleWhatsAppEnquiry(e, product)}
                      className="flex-1 py-2.5 bg-gradient-to-r from-[#f5cf7b] via-[#eebf63] to-[#d4a54c] text-[#110722] text-[10px] tracking-widest uppercase font-bold rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(238,191,99,0.6)] transform active:scale-95 transition-all duration-300 flex items-center justify-center gap-1.5"
                    >
                      <MessageSquareCode className="w-3.5 h-3.5" /> Enquire
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart({ ...product, category: 'Gold Rings' }); }}
                      className="w-10 h-10 rounded-full bg-white hover:bg-[#eebf63] text-gray-700 hover:text-[#110722] flex items-center justify-center transition-all duration-300 shadow-md border border-gray-100 transform active:scale-90 flex-shrink-0"
                      title="Add to Selection"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Product Text Description (ONLY name and code, no prices, rating, or stock tags) */}
                <div className="text-center px-1 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-serif text-[#1f163b] text-base md:text-lg font-medium group-hover:text-[#d4a54c] transition-colors leading-snug mb-1">
                      {product.name}
                    </h3>
                    <p className="text-[10px] text-[#d4a54c] tracking-[0.2em] font-bold uppercase mt-1.5">
                      {product.code}
                    </p>
                  </div>
                  
                  <div className="h-0.5 w-12 bg-[#eebf63]/30 mx-auto mt-4 group-hover:w-20 transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Luxury Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1f163b]/70 backdrop-blur-md transition-opacity duration-300">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#eebf63]/40 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-40 p-2 bg-white/80 hover:bg-[#1f163b] hover:text-[#eebf63] rounded-full text-gray-500 shadow transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left side: Images Gallery inside Modal */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-gray-50 border-r border-gray-100">
              <div 
                className="relative aspect-[4/5] bg-white rounded-2xl overflow-hidden border border-gray-200/60 shadow-sm cursor-zoom-in group mb-4"
                onMouseMove={handleZoomMove}
                onMouseLeave={handleZoomLeave}
              >
                <img 
                  src={activeGalleryImage} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover transition-opacity duration-350"
                />
                
                {/* Hover magnifier lens */}
                <div 
                  className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 bg-no-repeat"
                  style={zoomStyle}
                ></div>

                <div className="absolute bottom-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full shadow-sm text-gray-500 pointer-events-none">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              {/* Thumbnail Selector inside Modal */}
              {selectedProduct.images && selectedProduct.images.length > 1 && (
                <div className="flex gap-3 justify-center">
                  {selectedProduct.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveGalleryImage(img)}
                      className={`relative w-16 aspect-[4/5] rounded-lg overflow-hidden border-2 bg-white transition-all duration-300 ${
                        activeGalleryImage === img ? 'border-[#eebf63] shadow' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right side: Detailed Specs & Enquiry CTAs */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] text-[#d4a54c] tracking-[0.2em] font-bold uppercase">{selectedProduct.categories[0]}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="text-[10px] text-gray-400 font-bold tracking-widest">{selectedProduct.code}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1f163b] font-medium leading-tight tracking-wide">
                    {selectedProduct.name}
                  </h2>
                </div>

                <p className="text-sm text-gray-600 font-light leading-relaxed">
                  {selectedProduct.desc}
                </p>

                {/* Specs Table */}
                <div className="bg-[#fbfaf6] rounded-xl border border-gray-200/60 p-4 space-y-2.5">
                  {Object.entries(selectedProduct.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between text-xs py-1 border-b border-gray-100 last:border-0">
                      <span className="text-gray-400 font-medium">{key}</span>
                      <span className="text-[#1f163b] font-semibold">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sticky bottom bar or fixed CTAs */}
              <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
                <div className="flex gap-3">
                  <button
                    onClick={(e) => handleWhatsAppEnquiry(e, selectedProduct)}
                    className="flex-1 py-4 bg-gradient-to-r from-[#f5cf7b] via-[#eebf63] to-[#d4a54c] hover:shadow-[0_0_25px_rgba(238,191,99,0.6)] text-[#110722] rounded-xl text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <MessageSquareCode className="w-4 h-4" /> ENQUIRE ON WHATSAPP
                  </button>
                  <button 
                    onClick={() => { addToCart({ ...selectedProduct, category: 'Gold Rings' }); setSelectedProduct(null); }}
                    className="py-4 px-6 border border-[#eebf63] text-[#d4a54c] hover:bg-[#eebf63] hover:text-[#110722] rounded-xl text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 flex-shrink-0"
                    title="Add to Royal Selection"
                  >
                    <ShoppingBag className="w-4 h-4" /> SELECT PIECE
                  </button>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={(e) => handleShare(e, selectedProduct)}
                    className="flex-1 py-3 border border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-700 rounded-xl text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" /> {copied ? 'Copied!' : 'Share Product'}
                  </button>
                  
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 rounded-lg text-green-600 text-[10px] font-semibold tracking-wider uppercase">
                    <ShieldCheck className="w-4 h-4" /> Certified Pure
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
