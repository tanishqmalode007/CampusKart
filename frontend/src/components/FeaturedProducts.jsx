import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../services/productService";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();

      // Show only available products
      const availableProducts = data.filter(
        (product) => product.status === "Available"
      );

      setProducts(availableProducts);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="featured-products">

      <h2>Featured Products</h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>
          Loading products...
        </p>
      ) : products.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          No products available yet.
        </p>
      ) : (
        <div className="browse-grid">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>
      )}

    </section>
  );
}

export default FeaturedProducts;