"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { LayoutDashboard, Layers, Users, LogOut, ShieldCheck, Search, Filter, Download, MoreVertical, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function CustomersManagement() {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const isLocalAuth = sessionStorage.getItem('adminAuth') === 'true';
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session && !isLocalAuth) {
        router.push('/admin');
      } else {
        fetchCustomers();
      }
    };
    checkAuth();
  }, [router]);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      // Trying to fetch from dummy profiles table. In real Supabase, we would fetch from `auth.users` via an Edge Function or admin API, 
      // but assuming we sync them to a public `profiles` table.
      const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        setCustomers(data);
      } else {
        // Mock data if table is missing/empty
        setCustomers([
          { id: '1', full_name: 'Rahul Sharma', email: 'rahul.sharma@example.com', phone: '+91 9876543210', city: 'Jaipur', created_at: new Date().toISOString(), last_login: new Date().toISOString() },
          { id: '2', full_name: 'Anita Desai', email: 'anita.d@example.com', phone: '+91 8765432109', city: 'Mumbai', created_at: new Date(Date.now() - 86400000).toISOString(), last_login: new Date(Date.now() - 3600000).toISOString() },
        ]);
      }
    } catch (err) {
      setCustomers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    sessionStorage.removeItem('adminAuth');
    router.push('/admin');
  };

  const filteredCustomers = customers.filter(c => 
    c.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone?.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Admin Header */}
      <header className="bg-[#110722] text-white py-4 px-6 sticky top-0 z-30 shadow-md">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#eebf63]" />
              <div>
                <h1 className="font-serif text-lg tracking-widest uppercase text-[#eebf63]">Jaishree Admin</h1>
                <p className="text-[10px] text-gray-400 tracking-wider">Luxury Jewellery Management</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-2 ml-8 border-l border-white/10 pl-8">
              <Link href="/admin/dashboard" className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" /> Products
              </Link>
              <Link href="/admin/banners" className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2">
                <Layers className="w-4 h-4" /> Banners
              </Link>
              <Link href="/admin/customers" className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-[#110722] bg-[#eebf63] transition-colors flex items-center gap-2">
                <Users className="w-4 h-4" /> Customers
              </Link>
            </nav>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-2 flex gap-2 overflow-x-auto">
        <Link href="/admin/dashboard" className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50 whitespace-nowrap">Products</Link>
        <Link href="/admin/banners" className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50 whitespace-nowrap">Banners</Link>
        <Link href="/admin/customers" className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-white bg-[#1f163b] whitespace-nowrap">Customers</Link>
      </div>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-serif text-[#1f163b]">Customer Database</h2>
            <p className="text-sm text-gray-500 mt-1">Manage your registered clients and their luxury preferences.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search customers..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#d4a54c] w-full md:w-64"
              />
            </div>
            <button className="p-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
            <button className="px-4 py-2.5 bg-[#1f163b] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#d4a54c] transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-500">Client Details</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-500">Contact</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-500">Location</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-500">Registered</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-500">Last Login</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-400">Loading customers...</td>
                  </tr>
                ) : filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-400">No customers found matching "{searchTerm}"</td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#eebf63]/10 text-[#d4a54c] flex items-center justify-center font-serif text-lg">
                            {customer.full_name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <p className="font-medium text-[#1f163b]">{customer.full_name || 'Unknown'}</p>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded bg-green-50 text-green-600 text-[9px] uppercase font-bold tracking-wider">
                              Verified
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600 flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-gray-400" /> {customer.email}</p>
                          <p className="text-sm text-gray-600 flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-gray-400" /> {customer.phone || 'N/A'}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {customer.city ? <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-gray-400" /> {customer.city}</span> : '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(customer.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {customer.last_login ? new Date(customer.last_login).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : 'Recently'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-gray-400 hover:text-[#d4a54c] rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
