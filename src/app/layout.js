import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from '@/context/CartContext';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: "Argun Jewellers | Ultra-Premium Luxury Jewellery",
  description: "Experience the blend of traditional Rajputana royalty with modern luxury design at Argun Jewellers in Charwas, Churu, Rajasthan.",
  openGraph: {
    title: "Argun Jewellers | Ultra-Premium Luxury Jewellery",
    description: "Discover the finest luxury jewellery collections, live market rates, and authentic Rajputana heritage at Argun Jewellers.",
    url: "https://argunjewellers.com",
    siteName: "Argun Jewellers",
    images: [
      {
        url: "https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Argun Jewellers Luxury Collection",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  "name": "Argun Jewellers",
  "image": "https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?q=80&w=1200&auto=format&fit=crop",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Argun Jewellers, Charwas",
    "addressLocality": "Churu",
    "addressRegion": "Rajasthan",
    "postalCode": "331403",
    "addressCountry": "IN"
  },
  "telephone": "+91-6367246095",
  "priceRange": "$$$"
};

import SmoothScrolling from '@/components/layout/SmoothScrolling';
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {/* JSON-LD for Local Business SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScrolling>
          <AuthProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </AuthProvider>
        </SmoothScrolling>
      </body>
    </html>
  );
}
