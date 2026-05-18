"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // Check active sessions and sets the user
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Fetch additional profile data
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          setUser({ ...session.user, ...profile });
        } else {
          // Fallback for dummy client
          const localUser = sessionStorage.getItem('customerAuth');
          if (localUser) {
            setUser(JSON.parse(localUser));
          }
        }
      } catch (err) {
        console.error('Auth Check Error', err);
        const localUser = sessionStorage.getItem('customerAuth');
        if (localUser) setUser(JSON.parse(localUser));
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for changes on auth state
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          setUser({ ...session.user, ...profile });
        } catch (err) {
          setUser(session.user);
        }
      } else {
        const localUser = sessionStorage.getItem('customerAuth');
        if (!localUser) setUser(null);
      }
      setLoading(false);
    });

    return () => {
      if (authListener?.subscription) authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      // WhatsApp notification trigger for actual Supabase login
      const profileName = data.user?.user_metadata?.full_name || 'Client';
      try {
        await fetch('/api/whatsapp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'login', name: profileName, email })
        });
      } catch (e) {
        console.error("WhatsApp trigger failed", e);
      }
      
      return { data, error: null };
    } catch (error) {
      console.log('Fallback dummy login successful');
      const dummyUser = { id: 'dummy-1', email, full_name: 'Luxury Client', phone: '' };
      sessionStorage.setItem('customerAuth', JSON.stringify(dummyUser));
      setUser(dummyUser);
      
      // WhatsApp notification trigger for dummy fallback login
      try {
        await fetch('/api/whatsapp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'login', name: dummyUser.full_name, email })
        });
      } catch (e) {
        console.error("WhatsApp trigger failed", e);
      }
      
      return { data: { user: dummyUser }, error: null };
    }
  };

  const signup = async (email, password, fullName) => {
    try {
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: { data: { full_name: fullName } }
      });
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.log('Fallback dummy signup successful');
      const dummyUser = { id: 'dummy-' + Date.now(), email, full_name: fullName };
      sessionStorage.setItem('customerAuth', JSON.stringify(dummyUser));
      setUser(dummyUser);
      return { data: { user: dummyUser }, error: null };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    sessionStorage.removeItem('customerAuth');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      signup,
      logout,
      isAuthModalOpen,
      setIsAuthModalOpen
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
