"use client";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import WhatsAppEnquiryButton from '@/components/ui/WhatsAppEnquiryButton';
import { SlidersHorizontal, ChevronDown, Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CollectionPage() {
  const { addToCart } = useCart();
  const products = [
    { id: 1, name: "22K Antique Gold Choker", code: "CJ-G101", category: "Gold Jewellery", image: "https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?q=80&w=600&auto=format&fit=crop" },
    { id: 2, name: "Diamond Solitaire Ring", code: "CJ-D202", category: "Diamond Jewellery", image: "https://images.unsplash.com/photo-1605100804763-247f66126e28?q=80&w=600&auto=format&fit=crop" },
    { id: 3, name: "Temple Jewellery Set", code: "CJ-G103", category: "Gold Jewellery", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop" },
    { id: 4, name: "Traditional Gold Bangles", code: "CJ-G104", category: "Gold Jewellery", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop" },
    { id: 5, name: "Kundan Polki Necklace", code: "CJ-G105", category: "Gold Jewellery", image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600&auto=format&fit=crop" },
    { id: 6, name: "Pure Silver Pooja Thali", code: "CJ-S306", category: "Silver Articles", image: "https://images.unsplash.com/photo-1620608759551-7f9e160e1d16?q=80&w=600&auto=format&fit=crop" },
    { id: 7, name: "24K Gold Coin (10g)", code: "CJ-B407", category: "Bullion", image: "https://images.unsplash.com/photo-1610660600122-bd885de5eaaf?q=80&w=600&auto=format&fit=crop" },
    { id: 8, name: "Diamond Drop Earrings", code: "CJ-D208", category: "Diamond Jewellery", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop" }
  ];

  return (
    <main className="min-h-screen bg-white font-sans">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-[#fafafa] border-b border-gray-100 py-2.5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] text-gray-500 uppercase tracking-widest font-medium">
            Home <span className="mx-2 text-gray-300">/</span> <span className="text-[#d4a54c]">Exclusive Collection</span>
          </p>
        </div>
      </div>

      {/* Page Header (Filters, Title, Sort) */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <button className="hidden md:flex items-center gap-2 px-6 py-3 bg-[#fdfaf3] border border-[#eebf63]/30 text-[#1f163b] text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-[#eebf63]/10 transition-colors">
            <SlidersHorizontal className="w-4 h-4 text-[#d4a54c]" />
            All Filters
          </button>
          
          <div className="text-center flex-1">
            <h1 className="text-3xl md:text-5xl font-serif text-[#1f163b] font-medium tracking-wide leading-tight">
              Royal Bridal Designs <br/>
              <span className="text-[#d4a54c] text-2xl md:text-3xl font-sans font-normal block mt-2">Buy 22K Gold & Diamond Jewellery Online</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <button className="md:hidden flex items-center gap-2 px-6 py-3 bg-[#fdfaf3] border border-[#eebf63]/30 text-[#1f163b] text-sm font-bold uppercase tracking-wider rounded-lg">
              <SlidersHorizontal className="w-4 h-4 text-[#d4a54c]" />
              Filters
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-[#fdfaf3] border border-[#eebf63]/30 text-[#1f163b] text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-[#eebf63]/10 transition-colors">
              Sort By: Latest
              <ChevronDown className="w-4 h-4 text-[#d4a54c]" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col h-full bg-[#fafafa]/50 border border-gray-100 rounded-2xl p-4 hover:bg-white hover:border-[#eebf63]/35 hover:shadow-[0_15px_40px_rgba(31,22,59,0.08)] transition-all duration-500">
              
              {/* Product Image Card */}
              <div className="relative aspect-[4/5] bg-white rounded-xl overflow-hidden mb-5 border border-gray-50/50 shadow-inner">
                <Link href={`/product/${product.id}`} className="block w-full h-full">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </Link>
                
                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 w-9 h-9 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-colors z-10 shadow-sm">
                  <Heart className="w-4 h-4" />
                </button>

                {/* Code badge */}
                <div className="absolute bottom-4 left-4 px-2.5 py-1 bg-[#1f163b]/70 backdrop-blur rounded text-[10px] text-white tracking-widest uppercase font-bold">
                  {product.code}
                </div>
              </div>

              {/* Product Details */}
              <div className="text-center px-2 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-[10px] text-[#d4a54c] tracking-[0.2em] font-bold uppercase block mb-1">{product.category}</span>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-serif text-[#1f163b] text-lg font-medium group-hover:text-[#d4a54c] transition-colors leading-snug mb-4">{product.name}</h3>
                  </Link>
                </div>
                
                {/* Action Buttons */}
                <div className="mt-auto pt-2 flex items-center gap-2">
                  <WhatsAppEnquiryButton 
                    productName={product.name}
                    category={product.category}
                    productCode={product.code}
                    imageLink={product.image}
                    className="flex-1"
                  />
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-10 h-10 rounded-full border border-gray-200 hover:border-[#eebf63] text-gray-400 hover:text-[#110722] hover:bg-[#eebf63] flex items-center justify-center transition-all duration-300 active:scale-90 flex-shrink-0"
                    title="Add to Royal Selection"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Load More */}
        <div className="mt-16 flex justify-center">
          <button className="px-10 py-4 border-2 border-[#1f163b] text-[#1f163b] font-bold text-sm tracking-widest uppercase hover:bg-[#1f163b] hover:text-[#eebf63] transition-all duration-300 rounded-full shadow-[0_4px_14px_0_rgba(31,22,59,0.1)]">
            Load More Products
          </button>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
