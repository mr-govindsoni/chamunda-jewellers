"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const PRODUCTS = [
  { id: 1, name: "22K Antique Gold Choker", code: "CJ-G101", category: "Gold Jewellery", collection: "Rajputana Royal Heritage", tags: ["choker", "necklace", "gold", "bridal", "churu", "rajasthan"], image: "https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?q=80&w=600&auto=format&fit=crop" },
  { id: 2, name: "Diamond Solitaire Ring", code: "CJ-D202", category: "Diamond Jewellery", collection: "Solitaires", tags: ["ring", "diamond", "engagement", "solitaire", "rings"], image: "https://images.unsplash.com/photo-1605100804763-247f66126e28?q=80&w=600&auto=format&fit=crop" },
  { id: 3, name: "Temple Jewellery Set", code: "CJ-G103", category: "Gold Jewellery", collection: "Rajputana Royal Heritage", tags: ["temple", "set", "necklace", "ruby", "emerald"], image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop" },
  { id: 4, name: "Traditional Gold Bangles", code: "CJ-G104", category: "Gold Jewellery", collection: "Daily Wear", tags: ["bangle", "gold", "traditional", "bangles"], image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop" },
  { id: 5, name: "Kundan Polki Necklace", code: "CJ-G105", category: "Gold Jewellery", collection: "Rajputana Royal Heritage", tags: ["polki", "kundan", "necklace", "pearl", "polkis"], image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600&auto=format&fit=crop" },
  { id: 6, name: "Pure Silver Pooja Thali", code: "CJ-S306", category: "Silver Articles", collection: "Pooja Items", tags: ["thali", "silver", "pooja", "plate", "silver articles"], image: "https://images.unsplash.com/photo-1620608759551-7f9e160e1d16?q=80&w=600&auto=format&fit=crop" },
  { id: 7, name: "24K Gold Coin (10g)", code: "CJ-B407", category: "Bullion", collection: "Coins", tags: ["coin", "gold", "24k", "bullion", "coins"], image: "https://images.unsplash.com/photo-1610660600122-bd885de5eaaf?q=80&w=600&auto=format&fit=crop" },
  { id: 8, name: "Diamond Drop Earrings", code: "CJ-D208", category: "Diamond Jewellery", collection: "Eternity", tags: ["earring", "diamond", "drop", "rose gold", "earrings"], image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop" }
];

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
    let text = "✨ *Chamunda Jewellers - Royal Order Inquiry* ✨\n\n";
    text += "Hello Chamunda Jewellers team, I would like to get a quote and details for the following selected luxury pieces:\n\n";
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
