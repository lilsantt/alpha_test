import { Container } from "@/components/container";
import { ProductList } from "@/components/products/product-list";
import { METADATA } from "@/constants/meta";
import { fetchProducts } from "@/lib/api";

export function generateMetadata() {
  return {
    title: `Товары - ${METADATA.title}`,
    description: METADATA.description,
  };
}

const ProductsPage = async () => {
  const products = await fetchProducts();
  return (
    <div>
      <Container>
        <ProductList initialProducts={products} />
      </Container>
    </div>
  );
};

export default ProductsPage;
