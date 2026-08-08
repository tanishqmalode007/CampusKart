import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

import { useEffect, useState } from "react";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function MyCampus() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data());
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

        <h2>📦 Purchase Requests</h2>

        <p>
          You don't have any purchase requests yet.
        </p>

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