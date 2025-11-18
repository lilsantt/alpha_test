"use client";
import { Product } from "@/lib/types";
import { useProductStore } from "@/store/store";
import { useEffect, useState } from "react";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/cn";
import { Searchbar } from "../searchbar";
import { ProductFilters } from "./filters/product-filters";
import { ProductNotFound } from "./product-not-found";
import { LoadingSpinner } from "../ui/loading-spinner";

interface Props {
  className?: string;
  initialProducts: Product[];
}

export const ProductList: React.FC<Props> = ({
  className,
  initialProducts,
}) => {
  const {
    products,
    setProducts,
    favorites,
    toggleFavorite,
    deleteProduct,
    _hasHydrated,
  } = useProductStore();

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    favorites: false,
    priceRange: {
      min: "",
      max: "",
    },
  });

  useEffect(() => {
    if (_hasHydrated && products.length === 0 && initialProducts.length > 0) {
      setProducts(initialProducts);
    }
  }, [_hasHydrated, products.length, initialProducts, setProducts]);

  const handleToggleFavorite = (id: number) => toggleFavorite(id);
  const handleDeleteProduct = (id: number) => deleteProduct(id);

  const filteredProducts = () => {
    let filtered = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );

    if (filters.favorites) {
      filtered = filtered.filter((p) => favorites.has(p.id));
    }

    if (filters.priceRange.min || filters.priceRange.max) {
      filtered = filtered.filter((p) => {
        const price = p.price;
        const min = filters.priceRange.min ? Number(filters.priceRange.min) : 0;
        const max = filters.priceRange.max
          ? Number(filters.priceRange.max)
          : Infinity;
        return price >= min && price <= max;
      });
    }

    return filtered;
  };

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  if (!_hasHydrated) {
    return <LoadingSpinner className="min-h-[80vh]" />;
  }

  return (
    <div className={cn(className)}>
      <Searchbar
        className="mb-4"
        placeholder="Поиск..."
        value={search}
        onChange={setSearch}
      />

      <ProductFilters
        filters={filters}
        onChange={handleFilterChange}
        className="mb-4"
      />

      {filteredProducts().length === 0 && <ProductNotFound />}

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts().map((p) => (
          <li key={p.id}>
            <ProductCard
              className="flex-1 h-full"
              product={p}
              isFavorite={favorites.has(p.id)}
              onDeleteProduct={handleDeleteProduct}
              onToggleFavorite={handleToggleFavorite}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
