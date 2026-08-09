import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { getBuyerRequests } from "../services/requestService";
import { getProduct } from "../services/productService";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function MyPurchaseRequests() {

  const navigate = useNavigate();

  const { user } = useAuth();

  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadRequests();

  }, []);

  async function loadRequests() {

    const data = await getBuyerRequests(user.uid);

    const finalData = await Promise.all(

      data.map(async (request) => {

        const product = await getProduct(
          request.productId
        );

        const sellerSnap = await getDoc(
          doc(db, "users", request.sellerId)
        );

        const seller = sellerSnap.exists()
          ? sellerSnap.data()
          : {};

        return {

          ...request,

          product,

          seller,

        };

      })

    );

    setRequests(finalData);

    setLoading(false);

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

        My Purchase Requests

      </h1>

      {requests.length === 0 ? (

        <h3
          style={{
            textAlign: "center",
            marginTop: "40px",
          }}
        >

          No Purchase Requests Yet.

        </h3>

      ) : (

        <div className="browse-grid">

          {requests.map((request) => (

            <div

              className="product-card"

              key={request.id}

            >

              <img

                src={
                  request.product?.imageUrls?.length
                    ? request.product.imageUrls[0]
                    : "https://placehold.co/600x400?text=CampusKart"
                }

                alt=""

                className="product-image"

              />

              <div className="product-content">

                <h3>

                  {request.productTitle}

                </h3>

                <h2>

                  ₹{request.productPrice}

                </h2>
                <p>

  <strong>Product Status:</strong>{" "}

  {request.product?.status === "Available" &&
    "🟢 Available"}

  {request.product?.status === "Reserved" &&
    "🟡 Reserved"}

  {request.product?.status === "Sold" &&
    "🔴 Sold"}

</p>

                <p>
  <strong>Status:</strong>{" "}

  {request.status === "Pending" && "🟡 Pending"}

  {request.status === "Accepted" && "🟢 Accepted"}

  {request.status === "Rejected" && "🔴 Rejected"}

</p>

{request.status === "Pending" && (
  <p
    style={{
      color: "#777",
      marginTop: "8px",
    }}
  >
    Waiting for seller to respond...
  </p>
)}

{request.status === "Rejected" && (
  <p
    style={{
      color: "red",
      marginTop: "8px",
    }}
  >
    Seller rejected your request.
  </p>
)}

                {request.status === "Accepted" && (

                  <>

                    <hr />

                    <h4>

                      Seller Details

                    </h4>

                    <p>
  👤 {request.sellerName}
</p>

<p>
  📧 {request.sellerEmail}
</p>

<p>
  📱 {request.sellerMobile}
</p>
                  </>

                )}
<div
  style={{
    marginTop: "15px",
  }}
>

  <Link to={`/product/${request.productId}`}>

    <button
      className="view-btn"
      style={{
        width: "100%",
      }}
    >
      View Product
    </button>

  </Link>

</div>
              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default MyPurchaseRequests;