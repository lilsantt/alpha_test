"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/types";

interface ProductState {
  products: Product[];
  favorites: Set<number>;
  _hasHydrated: boolean;
  setProducts: (products: Product[]) => void;
  toggleFavorite: (id: number) => void;
  deleteProduct: (id: number) => void;
  createProduct: (product: Product) => void;
  setHasHydrated: (state: boolean) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      favorites: new Set(),
      _hasHydrated: false,

      setProducts: (products) => set({ products }),

      toggleFavorite: (id) =>
        set((state) => {
          const fav = new Set(state.favorites);
          fav.has(id) ? fav.delete(id) : fav.add(id);
          return { favorites: fav };
        }),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
          favorites: new Set([...state.favorites].filter((f) => f !== id)),
        })),

      createProduct: (product) =>
        set((state) => ({
          products: [...state.products, product],
        })),

      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
    }),
    {
      name: "product-storage",
      partialize: (state) => ({
        products: state.products,
        favorites: Array.from(state.favorites),
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.favorites = new Set(state.favorites);
          state._hasHydrated = true;
        }
      },
    }
  )
);
