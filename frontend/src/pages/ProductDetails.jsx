import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getProduct } from "../services/api";
import LoginModal from "../components/LoginModal";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoggedIn } = useAuth();

  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadProduct();
  }, []);

  async function loadProduct() {
    const data = await getProduct(id);
    setProduct(data);
  }

  const handleBuy = () => {
    if (isLoggedIn) {
      alert("Proceeding to Buy...");
    } else {
      setShowModal(true);
    }
  };

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="product-details">

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-info">

        <h1>{product.name}</h1>

        <h2>₹{product.price}</h2>

        <p>
          <strong>Category:</strong> {product.category}
        </p>

        <p>
          <strong>Location:</strong> {product.location}
        </p>

        <hr />

        <h3>Seller</h3>

        <p>{product.seller}</p>

        <button
          className="buy-btn"
          onClick={handleBuy}
        >
          Buy Now
        </button>

      </div>

      <LoginModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        action="buy this product"
      />

    </div>
  );
}

export default ProductDetails;