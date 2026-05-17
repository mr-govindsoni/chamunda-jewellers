"use client";
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import WhatsAppEnquiryButton from '@/components/ui/WhatsAppEnquiryButton';
import { Heart, Share2, Shield, Gem, Star, ArrowLeft, RefreshCw, ZoomIn } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage({ params }) {
  const products = [
    { 
      id: 1, 
      name: "22K Antique Gold Choker", 
      code: "CJ-G101", 
      category: "Gold Jewellery", 
      image: "https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?q=80&w=1200&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop"
      ],
      desc: "An exquisite antique gold choker necklace meticulously handcrafted by our master artisans in Rajasthan. Embellished with traditional royal motifs, delicate filigree wirework, and a luxurious matte gold finish. This regal piece is designed for the modern bride who treasures timeless heritage.",
      specs: {
        "Metal Type": "22K Yellow Gold",
        "Purity": "91.6% BIS Hallmarked",
        "Approx. Weight": "48.50 grams",
        "Dimension / Size": "Adjustable Thread",
        "Artistry Type": "Antique / Nakshi Work",
        "Origin": "Charwas, Rajasthan"
      }
    },
    { 
      id: 2, 
      name: "Diamond Solitaire Ring", 
      code: "CJ-D202", 
      category: "Diamond Jewellery", 
      image: "https://images.unsplash.com/photo-1605100804763-247f66126e28?q=80&w=1200&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1605100804763-247f66126e28?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop"
      ],
      desc: "A breathtaking statement of pure love and commitment. This signature solitaire engagement ring features a brilliant round-cut diamond, mounted on an elegant 18K white gold band. Evaluated and certified by internationally renowned GIA gemologists to guarantee top-tier clarity and fire.",
      specs: {
        "Metal Type": "18K White Gold",
        "Purity": "75.0% Hallmarked Gold",
        "Diamond Clarity": "VVS1 / VVS2",
        "Diamond Color": "E - F (Colorless)",
        "Carat Weight": "1.25 Carats",
        "Certification": "GIA & IGI Certified"
      }
    },
    { 
      id: 3, 
      name: "Temple Jewellery Set", 
      code: "CJ-G103", 
      category: "Gold Jewellery", 
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?q=80&w=1200&auto=format&fit=crop"
      ],
      desc: "Imbued with divine elegance, this royal Temple Jewellery set depicts traditional deities inside beautifully detailed sanctum arches. Perfect for brides who desire an authentic heritage aesthetic with maximum luxury impact.",
      specs: {
        "Metal Type": "22K Gold plating on Silver",
        "Purity": "925 Sterling Silver base",
        "Gemstones": "Natural Ruby & Emeralds",
        "Approx. Weight": "65.20 grams",
        "Collection": "Rajputana Royal Heritage",
        "Set Includes": "Necklace & Pair of Earrings"
      }
    },
    { 
      id: 4, 
      name: "Traditional Gold Bangles", 
      code: "CJ-G104", 
      category: "Gold Jewellery", 
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop"
      ],
      desc: "Complete your traditional attire with this set of two intricately structured bangles, detailed with gold bead clusters and red gemstones. Fitted with an elegant safety lock clasp to ensure safety without compromising aesthetics.",
      specs: {
        "Metal Type": "22K Yellow Gold",
        "Purity": "91.6% BIS Hallmarked",
        "Approx. Weight": "32.40 grams",
        "Bangle Size": "2.4, 2.6, 2.8 available",
        "Finish": "High polish & antique mix"
      }
    },
    { 
      id: 5, 
      name: "Kundan Polki Necklace", 
      code: "CJ-G105", 
      category: "Gold Jewellery", 
      image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1200&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1605100804763-247f66126e28?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1620608759551-7f9e160e1d16?q=80&w=1200&auto=format&fit=crop"
      ],
      desc: "A breathtaking marriage of traditional Kundan setting and uncut Polki diamonds. Flawlessly complemented with hanging natural pearls and a custom silk adjustable cord.",
      specs: {
        "Metal Type": "22K Gold Foil Setting",
        "Purity": "22K Gold Core",
        "Stone Type": "Uncut Polki Diamonds & Pearls",
        "Carat Info": "12.5 Carats Polki",
        "Origin": "Jaipur Craft Guild"
      }
    },
    { 
      id: 6, 
      name: "Pure Silver Pooja Thali", 
      code: "CJ-S306", 
      category: "Silver Articles", 
      image: "https://images.unsplash.com/photo-1620608759551-7f9e160e1d16?q=80&w=1200&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1620608759551-7f9e160e1d16?q=80&w=1200&auto=format&fit=crop"
      ],
      desc: "A premium pure silver puja platter complete with accessories. Meticulously embossed with divine patterns, it is ideal for auspicious beginnings and luxury gifting.",
      specs: {
        "Metal Type": "92.5% Sterling Silver",
        "Purity": "925 Certified Silver",
        "Approx. Weight": "240.00 grams",
        "Platter Size": "10 inches diameter",
        "Gift Packaging": "Royal Velvet Box Included"
      }
    },
    { 
      id: 7, 
      name: "24K Gold Coin (10g)", 
      code: "CJ-B407", 
      category: "Bullion", 
      image: "https://images.unsplash.com/photo-1610660600122-bd885de5eaaf?q=80&w=1200&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1610660600122-bd885de5eaaf?q=80&w=1200&auto=format&fit=crop"
      ],
      desc: "Invest in trust. This 24K 99.9% pure gold bullion coin is embossed with the official Chamunda Jewellers hallmark and comes sealed in tamper-proof premium card packaging.",
      specs: {
        "Metal Type": "24K Fine Gold",
        "Purity": "99.9% Pure Gold",
        "Weight": "10.00 grams",
        "Packaging": "Tamper-proof Assay Card",
        "Taxation": "3% GST Applicable"
      }
    },
    { 
      id: 8, 
      name: "Diamond Drop Earrings", 
      code: "CJ-D208", 
      category: "Diamond Jewellery", 
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop"
      ],
      desc: "Delicate and glamorous drop earrings studded with brilliant round diamonds. Designed to catch light from every angle, these drops provide unparalleled sparkle.",
      specs: {
        "Metal Type": "18K Rose Gold",
        "Purity": "75.0% Hallmarked",
        "Diamond Cut": "Excellent Round Brilliant",
        "Diamond Clarity": "VVS2 / VS1",
        "Setting Type": "Micro Prong Setting"
      }
    }
  ];

  // Safely find product by ID, fallback to first product if not found
  const productId = parseInt(params?.id) || 1;
  const product = products.find(p => p.id === productId) || products[0];

  const [activeImage, setActiveImage] = useState(product.images ? product.images[0] : product.image);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none', backgroundPosition: '0% 0%' });

  // Custom Zoom on hover function
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${activeImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '250%'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this gorgeous ${product.name} at Chamunda Jewellers!`,
        url: window.location.href,
      }).catch(err => console.log(err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Product link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1f163b]">
      <Header />

      {/* Breadcrumbs */}
      <div className="bg-[#fafafa] border-b border-gray-100 py-3">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-[11px] text-gray-500 uppercase tracking-widest font-medium">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#d4a54c]">Home</Link> 
            <span className="text-gray-300">/</span> 
            <Link href="/collection" className="hover:text-[#d4a54c]">Collection</Link> 
            <span className="text-gray-300">/</span> 
            <span className="text-[#d4a54c]">{product.name}</span>
          </div>
          <Link href="/collection" className="flex items-center gap-1.5 hover:text-[#d4a54c] font-bold">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Collection
          </Link>
        </div>
      </div>

      {/* Main Content Grid */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Images Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <div 
              className="relative aspect-[4/5] bg-[#fafafa] rounded-2xl overflow-hidden border border-gray-100 shadow-sm cursor-zoom-in group"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-cover transition-opacity duration-350"
              />
              
              {/* Detailed Zoom Overlay */}
              <div 
                className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 bg-no-repeat"
                style={zoomStyle}
              ></div>

              <div className="absolute bottom-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full shadow-sm text-gray-500 group-hover:scale-110 transition-transform pointer-events-none">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>

            {/* Thumbnail Selection */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-24 aspect-[4/5] rounded-xl overflow-hidden border-2 bg-[#fafafa] transition-all duration-300 ${
                      activeImage === img ? 'border-[#eebf63] shadow-md scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Details & CTAs */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-[#d4a54c] tracking-[0.2em] font-bold uppercase">{product.category}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                <span className="text-[11px] text-gray-500 tracking-wider font-bold">{product.code}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-serif font-medium tracking-wide mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 text-xs mt-3">
                <div className="flex text-[#eebf63]">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-gray-400 font-medium tracking-wide">Handcrafted Couture</span>
              </div>
            </div>

            {/* Premium Divider */}
            <div className="h-px bg-gray-100 w-full"></div>

            {/* Luxury WhatsApp Enquiry System */}
            <div className="bg-[#fdfaf3] border border-[#eebf63]/30 rounded-2xl p-6 md:p-8 space-y-6">
              <div>
                <h3 className="text-[#d4a54c] font-serif text-lg font-medium mb-1">Pricing & Order Enquiries</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-light">
                  This is a luxury bespoke item. To preserve our brand exclusivity and ensure accurate real-time gold/silver valuation, pricing is shared personally.
                </p>
              </div>

              {/* WhatsApp Enquiry Button */}
              <WhatsAppEnquiryButton 
                productName={product.name}
                category={product.category}
                productCode={product.code}
                imageLink={product.image}
                className="w-full py-4 text-sm"
              />

              <div className="flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-green-600" /> Secure Encryption
                </span>
                <span className="flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-[#d4a54c]" /> Real-time Valuation
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#1f163b]">Description</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                {product.desc}
              </p>
            </div>

            {/* Technical Specifications */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#1f163b]">Specifications</h3>
              <div className="bg-[#fafafa] rounded-2xl border border-gray-100 p-6 divide-y divide-gray-100">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-3 text-xs">
                    <span className="text-gray-400 font-medium">{key}</span>
                    <span className="text-[#1f163b] font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4">
              <button className="flex-1 py-3.5 border border-gray-200 hover:border-[#1f163b] text-[#1f163b] rounded-xl text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2">
                <Heart className="w-4 h-4" /> ADD TO WISHLIST
              </button>
              <button 
                onClick={handleShare}
                className="p-3.5 border border-gray-200 hover:border-[#1f163b] text-[#1f163b] rounded-xl transition-colors"
              >
                <Share2 className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="text-center p-3 bg-[#fafafa] rounded-xl">
                <Shield className="w-5 h-5 text-[#d4a54c] mx-auto mb-1.5" />
                <p className="text-[9px] uppercase tracking-wider font-bold text-[#1f163b]">100% Certified</p>
              </div>
              <div className="text-center p-3 bg-[#fafafa] rounded-xl">
                <Gem className="w-5 h-5 text-[#d4a54c] mx-auto mb-1.5" />
                <p className="text-[9px] uppercase tracking-wider font-bold text-[#1f163b]">GIA/IGI Graded</p>
              </div>
              <div className="text-center p-3 bg-[#fafafa] rounded-xl">
                <RefreshCw className="w-5 h-5 text-[#d4a54c] mx-auto mb-1.5" />
                <p className="text-[9px] uppercase tracking-wider font-bold text-[#1f163b]">Easy Exchange</p>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
