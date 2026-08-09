import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

import { useEffect, useState } from "react";

import {
  getSellerRequests,
  acceptRequest,
  rejectRequest,
} from "../services/requestService";

import { getProduct } from "../services/productService";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function MyCampus() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [profile, setProfile] = useState(null);
const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data());
        const data = await getSellerRequests(user.uid);

const requestData = await Promise.all(
  data.map(async (request) => {
    const product = await getProduct(request.productId);

    return {
      ...request,
      product,
    };
  })
);

setRequests(requestData);
      }
    };

    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (!profile) {
    return (
      <div className="campus-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="campus-container">

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="profile-card">

        <FaUserCircle className="profile-avatar" />

        <h2>{profile.fullName}</h2>

       <div className="profile-info">

  <div className="info-item">
    <strong>📧 Email</strong>
    <p>{profile.email}</p>
  </div>

  <div className="info-item">
    <strong>📱 Mobile</strong>
    <p>{profile.mobile}</p>
  </div>

  <div className="info-item">
    <strong>🏫 College</strong>
    <p>{profile.college}</p>
  </div>

  <div className="info-item">
    <strong>🎓 Department</strong>
    <p>{profile.department}</p>
  </div>

  <div className="info-item">
    <strong>📚 Year</strong>
    <p>{profile.year}</p>
  </div>

  <span className="verified-badge">
    ✔ Verified Student
  </span>

</div>

      </div>

      <div className="campus-card">

  <h2>
    📦 Purchase Requests ({requests.length})
  </h2>

  {requests.length === 0 ? (

    <p>No purchase requests yet.</p>

  ) : (

    requests.map((request) => (

      <div
        key={request.id}
        className="request-card"
      >

        <h3>
          {request.product?.title}
        </h3>

        <p>
          Status :
          <strong>
            {" "}
            {request.status}
          </strong>
        </p>

        {request.status === "Pending" && (

          <div className="request-buttons">

            <button
              onClick={async () => {
                await acceptRequest(
                  request.id
                );

                window.location.reload();
              }}
            >
              Accept
            </button>

            <button
              onClick={async () => {
                await rejectRequest(
                  request.id
                );

                window.location.reload();
              }}
            >
              Reject
            </button>

          </div>

        )}

      </div>

    ))

  )}

</div>

      <div className="campus-card">

        <h2>⚙️ Settings</h2>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default MyCampus;