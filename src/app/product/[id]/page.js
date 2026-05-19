"use client";
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import WhatsAppEnquiryButton from '@/components/ui/WhatsAppEnquiryButton';
import { Heart, Share2, Shield, Gem, Star, ArrowLeft, RefreshCw, ZoomIn, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function ProductDetailPage({ params }) {
  const { addToCart, PRODUCTS } = useCart();

  // Safely find product by ID, fallback to first product if not found
  const resolvedParams = React.use(params);
  const productId = parseInt(resolvedParams?.id) || 1;
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

  const initialImage = product?.images?.[0] || product?.image || "https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?q=80&w=1200&auto=format&fit=crop";
  const [activeImage, setActiveImage] = useState(initialImage);
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
        text: `Check out this gorgeous ${product.name} at Argun Jewellers!`,
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
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 pb-28 sm:pb-20">
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
                {product?.specs ? Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-3 text-xs">
                    <span className="text-gray-400 font-medium">{key}</span>
                    <span className="text-[#1f163b] font-semibold">{val}</span>
                  </div>
                )) : (
                  <div className="py-3 text-xs text-gray-500">Bespoke specifications available upon inquiry.</div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => addToCart(product)}
                className="flex-1 py-4 bg-[#1f163b] hover:bg-[#d4a54c] text-white hover:text-[#110722] rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-[0_4px_15px_rgba(212,165,76,0.3)]"
              >
                <ShoppingBag className="w-4 h-4" /> ADD TO ROYAL SELECTION
              </button>
              <div className="flex gap-4">
                <button className="py-4 px-6 border border-gray-200 hover:border-[#1f163b] text-[#1f163b] rounded-xl text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4" /> WISHLIST
                </button>
                <button 
                  onClick={handleShare}
                  className="p-4 border border-gray-200 hover:border-[#1f163b] text-[#1f163b] rounded-xl transition-colors"
                >
                  <Share2 className="w-4.5 h-4.5" />
                </button>
              </div>
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

      {/* Sticky Mobile Enquire Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-gray-100 z-50 sm:hidden">
        <a 
          href={`https://wa.me/916367246095?text=Hello%20Argun%20Jewellers,%20I%20am%20interested%20in%20product%20${product.code}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2.5 shadow-lg transition-colors"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.01-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          Enquire on WhatsApp
        </a>
      </div>

      <Footer />
      <div className="hidden sm:block">
        <WhatsAppButton />
      </div>
    </div>
  );
}
