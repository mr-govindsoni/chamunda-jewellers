"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Image as ImageIcon, CheckCircle, X, Search, ShieldCheck, LogOut, UploadCloud } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function AdminDashboard() {
  const router = useRouter();
  const { PRODUCTS } = useCart();
  const [products, setProducts] = useState(PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editProduct, setEditProduct] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Gold Jewellery',
    collection: 'Daily Wear',
    tags: '',
    description: '',
    images: [],
    featured: false,
    availability: true,
  });
  const [imageInput, setImageInput] = useState('');

  useEffect(() => {
    // Check Auth
    const isLocalAuth = sessionStorage.getItem('adminAuth') === 'true';
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session && !isLocalAuth) {
        router.push('/admin');
      } else {
        fetchProducts();
      }
    };
    checkAuth();
  }, [router]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        setProducts(data);
      } else {
        setProducts(PRODUCTS); // Fallback to context products
      }
    } catch (err) {
      setProducts(PRODUCTS);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    sessionStorage.removeItem('adminAuth');
    router.push('/admin');
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditProduct(product);
      setFormData({
        title: product.name || product.title,
        category: product.category,
        collection: product.collection || '',
        tags: Array.isArray(product.tags) ? product.tags.join(', ') : product.tags || '',
        description: product.desc || product.description || '',
        images: product.images || (product.image ? [product.image] : []),
        featured: product.featured || false,
        availability: product.availability !== false,
      });
    } else {
      setEditProduct(null);
      setFormData({
        title: '',
        category: 'Gold Jewellery',
        collection: 'Daily Wear',
        tags: '',
        description: '',
        images: [],
        featured: false,
        availability: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setFormData({ ...formData, images: [...formData.images, imageInput.trim()] });
      setImageInput('');
    }
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      name: formData.title,
      category: formData.category,
      collection: formData.collection,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      desc: formData.description,
      images: formData.images,
      image: formData.images[0] || '',
      featured: formData.featured,
      availability: formData.availability,
    };

    try {
      if (editProduct) {
        const { error } = await supabase.from('products').update(payload).eq('id', editProduct.id);
        if (error) throw error;
        // Local update fallback
        setProducts(products.map(p => p.id === editProduct.id ? { ...p, ...payload } : p));
      } else {
        const { data, error } = await supabase.from('products').insert([payload]).select();
        if (error) throw error;
        if (data) setProducts([data[0], ...products]);
      }
    } catch (err) {
      console.log('Using local state update (Supabase not connected)');
      if (editProduct) {
        setProducts(products.map(p => p.id === editProduct.id ? { ...p, ...payload } : p));
      } else {
        setProducts([{ id: Date.now(), ...payload }, ...products]);
      }
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await supabase.from('products').delete().eq('id', id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const filteredProducts = products.filter(p => 
    (p.name || p.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.category || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Admin Header */}
      <header className="bg-[#110722] text-white py-4 px-6 sticky top-0 z-30 shadow-md">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#eebf63]" />
            <div>
              <h1 className="font-serif text-lg tracking-widest uppercase text-[#eebf63]">Chamunda Admin</h1>
              <p className="text-[10px] text-gray-400 tracking-wider">Luxury Jewellery Management</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#d4a54c] transition-colors shadow-sm"
            />
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#1f163b] hover:bg-[#d4a54c] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add New Product
          </button>
        </div>

        {/* Products Grid */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Collection</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                          {product.image || (product.images && product.images[0]) ? (
                            <img src={product.image || product.images[0]} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-5 h-5 m-auto mt-3 text-gray-300" />
                          )}
                        </div>
                        <div>
                          <p className="font-serif text-[#1f163b] text-sm font-medium">{product.name || product.title}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{product.code || `ID: ${product.id}`}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-600 font-medium">{product.category}</td>
                    <td className="py-4 px-6 text-xs text-gray-600 font-medium">{product.collection || '-'}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1">
                        {product.featured && <span className="inline-block px-2 py-0.5 bg-[#eebf63]/10 text-[#d4a54c] border border-[#eebf63]/30 rounded text-[9px] uppercase tracking-wider font-bold w-max">Featured</span>}
                        {product.availability !== false ? (
                          <span className="inline-block px-2 py-0.5 bg-green-50 text-green-600 border border-green-200 rounded text-[9px] uppercase tracking-wider font-bold w-max">Available</span>
                        ) : (
                          <span className="inline-block px-2 py-0.5 bg-red-50 text-red-600 border border-red-200 rounded text-[9px] uppercase tracking-wider font-bold w-max">Out of Stock</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleOpenModal(product)} className="p-2 text-gray-400 hover:text-[#d4a54c] hover:bg-[#d4a54c]/10 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-gray-400 text-sm">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
              className="absolute inset-0 bg-[#110722]/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                <h2 className="font-serif text-xl text-[#1f163b]">{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <form id="product-form" onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Product Title</label>
                      <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-[#d4a54c]" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Category</label>
                      <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-[#d4a54c]">
                        <option>Gold Jewellery</option>
                        <option>Diamond Jewellery</option>
                        <option>Silver Articles</option>
                        <option>Bullion</option>
                        <option>Bridal Collection</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Collection</label>
                      <input type="text" value={formData.collection} onChange={e => setFormData({...formData, collection: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-[#d4a54c]" placeholder="e.g. Rajputana Royal Heritage" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Search Tags (comma separated)</label>
                      <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-[#d4a54c]" placeholder="gold, necklace, bridal" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Description</label>
                    <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-[#d4a54c] resize-none"></textarea>
                  </div>

                  {/* Images */}
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Product Images</label>
                    <div className="flex gap-2 mb-3">
                      <input 
                        type="url" 
                        value={imageInput} 
                        onChange={e => setImageInput(e.target.value)} 
                        className="flex-1 bg-white border border-gray-200 rounded-xl py-2 px-4 text-sm focus:outline-none focus:border-[#d4a54c]" 
                        placeholder="Paste image URL (https://...)" 
                      />
                      <button type="button" onClick={handleAddImage} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
                        <UploadCloud className="w-4 h-4" /> Add
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                      {formData.images.map((img, i) => (
                        <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => handleRemoveImage(i)} className="absolute top-1 right-1 bg-white/90 text-red-500 p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      {formData.images.length === 0 && (
                        <div className="col-span-full py-6 text-center border-2 border-dashed border-gray-200 rounded-xl text-xs text-gray-400">
                          No images added yet. Add URLs above.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Toggles */}
                  <div className="flex items-center gap-8 py-4 border-t border-gray-100">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-4 h-4 text-[#d4a54c] border-gray-300 rounded focus:ring-[#d4a54c]" />
                      <span className="text-sm text-gray-700 font-medium">Featured Product</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={formData.availability} onChange={e => setFormData({...formData, availability: e.target.checked})} className="w-4 h-4 text-[#d4a54c] border-gray-300 rounded focus:ring-[#d4a54c]" />
                      <span className="text-sm text-gray-700 font-medium">In Stock</span>
                    </label>
                  </div>

                </form>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-gray-500 hover:text-gray-700 font-bold text-xs uppercase tracking-widest transition-colors">
                  Cancel
                </button>
                <button type="submit" form="product-form" disabled={isLoading} className="px-8 py-2.5 bg-[#1f163b] hover:bg-[#d4a54c] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors shadow-md disabled:opacity-50 flex items-center gap-2">
                  {isLoading ? 'Saving...' : (editProduct ? 'Update Product' : 'Save Product')}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
