import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { useAuth } from "../context/AuthContext";
import { sendRequest } from "../services/requestService";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";import LoginModal from "../components/LoginModal";

import { getProduct } from "../services/productService";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

const { isLoggedIn, user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const [product, setProduct] = useState(null);

  const [selectedImage, setSelectedImage] =
    useState("");

  useEffect(() => {
    loadProduct();
  }, []);

  async function loadProduct() {
    const data = await getProduct(id);

    setProduct(data);

    if (data?.imageUrls?.length > 0) {
      setSelectedImage(data.imageUrls[0]);
    }
  }

  const handleContactSeller = async () => {
  if (!isLoggedIn) {
    setShowModal(true);
    return;
  }

  if (user.uid === product.ownerId) {
    alert("You can't send a request to your own product.");
    return;
  }

  try {
    const userSnap = await getDoc(
      doc(db, "users", user.uid)
    );

    const buyer = userSnap.data();

    await sendRequest({
      buyerId: user.uid,
      sellerId: product.ownerId,
      productId: product.id,
    });

    alert("✅ Purchase request sent successfully.");

  } catch (error) {
    alert(error.message);
  }
};
  if (!product) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          fontSize: "24px",
          fontWeight: "600",
        }}
      >
        Loading Product...
      </div>
    );
  }
   return (
    <>
      <div className="details-container">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="image-gallery">

          <div className="thumbnail-column">

            {(product.imageUrls?.length > 0
              ? product.imageUrls
              : ["https://placehold.co/700x500?text=CampusKart"]
            ).map((image, index) => (

              <img
                key={index}
                src={image}
                alt={`Preview ${index + 1}`}
                className={`thumbnail ${
                  selectedImage === image
                    ? "active-thumbnail"
                    : ""
                }`}
                onClick={() => setSelectedImage(image)}
              />

            ))}

          </div>

          <div className="main-image-container">

            <img
              src={
                selectedImage ||
                "https://placehold.co/700x500?text=CampusKart"
              }
              alt={product.title}
              className="details-image"
            />

          </div>

        </div>

        <h1>{product.title}</h1>

        <h2>₹{product.price}</h2>

        <div className="details-info">

          <p>
            <strong>Category:</strong> {product.category}
          </p>

          <p>
            <strong>Condition:</strong> {product.condition}
          </p>

          <p>
            <strong>Seller:</strong> {product.ownerName}
          </p>

          <p>
            <strong>Department:</strong> {product.ownerDepartment}
          </p>

          <p>
            <strong>Year:</strong> {product.ownerYear}
          </p>

          <p>
            <strong>College:</strong> {product.ownerCollege}
          </p>

        </div>

        <div className="details-description">

          <h3>Description</h3>

          <p>{product.description}</p>

        </div>

        <div className="details-location">

          <h3>Pickup Location</h3>

          <p>{product.pickupLocation}</p>

        </div>

        <button
          className="buy-btn"
          onClick={handleContactSeller}
        >
          Send Purchase Request
        </button>

      </div>

      <LoginModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        action="contact this seller"
      />
    </>
  );
}

export default ProductDetails;