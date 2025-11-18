import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string()
    .min(4, "Название обязательно. Минимум 4 символа")
    .max(100, "Максимум 100 символов"),
  description: z
    .string()
    .min(1, "Описание обязательно")
    .max(1000, "Максимум 1000 символов"),
  price: z
    .string()
    .min(1, "Цена обязательна")
    .refine((value) => Number(value) > 0, "Цена должна быть больше 0"),
  stock: z
    .string()
    .min(1, "Количество обязательно")
    .refine(
      (value) => Number(value) >= 0,
      "Количество не может быть отрицательным"
    ),
  brand: z.string().optional(),
  category: z.string().optional(),
  image: z
    .string()
    .url("Неверный формат URL изображения")
    .min(1, "Изображение обязательно"),
});
