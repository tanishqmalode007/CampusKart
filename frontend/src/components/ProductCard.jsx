import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";

function ProductCard({ product }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleBuy = () => {
    if (isLoggedIn) {
      navigate(`/product/${product.id}`);
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="product-card">

        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        <div className="product-content">

          <h3>{product.name}</h3>

          <h2>₹{product.price}</h2>

          <p className="seller">
            👤 {product.seller}
          </p>

          <p className="location">
            {product.category}
          </p>

          <div className="card-buttons">

            <Link to={`/product/${product.id}`}>
              <button className="view-btn">
                View Details
              </button>
            </Link>

            <button
              className="buy-btn"
              onClick={handleBuy}
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>

      <LoginModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        action="buy this product"
      />
    </>
  );
}

export default ProductCard;