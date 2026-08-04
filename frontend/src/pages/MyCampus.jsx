import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function MyCampus() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Dummy user (Firebase later)
  const user = {
    name: "Student Name",
    year: "Second Year",
    department: "IT",
    college: "PVG COE, Nashik",
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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

        <h2>{user.name}</h2>

        <div className="profile-info">

          <p>📚 {user.year} • {user.department}</p>

          <p>🏫 {user.college}</p>

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