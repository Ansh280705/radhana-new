'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  ids: string[];
  toggle: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  setWishlist: (ids: string[]) => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id) ? state.ids.filter((i) => i !== id) : [...state.ids, id],
        })),
      isWishlisted: (id) => get().ids.includes(id),
      setWishlist: (ids) => set({ ids }),
    }),
    { name: 'Sanwaria-wishlist' }
  )
);
