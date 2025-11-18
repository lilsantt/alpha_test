import { Container } from "@/components/container";
import { ProductForm } from "@/components/products/product-form";
import { METADATA } from "@/constants/meta";

export async function generateMetadata() {
  return {
    title: `Создать товар - ${METADATA.title}`,
    description: METADATA.description,
  };
}
export default function CreateProductPage() {
  return (
    <Container className="pb-10">
      <div className="max-w-xl mx-auto p-4 bg-card rounded-md">
        <h1 className="text-2xl font-semibold mb-4">Создать товар</h1>
        <ProductForm />
      </div>
    </Container>
  );
}
