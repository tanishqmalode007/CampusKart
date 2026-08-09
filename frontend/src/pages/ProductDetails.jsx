import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { useAuth } from "../context/AuthContext";
import LoginModal from "../components/LoginModal";

import { getProduct } from "../services/productService";
import { sendRequest } from "../services/requestService";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoggedIn, user } = useAuth();

  const [showModal, setShowModal] = useState(false);

  const [product, setProduct] = useState(null);

  const [selectedImage, setSelectedImage] = useState("");

  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  async function loadProduct() {
    const data = await getProduct(id);

    setProduct(data);

    if (data?.imageUrls?.length > 0) {
      setSelectedImage(data.imageUrls[0]);
    }
  }

  async function handlePurchaseRequest() {

    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }

    if (user.uid === product.ownerId) {
      alert("You can't request your own product.");
      return;
    }

    if (product.status !== "Available") {
      alert("This product is no longer available.");
      return;
    }

    try {

      setSending(true);

      await sendRequest({
        buyerId: user.uid,
        sellerId: product.ownerId,
        productId: product.id,
      });

      alert("✅ Purchase Request Sent");

    } catch (error) {

      alert(error.message);

    }

    setSending(false);
  }

  if (!product) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          fontSize: "22px",
          fontWeight: "600",
        }}
      >
        Loading...
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

            {(product.imageUrls?.length
              ? product.imageUrls
              : ["https://placehold.co/700x500?text=CampusKart"]
            ).map((image, index) => (

              <img
                key={index}
                src={image}
                alt=""
                className={`thumbnail ${
                  selectedImage === image
                    ? "active-thumbnail"
                    : ""
                }`}
                onClick={() =>
                  setSelectedImage(image)
                }
              />

            ))}

          </div>

          <div className="main-image-container">

            <img
              src={
                selectedImage ||
                "https://placehold.co/700x500?text=CampusKart"
              }
              alt=""
              className="details-image"
            />

          </div>

        </div>

        <h1>{product.title}</h1>

        <h2>₹{product.price}</h2>

        <h3>
          Status :
          {" "}
          {product.status === "Available" && "🟢 Available"}
          {product.status === "Reserved" && "🟡 Reserved"}
          {product.status === "Sold" && "🔴 Sold"}
        </h3>

        <div className="details-info">

          <p><strong>Category :</strong> {product.category}</p>

          <p><strong>Condition :</strong> {product.condition}</p>

          <p><strong>Seller :</strong> {product.ownerName}</p>

          <p><strong>Department :</strong> {product.ownerDepartment}</p>

          <p><strong>Year :</strong> {product.ownerYear}</p>

          <p><strong>College :</strong> {product.ownerCollege}</p>

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
          disabled={
            sending ||
            product.status !== "Available"
          }
          onClick={handlePurchaseRequest}
        >
          {product.status === "Available"
            ? sending
              ? "Sending..."
              : "Send Purchase Request"
            : product.status}
        </button>

      </div>

      <LoginModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        action="send a purchase request"
      />

    </>
  );
}

export default ProductDetails;