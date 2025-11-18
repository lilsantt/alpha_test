"use client";
import { useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/store/store";
import { Product } from "@/lib/types";
import { productSchema } from "../../lib/validation/create-product";

export const ProductForm = ({ className }: { className?: string }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { createProduct } = useProductStore();
  const router = useRouter();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (formData: FormData) => {
    setLoading(true);
    const raw = {
      title: formData.get("title"),
      description: formData.get("description"),
      price: formData.get("price"),
      stock: formData.get("stock"),
      brand: formData.get("brand"),
      category: formData.get("category"),
      image: formData.get("image"),
    };

    const parsed = productSchema.safeParse(raw);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};

      parsed.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });

      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    setErrors({});

    const data = parsed.data;

    const product: Product = {
      id: -Date.now(),
      stock: Number(data.stock),
      title: data.title,
      description: data.description,
      price: Number(data.price),
      brand: data.brand || "",
      rating: 0,
      category: data.category || "",
      thumbnail: data.image,
      images: [],
    };

    createProduct(product);

    router.push(`/products/`);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        handleSubmit(formData);
      }}
      ref={formRef}
      className={className}
    >
      <fieldset disabled={loading}>
        <Input
          label="Название"
          id="title"
          error={errors.title}
          placeholder="Введите название продукта"
        />

        <Textarea
          label="Описание"
          id="description"
          error={errors.description}
          placeholder="Введите описание"
          rows={4}
        />

        <Input
          label="Цена"
          id="price"
          error={errors.price}
          placeholder="Введите цену"
          type="number"
        />

        <Input
          label="Количество"
          id="stock"
          error={errors.stock}
          placeholder="Введите количество товара на складе"
          type="number"
        />

        <Input
          id="brand"
          label="Бренд"
          placeholder="Опционально"
          error={errors.brand}
        />

        <Input
          id="category"
          label="Категория"
          placeholder="Опционально"
          error={errors.category}
        />

        <Input
          id="image"
          label="Ссылка на изображение (не меняется)"
          className="pointer-events-none cursor-default user-select-none bg-gray-100 text-muted"
          value="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
          error={errors.image}
          placeholder="https://example.com/image.jpg"
        />

        <Button type="submit" className="mt-4 w-full">
          Создать
        </Button>
      </fieldset>
    </form>
  );
};
