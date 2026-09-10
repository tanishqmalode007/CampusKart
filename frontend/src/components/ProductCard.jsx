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
          src={
            product.imageUrls?.length > 0
              ? product.imageUrls[0]
              : "https://placehold.co/600x400?text=CampusKart"
          }
          alt={product.title}
          className="product-image"
        />

        <div className="product-content">

          <h3>{product.title}</h3>
          <div className="status-badge">

  {product.status === "Available" && (
    <span className="available-badge">
      🟢 Available
    </span>
  )}

  {product.status === "Reserved" && (
    <span className="reserved-badge">
      🟡 Reserved
    </span>
  )}

  {product.status === "Sold" && (
    <span className="sold-badge">
      🔴 Sold
    </span>
  )}

</div>

          <h2>₹{product.price}</h2>

          <p className="seller">
            👤 {product.ownerName}
          </p>

          <p className="location">
            📚 {product.ownerDepartment} • {product.ownerYear}
          </p>

          <p className="location">
            🏫 {product.ownerCollege}
          </p>

          <p className="location">
            📍 {product.pickupLocation}
          </p>

          <div className="card-buttons">

            <Link to={`/product/${product.id}`}>
              <button className="view-btn">
                View Details
              </button>
            </Link>
<button
    className="buy-btn"
    disabled={product.status !== "Available"}
>
    {product.status === "Available"
        ? "Contact Seller"
        : product.status}
</button>

          </div>

        </div>

      </div>

      <LoginModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        action="contact this seller"
      />
    </>
  );
}

export default ProductCard;