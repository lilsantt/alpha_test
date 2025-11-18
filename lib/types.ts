export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  brand?: string;
  category: string;
  stock: number;
  thumbnail: string;
  images: string[];
}

export interface Filters {
  favorites: boolean;
  priceRange: PriceRange;
}

export interface PriceRange {
  min: string;
  max: string;
}
