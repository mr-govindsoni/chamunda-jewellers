"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const CartContext = createContext();

const DEFAULT_PRODUCTS = [
  { id: 1, name: "Rajwada Kundan Choker", code: "CJ-G101", category: "Bridal Collection", collection: "Rajputana Royal Heritage", tags: ["choker", "necklace", "gold", "bridal", "Best Seller"], image: "https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?q=80&w=600&auto=format&fit=crop", featured: true },
  { id: 2, name: "Eternity Diamond Ring", code: "CJ-D202", category: "Diamond Collection", collection: "Solitaires", tags: ["ring", "diamond", "engagement", "solitaire", "New Arrival"], image: "https://images.unsplash.com/photo-1605100804763-247f66126e28?q=80&w=600&auto=format&fit=crop", featured: true },
  { id: 3, name: "Temple Heritage Bangles", code: "CJ-G103", category: "Gold 22K", collection: "Rajputana Royal Heritage", tags: ["temple", "set", "necklace", "ruby", "emerald", "Trending"], image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop", featured: true },
  { id: 4, name: "Luminance Solitaire Studs", code: "CJ-G104", category: "Daily Wear", collection: "Daily Wear", tags: ["bangle", "gold", "traditional", "studs"], image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop", featured: true },
  { id: 5, name: "Antique Gold Jhumkas", code: "CJ-G105", category: "Heritage Collection", collection: "Rajputana Royal Heritage", tags: ["polki", "kundan", "necklace", "pearl", "Must Have"], image: "https://images.unsplash.com/photo-1620608759551-7f9e160e1d16?q=80&w=600&auto=format&fit=crop", featured: true },
  { id: 6, name: "Pure Silver Pooja Thali", code: "CJ-S306", category: "Silver Articles", collection: "Pooja Items", tags: ["thali", "silver", "pooja", "plate"], image: "https://images.unsplash.com/photo-1620608759551-7f9e160e1d16?q=80&w=600&auto=format&fit=crop", featured: false },
  { id: 7, name: "24K Gold Coin (10g)", code: "CJ-B407", category: "Bullion", collection: "Coins", tags: ["coin", "gold", "24k", "bullion"], image: "https://images.unsplash.com/photo-1610660600122-bd885de5eaaf?q=80&w=600&auto=format&fit=crop", featured: false },
  { id: 8, name: "Diamond Drop Earrings", code: "CJ-D208", category: "Diamond Jewellery", collection: "Eternity", tags: ["earring", "diamond", "drop", "rose gold"], image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop", featured: false }
];

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [PRODUCTS, setPRODUCTS] = useState(DEFAULT_PRODUCTS);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Load products from Supabase with fallback to DEFAULT_PRODUCTS
  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        setPRODUCTS(data);
        localStorage.setItem('argun_products', JSON.stringify(data));
      } else {
        const local = localStorage.getItem('argun_products');
        if (local) {
          setPRODUCTS(JSON.parse(local));
        } else {
          setPRODUCTS(DEFAULT_PRODUCTS);
          localStorage.setItem('argun_products', JSON.stringify(DEFAULT_PRODUCTS));
        }
      }
    } catch (err) {
      console.error("Supabase not fully configured yet, using default products.", err);
      const local = localStorage.getItem('argun_products');
      if (local) {
        setPRODUCTS(JSON.parse(local));
      } else {
        setPRODUCTS(DEFAULT_PRODUCTS);
        localStorage.setItem('argun_products', JSON.stringify(DEFAULT_PRODUCTS));
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Load cart from LocalStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cj_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error("Failed to parse cart", err);
      }
    }
  }, []);

  // Sync cart to LocalStorage
  const saveCartToStorage = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cj_cart', JSON.stringify(newCart));
  };

  const addToCart = (product, qty = 1) => {
    const existingIndex = cart.findIndex(item => item.id === product.id);
    let newCart = [...cart];
    if (existingIndex > -1) {
      newCart[existingIndex].quantity += qty;
    } else {
      newCart.push({ ...product, quantity: qty });
    }
    saveCartToStorage(newCart);
    setIsCartOpen(true); // Open cart automatically to wow user
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    saveCartToStorage(newCart);
  };

  const updateQuantity = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    const newCart = cart.map(item => 
      item.id === productId ? { ...item, quantity: qty } : item
    );
    saveCartToStorage(newCart);
  };

  const clearCart = () => {
    saveCartToStorage([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Generate WhatsApp inquiry text for all items in the cart
  const getWhatsAppInquiryText = () => {
    let text = "✨ *Argun Jewellers - Royal Order Inquiry* ✨\n\n";
    text += "Hello Argun Jewellers team, I would like to get a quote and details for the following selected luxury pieces:\n\n";
    cart.forEach((item, index) => {
      text += `${index + 1}. *${item.name}* (${item.quantity} units)\n`;
      text += `   - Code: ${item.code}\n`;
      text += `   - Category: ${item.category}\n\n`;
    });
    text += "Please share the pricing based on current gold/silver rates and next steps for ordering. Thank you!";
    return encodeURIComponent(text);
  };

  return (
    <CartContext.Provider value={{
      cart,
      PRODUCTS,
      isCartOpen,
      setIsCartOpen,
      isSearchOpen,
      setIsSearchOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      getWhatsAppInquiryText
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
