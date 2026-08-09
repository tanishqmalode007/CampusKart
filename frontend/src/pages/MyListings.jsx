import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
  getMyProducts,
  deleteProduct,
  markSold,
} from "../services/productService";

import {
  getSellerRequests,
  acceptRequest,
  rejectRequest,
} from "../services/requestService";

function MyListings() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

 async function loadProducts() {

  const productData = await getMyProducts(user.uid);

  const requestData = await getSellerRequests(user.uid);

  setProducts(productData);

  setRequests(requestData);

  setLoading(false);

}

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    await deleteProduct(id);

    loadProducts();
  }

  async function handleSold(id) {
    await markSold(id);

    loadProducts();
  }

  if (loading) {
    return (
      <div className="browse-page">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="browse-page">

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h1 className="browse-title">
        My Listings
      </h1>

      {products.length === 0 ? (

        <h3
          style={{
            textAlign: "center",
            marginTop: "40px",
          }}
        >
          No Products Listed Yet.
        </h3>

      ) : (

        <div className="browse-grid">

          {products.map((product) => (

            <div
              className="product-card"
              key={product.id}
            >

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

                <h2>₹{product.price}</h2>

                <p>

Status :

<strong>

{product.status === "Available" && "🟢 Available"}

{product.status === "Reserved" && "🟡 Reserved"}

{product.status === "Sold" && "🔴 Sold"}

</strong>

</p>
                <div className="request-section">

  <h4>
    Purchase Requests
  </h4>

  {requests
    .filter(
      (r) => r.productId === product.id
    )
    .map((request) => (

      <div
        key={request.id}
        className="request-card"
      >

        <p>
  👤 {request.buyerName || "Unknown Buyer"}
</p>

<p>
  📧 {request.buyerEmail}
</p>

<p>
  📱 {request.buyerMobile}
</p>

        <p>
          {request.status}
        </p>

        {request.status === "Pending" && (

          <div
            className="request-buttons"
          >

            <button
              onClick={async () => {

                await acceptRequest(request);

await loadProducts();

              }}
            >
              Accept
            </button>

            <button
              onClick={async () => {

                await rejectRequest(
                  request
                );

                loadProducts();

              }}
            >
              Reject
            </button>

          </div>

        )}

      </div>

    ))}

</div>

                <div className="card-buttons">

                  <button
                    className="view-btn"
                    onClick={() =>
                      navigate(
                        `/product/${product.id}`
                      )
                    }
                  >
                    View
                  </button>

                  {product.status !== "Sold" &&
                    product.status !== "Reserved" && (

                    <button
                      className="buy-btn"
                      onClick={() =>
                        handleSold(product.id)
                      }
                    >
                      Mark Sold
                    </button>

                  )}

                </div>

                <button
                  className="logout-btn"
                  style={{
                    width: "100%",
                    marginTop: "10px",
                  }}
                  onClick={() =>
                    handleDelete(product.id)
                  }
                >
                  Delete Listing
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyListings;