
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || ""

const options = {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
}

// Check if window is defined before creating the client
let supabase;
if (typeof window !== 'undefined') {
  supabase = createClient(supabaseUrl, supabaseAnonKey, options);
} else {
  console.warn('Supabase client not initialized: window is not defined');
}

export { supabase };
