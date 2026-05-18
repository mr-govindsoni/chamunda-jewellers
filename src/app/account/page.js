"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { User, MapPin, Package, Heart, LogOut, Edit2, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function AccountContent() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'profile';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#fafafa]">
        <div className="w-8 h-8 border-2 border-[#1f163b]/20 border-t-[#d4a54c] rounded-full animate-spin"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', icon: User, label: 'Profile Details' },
    { id: 'orders', icon: Package, label: 'Order History' },
    { id: 'wishlist', icon: Heart, label: 'Wishlist' },
    { id: 'address', icon: MapPin, label: 'Saved Addresses' }
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-[#1f163b] to-[#3a225e] text-[#eebf63] flex items-center justify-center font-serif text-3xl shadow-[0_10px_30px_rgba(31,22,59,0.2)] border-2 border-[#eebf63]/30">
              {user.avatar_url || user.user_metadata?.avatar_url ? (
                <img src={user.avatar_url || user.user_metadata?.avatar_url} alt={user.full_name} className="w-full h-full object-cover" />
              ) : (
                user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'
              )}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl md:text-3xl font-serif text-[#1f163b]">{user.full_name || 'Premium Member'}</h1>
                <ShieldCheck className="w-5 h-5 text-[#d4a54c]" />
              </div>
              <p className="text-gray-500 text-sm tracking-wide">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="px-6 py-2.5 rounded-full border border-gray-200 text-gray-500 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 overflow-hidden sticky top-32">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#1f163b] text-[#eebf63] shadow-md' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#d4a54c]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <tab.icon className={`w-5 h-5 ${isActive ? 'text-[#eebf63]' : 'text-gray-400'}`} />
                      <span className="font-bold text-xs uppercase tracking-widest">{tab.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 min-h-[500px]">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                >
                  <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                    <h2 className="font-serif text-xl text-[#1f163b]">Personal Information</h2>
                    <button className="text-[#d4a54c] hover:text-[#1f163b] text-xs font-bold uppercase tracking-widest flex items-center gap-1 transition-colors">
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Full Name</label>
                      <p className="text-gray-800 font-medium pb-2 border-b border-gray-50">{user.full_name || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Email Address</label>
                      <p className="text-gray-800 font-medium pb-2 border-b border-gray-50">{user.email}</p>
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Phone Number</label>
                      <p className="text-gray-800 font-medium pb-2 border-b border-gray-50">{user.phone || '+91 - Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Member Since</label>
                      <p className="text-gray-800 font-medium pb-2 border-b border-gray-50">
                        {user.created_at ? new Date(user.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : 'May 2026'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                >
                  <h2 className="font-serif text-xl text-[#1f163b] mb-8 border-b border-gray-100 pb-4">Order History</h2>
                  <div className="text-center py-16 px-4">
                    <Package className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <h3 className="text-lg font-serif text-[#1f163b] mb-2">No orders yet</h3>
                    <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">Discover our exquisite collection of Rajputana heritage jewellery and make your first purchase.</p>
                    <button onClick={() => router.push('/collection')} className="bg-[#1f163b] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#d4a54c] transition-colors">
                      Browse Collection
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'wishlist' && (
                <motion.div
                  key="wishlist"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                >
                  <h2 className="font-serif text-xl text-[#1f163b] mb-8 border-b border-gray-100 pb-4">My Wishlist</h2>
                  <div className="text-center py-16 px-4">
                    <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <h3 className="text-lg font-serif text-[#1f163b] mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-500 text-sm mb-6">Save your favorite pieces here to easily find them later.</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'address' && (
                <motion.div
                  key="address"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                >
                  <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                    <h2 className="font-serif text-xl text-[#1f163b]">Saved Addresses</h2>
                    <button className="text-[#d4a54c] hover:text-[#1f163b] text-xs font-bold uppercase tracking-widest flex items-center gap-1 transition-colors">
                      + Add New
                    </button>
                  </div>
                  <div className="text-center py-12 px-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm font-medium">No addresses saved.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[70vh] flex items-center justify-center bg-[#fafafa]">
        <div className="w-8 h-8 border-2 border-[#1f163b]/20 border-t-[#d4a54c] rounded-full animate-spin"></div>
      </div>
    }>
      <AccountContent />
    </Suspense>
  );
}
