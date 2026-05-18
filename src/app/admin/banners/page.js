"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Image as ImageIcon, CheckCircle, X, ShieldCheck, LogOut, UploadCloud, LayoutDashboard, Layers, GripVertical, Smartphone, Monitor, Users } from 'lucide-react';
import Link from 'next/link';

// Default fallback banners if DB fails
const DEFAULT_BANNERS = [
  {
    id: 1,
    title: "Imperial Diamonds",
    subtitle: "Eternity Collection",
    description: "Celebrate rare milestones with modern brilliant-cut diamonds, masterfully handcrafted for endless light.",
    desktop_image: "https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?q=80&w=2938&auto=format&fit=crop",
    mobile_image: "https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?q=80&w=800&auto=format&fit=crop",
    cta_text: "Explore Collection",
    cta_url: "/collection",
    luxury_tag: "Luxury Campaign",
    display_order: 1,
    is_active: true
  }
];

export default function BannerManagement() {
  const router = useRouter();
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBanner, setEditBanner] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    desktop_image: '',
    mobile_image: '',
    cta_text: 'Discover More',
    cta_url: '/collection',
    luxury_tag: 'Featured',
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    const isLocalAuth = sessionStorage.getItem('adminAuth') === 'true';
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session && !isLocalAuth) {
        router.push('/admin');
      } else {
        fetchBanners();
      }
    };
    checkAuth();
  }, [router]);

  const fetchBanners = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('hero_banners').select('*').order('display_order', { ascending: true });
      if (!error && data && data.length > 0) {
        setBanners(data);
        localStorage.setItem('chamunda_banners', JSON.stringify(data));
      } else {
        const local = localStorage.getItem('chamunda_banners');
        if (local) {
          setBanners(JSON.parse(local));
        } else {
          setBanners(DEFAULT_BANNERS);
          localStorage.setItem('chamunda_banners', JSON.stringify(DEFAULT_BANNERS));
        }
      }
    } catch (err) {
      const local = localStorage.getItem('chamunda_banners');
      if (local) {
        setBanners(JSON.parse(local));
      } else {
        setBanners(DEFAULT_BANNERS);
        localStorage.setItem('chamunda_banners', JSON.stringify(DEFAULT_BANNERS));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    sessionStorage.removeItem('adminAuth');
    router.push('/admin');
  };

  const handleOpenModal = (banner = null) => {
    if (banner) {
      setEditBanner(banner);
      setFormData({
        title: banner.title,
        subtitle: banner.subtitle || '',
        description: banner.description || '',
        desktop_image: banner.desktop_image || '',
        mobile_image: banner.mobile_image || '',
        cta_text: banner.cta_text || 'Discover More',
        cta_url: banner.cta_url || '/collection',
        luxury_tag: banner.luxury_tag || 'Featured',
        display_order: banner.display_order || 0,
        is_active: banner.is_active !== false,
      });
    } else {
      setEditBanner(null);
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        desktop_image: '',
        mobile_image: '',
        cta_text: 'Discover More',
        cta_url: '/collection',
        luxury_tag: 'Featured',
        display_order: banners.length + 1,
        is_active: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = { ...formData };

    try {
      if (editBanner) {
        const { error } = await supabase.from('hero_banners').update(payload).eq('id', editBanner.id);
        if (error) throw error;
        const updated = banners.map(b => b.id === editBanner.id ? { ...b, ...payload } : b).sort((a,b) => a.display_order - b.display_order);
        setBanners(updated);
        localStorage.setItem('chamunda_banners', JSON.stringify(updated));
      } else {
        const { data, error } = await supabase.from('hero_banners').insert([payload]).select();
        if (error) throw error;
        if (data) {
          const updated = [...banners, data[0]].sort((a,b) => a.display_order - b.display_order);
          setBanners(updated);
          localStorage.setItem('chamunda_banners', JSON.stringify(updated));
        }
      }
    } catch (err) {
      console.log('Using local state update (Supabase not connected)');
      let updated = [];
      if (editBanner) {
        updated = banners.map(b => b.id === editBanner.id ? { ...editBanner, ...payload } : b).sort((a,b) => a.display_order - b.display_order);
      } else {
        updated = [...banners, { id: Date.now(), ...payload }].sort((a,b) => a.display_order - b.display_order);
      }
      setBanners(updated);
      localStorage.setItem('chamunda_banners', JSON.stringify(updated));
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;
    try {
      await supabase.from('hero_banners').delete().eq('id', id);
      const updated = banners.filter(b => b.id !== id);
      setBanners(updated);
      localStorage.setItem('chamunda_banners', JSON.stringify(updated));
    } catch (err) {
      const updated = banners.filter(b => b.id !== id);
      setBanners(updated);
      localStorage.setItem('chamunda_banners', JSON.stringify(updated));
    }
  };

  // Drag and drop image handler (base64 fallback)
  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [field]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Admin Header */}
      <header className="bg-[#110722] text-white py-4 px-6 sticky top-0 z-30 shadow-md">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#eebf63]" />
              <div>
                <h1 className="font-serif text-lg tracking-widest uppercase text-[#eebf63]">Chamunda Admin</h1>
                <p className="text-[10px] text-gray-400 tracking-wider">Luxury Jewellery Management</p>
              </div>
            </div>
            
            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-2 ml-8 border-l border-white/10 pl-8">
              <Link href="/admin/dashboard" className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" /> Products
              </Link>
              <Link href="/admin/banners" className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-[#110722] bg-[#eebf63] transition-colors flex items-center gap-2">
                <Layers className="w-4 h-4" /> Banners
              </Link>
              <Link href="/admin/customers" className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2">
                <Users className="w-4 h-4" /> Customers
              </Link>
            </nav>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-2 flex gap-2 overflow-x-auto sticky top-[72px] z-20">
        <Link href="/admin/dashboard" className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50 whitespace-nowrap">Products</Link>
        <Link href="/admin/banners" className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-white bg-[#1f163b] whitespace-nowrap">Banners</Link>
        <Link href="/admin/customers" className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50 whitespace-nowrap">Customers</Link>
      </div>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-serif text-[#1f163b]">Hero Banner Management</h2>
            <p className="text-sm text-gray-500 mt-1">Manage the dynamic cinematic sliders on your homepage.</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="px-6 py-2.5 bg-[#1f163b] hover:bg-[#d4a54c] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Banner
          </button>
        </div>

        {/* Banners List */}
        <div className="space-y-4">
          {banners.map((banner, index) => (
            <div key={banner.id} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center group transition-all hover:shadow-md hover:border-[#eebf63]/50">
              <div className="flex items-center gap-4 self-stretch md:self-auto border-b md:border-none border-gray-100 pb-4 md:pb-0">
                <GripVertical className="w-5 h-5 text-gray-300 cursor-move hidden md:block" />
                <div className="text-center min-w-[3rem]">
                  <span className="block text-xs text-gray-400 uppercase font-bold tracking-widest">Order</span>
                  <span className="text-lg font-serif text-[#1f163b]">{banner.display_order}</span>
                </div>
              </div>
              
              <div className="relative w-full md:w-64 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                {banner.desktop_image ? (
                  <img src={banner.desktop_image} alt={banner.title} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 m-auto mt-12 text-gray-300" />
                )}
                {!banner.is_active && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="bg-gray-800 text-white text-[10px] uppercase font-bold px-3 py-1 rounded">Hidden</span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-[#eebf63]/10 text-[#d4a54c] rounded text-[9px] uppercase tracking-wider font-bold">{banner.luxury_tag}</span>
                  <span className={`w-2 h-2 rounded-full ${banner.is_active ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                </div>
                <h3 className="text-lg font-serif text-[#1f163b] font-medium">{banner.title}</h3>
                <p className="text-sm text-gray-500 font-medium">{banner.subtitle}</p>
                <p className="text-xs text-gray-400 mt-2 line-clamp-2">{banner.description}</p>
              </div>

              <div className="flex items-center gap-2 mt-4 md:mt-0 w-full md:w-auto justify-end">
                <button onClick={() => handleOpenModal(banner)} className="px-4 py-2 bg-gray-50 hover:bg-[#d4a54c]/10 text-gray-600 hover:text-[#d4a54c] rounded-lg text-xs font-bold uppercase tracking-widest transition-colors border border-gray-200 flex items-center gap-2">
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button onClick={() => handleDelete(banner.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {banners.length === 0 && !isLoading && (
            <div className="py-20 text-center bg-white rounded-2xl border border-gray-200">
              <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No banners found.</p>
              <button onClick={() => handleOpenModal()} className="mt-4 text-[#d4a54c] font-bold text-xs uppercase tracking-widest hover:underline">Create your first banner</button>
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-[#110722]/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl max-h-[95vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
                <h2 className="font-serif text-xl text-[#1f163b]">{editBanner ? 'Edit Hero Banner' : 'Create Hero Banner'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-white p-2 rounded-full shadow-sm">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <form id="banner-form" onSubmit={handleSubmit} className="p-6 md:p-8 space-y-10">
                  
                  {/* Realtime Preview Section */}
                  <div className="mb-10 bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-xl relative aspect-[21/9] sm:aspect-[21/7] max-h-[300px]">
                    {formData.desktop_image && <img src={formData.desktop_image} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Preview" />}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent p-8 md:p-12 flex flex-col justify-center">
                      <div className="inline-block px-3 py-1 bg-white/10 border border-[#eebf63]/50 rounded-full mb-4 backdrop-blur-sm w-max">
                        <span className="text-[9px] tracking-[0.2em] font-bold text-[#eebf63] uppercase">{formData.luxury_tag || 'Luxury Tag'}</span>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#fce2a6] to-[#d4a54c] mb-2">{formData.title || 'Banner Title'}</h2>
                      <h3 className="text-xl text-white font-serif mb-4">{formData.subtitle || 'Banner Subtitle'}</h3>
                      <p className="text-gray-300 text-sm max-w-md hidden md:block mb-6">{formData.description || 'Description text will appear here.'}</p>
                      <button type="button" className="px-6 py-2 bg-transparent border border-[#eebf63] text-[#eebf63] rounded-full text-xs font-bold uppercase tracking-widest w-max">
                        {formData.cta_text || 'Button Text'}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Left Column: Text & Content */}
                    <div className="space-y-6">
                      <h3 className="font-serif text-lg text-[#1f163b] border-b border-gray-100 pb-2">Banner Content</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Main Title</label>
                          <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#d4a54c] focus:bg-white transition-colors" placeholder="e.g. Imperial Diamonds" />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Subtitle</label>
                          <input type="text" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#d4a54c] focus:bg-white transition-colors" placeholder="e.g. Eternity Collection" />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Luxury Tag</label>
                          <input type="text" value={formData.luxury_tag} onChange={e => setFormData({...formData, luxury_tag: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#d4a54c] focus:bg-white transition-colors" placeholder="e.g. Featured Campaign" />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Description</label>
                          <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#d4a54c] focus:bg-white transition-colors resize-none" placeholder="Short description of the collection..."></textarea>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                        <div>
                          <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">CTA Button Text</label>
                          <input type="text" value={formData.cta_text} onChange={e => setFormData({...formData, cta_text: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#d4a54c] focus:bg-white" />
                        </div>
                        <div>
                          <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">CTA Button Link</label>
                          <input type="text" value={formData.cta_url} onChange={e => setFormData({...formData, cta_url: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#d4a54c] focus:bg-white" />
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Media & Settings */}
                    <div className="space-y-6">
                      <h3 className="font-serif text-lg text-[#1f163b] border-b border-gray-100 pb-2">Media & Settings</h3>

                      {/* Desktop Image */}
                      <div>
                        <label className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">
                          <Monitor className="w-3.5 h-3.5" /> Desktop Background Image
                        </label>
                        <div className="space-y-3">
                          <input 
                            type="text" 
                            value={formData.desktop_image} 
                            onChange={e => setFormData({...formData, desktop_image: e.target.value})} 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#d4a54c]" 
                            placeholder="Enter Image URL" 
                          />
                          <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-[#d4a54c] transition-colors bg-gray-50">
                            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'desktop_image')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            <UploadCloud className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                            <p className="text-xs text-gray-500">Or drag & drop / click to upload</p>
                          </div>
                        </div>
                      </div>

                      {/* Mobile Image */}
                      <div>
                        <label className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">
                          <Smartphone className="w-3.5 h-3.5" /> Mobile Background Image (Optional)
                        </label>
                        <div className="space-y-3">
                          <input 
                            type="text" 
                            value={formData.mobile_image} 
                            onChange={e => setFormData({...formData, mobile_image: e.target.value})} 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#d4a54c]" 
                            placeholder="Enter Mobile Image URL" 
                          />
                          <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-[#d4a54c] transition-colors bg-gray-50">
                            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'mobile_image')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            <p className="text-xs text-gray-500">Upload specific crop for mobile devices</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                        <div>
                          <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Display Order</label>
                          <input type="number" min="0" value={formData.display_order} onChange={e => setFormData({...formData, display_order: parseInt(e.target.value) || 0})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#d4a54c]" />
                        </div>
                        <div className="flex items-center">
                          <label className="flex items-center gap-3 cursor-pointer mt-4 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 w-full">
                            <input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} className="w-5 h-5 text-[#d4a54c] border-gray-300 rounded focus:ring-[#d4a54c]" />
                            <span className="text-sm text-gray-700 font-bold uppercase tracking-widest">Active Status</span>
                          </label>
                        </div>
                      </div>

                    </div>
                  </div>

                </form>
              </div>

              <div className="p-6 border-t border-gray-100 bg-white flex justify-end gap-4 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-gray-500 hover:bg-gray-100 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors">
                  Cancel
                </button>
                <button type="submit" form="banner-form" disabled={isLoading} className="px-8 py-3 bg-[#1f163b] hover:bg-[#d4a54c] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors shadow-lg disabled:opacity-50 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> {isLoading ? 'Saving...' : 'Publish Banner'}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
