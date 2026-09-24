import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";

function Browse() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchFromURL = searchParams.get("search") || "";
  const categoryFromURL = searchParams.get("category") || "";

  const [search, setSearch] = useState(searchFromURL);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    setSearch(searchFromURL);
  }, [searchFromURL]);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  }

  const handleSearch = (value) => {
    setSearch(value);

    const params = {};

    if (value.trim()) {
      params.search = value.trim();
    }

    if (categoryFromURL) {
      params.category = categoryFromURL;
    }

    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearch("");
    setSearchParams({});
  };

  const filteredProducts = products.filter((product) => {
    const title = (product.title || "").toLowerCase();
    const category = (product.category || "").toLowerCase();

    const searchMatch =
      !search ||
      title.includes(search.toLowerCase()) ||
      category.includes(search.toLowerCase());

    const categoryMatch =
      !categoryFromURL ||
      category === categoryFromURL.toLowerCase();

    return searchMatch && categoryMatch;
  });

  return (
    <div className="browse-page">

      <h1 className="browse-title">
        Browse Products
      </h1>

      <div className="search-box">

        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <button onClick={clearFilters}>
          Clear
        </button>

      </div>

      {(search || categoryFromURL) && (
        <div style={{ margin: "15px 0" }}>

          {search && (
            <strong>
              Search: "{search}"
            </strong>
          )}

          {categoryFromURL && (
            <strong>
              Category: {categoryFromURL}
            </strong>
          )}

        </div>
      )}

      {filteredProducts.length === 0 ? (

        <div style={{
          textAlign: "center",
          marginTop: "40px"
        }}>
          <h3>No products found.</h3>
          <p>
            Try another search or category.
          </p>
        </div>

      ) : (

        <div className="browse-grid">

          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      )}

    </div>
  );
}

export default Browse;