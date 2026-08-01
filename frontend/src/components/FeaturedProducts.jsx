import ProductCard from "./ProductCard";
import products from "../data/products";

function FeaturedProducts() {
  return (
    <section className="featured-products">

      <h2>Featured Products</h2>

      <div className="browse-grid">

        {products.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </section>
  );
}

export default FeaturedProducts;