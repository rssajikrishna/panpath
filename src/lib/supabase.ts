import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const signUp = async (email: string, password?: string, userData?: any) => {
  if (password) {
    // Admin signup with password
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { ...userData, role: 'admin' }
      }
    });
    return { data, error };
  } else {
    // User signup with OTP
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        data: { ...userData, role: 'user' }
      }
    });
    return { data, error };
  }
};

export const signIn = async (email: string, password?: string) => {
  if (password) {
    // Admin login with password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  } else {
    // User login with OTP
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
    });
    return { data, error };
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Database helpers
export const createUserProfile = async (userId: string, userData: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert([
      {
        id: userId,
        ...userData,
        created_at: new Date().toISOString(),
      }
    ]);
  return { data, error };
};

export const updateUserProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
  return { data, error };
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};