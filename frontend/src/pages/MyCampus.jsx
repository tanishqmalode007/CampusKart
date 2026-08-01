import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardHome from "../components/dashboard/DashboardHome";
import MyListings from "../components/dashboard/MyListings";
import Wishlist from "../components/dashboard/Wishlist";
import PurchaseRequests from "../components/dashboard/PurchaseRequests";
import Settings from "../components/dashboard/Settings";

function MyCampus() {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "listings":
        return <MyListings />;

      case "wishlist":
        return <Wishlist />;

      case "requests":
        return <PurchaseRequests />;

      case "settings":
        return <Settings />;

      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="campus-container">

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="campus-layout">

        <div className="sidebar">

          <div className="user-box">

            <div className="avatar">👤</div>

            <h2>User</h2>

            <p>Verified Student</p>

          </div>

          <button onClick={() => setActivePage("dashboard")}>
            🏠 My Campus
          </button>

          <button onClick={() => setActivePage("listings")}>
            📦 My Listings
          </button>

          <button onClick={() => setActivePage("wishlist")}>
            ❤️ Wishlist
          </button>

          <button onClick={() => setActivePage("requests")}>
            🛒 Purchase Requests
          </button>

          <button>
            💬 Messages
          </button>

          <button onClick={() => setActivePage("settings")}>
            ⚙ Settings
          </button>

          <button onClick={() => navigate("/")}>
            🚪 Logout
          </button>

        </div>

        <div className="dashboard">

          {renderPage()}

        </div>

      </div>

    </div>
  );
}

export default MyCampus;