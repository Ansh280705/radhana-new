'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  avatar?: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setUser: (user: User, token: string) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
  isAdmin: () => boolean;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      setUser: (user, token) => set({ user, token }),
      clearUser: () => set({ user: null, token: null }),
      setLoading: (isLoading) => set({ isLoading }),
      isAdmin: () => get().user?.role === 'ADMIN',
      isAuthenticated: () => !!get().user,
    }),
    { name: 'Sanwaria-auth' }
  )
);
