import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// If configured, create a real client
const realClient = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Dummy client to prevent "Failed to fetch" errors when Supabase is not configured
const dummyClient = {
  auth: {
    signInWithPassword: async () => ({ data: null, error: new Error("Supabase not configured") }),
    getSession: async () => ({ data: { session: null } }),
    signOut: async () => {},
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  },
  from: () => {
    const chain = {
      select: () => chain,
      insert: () => chain,
      update: () => chain,
      delete: () => chain,
      eq: () => chain,
      order: () => chain,
      single: () => chain,
      then: (onfulfilled) => Promise.resolve({ data: null, error: new Error("Supabase not configured") }).then(onfulfilled)
    };
    return chain;
  }
};

export const supabase = realClient || dummyClient;
