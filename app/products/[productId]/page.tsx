import { Container } from "@/components/container";
import { ProductWrapper } from "@/components/products/product-wrapper";
import { METADATA } from "@/constants/meta";
import { fetchProductById, fetchProducts } from "@/lib/api";
import { redirect } from "next/navigation";

interface Params {
  params: Promise<{ productId: string }>;
}

export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((p) => ({
    productId: p.id.toString(),
  }));
}

export async function generateMetadata({ params }: Params) {
  const { productId } = await params;

  let title = "Загрузка...";
  let description = METADATA.description;

  try {
    const product = await fetchProductById(productId);
    if (product) {
      title = product.title || "Товар";
      description = product.description || METADATA.description;
    }
  } catch (e) {
    console.log(e);
  }

  return { title, description };
}

const ProductPage = async ({ params }: Params) => {
  const { productId } = await params;
  if (!productId) redirect("/products");

  return (
    <Container>
      <ProductWrapper productId={productId} />
    </Container>
  );
};

export default ProductPage;
