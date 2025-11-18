import { BASE_API_URL } from "@/constants/api";
import { Product } from "./types";

export async function fetchProducts(
  limit: number = 8,
  skip: number = 0
): Promise<Product[]> {
  const res = await fetch(
    `${BASE_API_URL}/products?limit=${limit}&skip=${skip}`
  );
  const data = await res.json();
  return data.products;
}

export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`${BASE_API_URL}/products/${id}`);
  return res.json();
}
