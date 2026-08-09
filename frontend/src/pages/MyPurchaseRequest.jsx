import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

                  Status :

                  <strong>

                    {" "}

                    {request.status === "Pending" &&
                      "🟡 Pending"}

                    {request.status === "Accepted" &&
                      "🟢 Accepted"}

                    {request.status === "Rejected" &&
                      "🔴 Rejected"}

                  </strong>

                </p>

                {request.status === "Accepted" && (

                  <>

                    <hr />

                    <h4>

                      Seller Details

                    </h4>

                    <p>

                      👤 {request.seller.fullName}

                    </p>

                    <p>

                      📧 {request.seller.email}

                    </p>

                    <p>

                      📱 {request.seller.mobile}

                    </p>

                  </>

                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default MyPurchaseRequests;