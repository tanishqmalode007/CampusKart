
import LoginModal from "./LoginModal";import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaUserCircle,
  FaHome,
  FaSearch,
  FaDollarSign,
  FaInfoCircle,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

function MobileNavbar() {
  const { user, isLoggedIn, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const handleLogout = async () => {
    await logout();
    setProfileOpen(false);
    navigate("/");
  };
  

  return (
    <>
      <nav className="mobile-navbar">

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(true)}
        >
          <FaBars />
        </button>

        <Link
          to="/"
          className="mobile-logo"
        >
          <FaShoppingCart />
          <span>CampusKart</span>
        </Link>

        {!isLoggedIn ? (
          <Link
            to="/login"
            className="mobile-login-btn"
          >
            Login
          </Link>
        ) : (
          <div
            className="mobile-profile"
            ref={profileRef}
          >
            <button
              className="mobile-profile-btn"
                onClick={(e) => {
                e.stopPropagation();
                setProfileOpen(!profileOpen);
                }}
                >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="profile-image"
                />
              ) : (
                <FaUserCircle />
              )}
            </button>

            {profileOpen && (
              <div className="mobile-profile-dropdown">

                <button
                  onClick={() => {
                    navigate("/my-campus");
                    setProfileOpen(false);
                  }}
                >
                  🏫 My Campus
                </button>

               <button
                    onClick={() => {
                    navigate("/my-listings");
                    setProfileOpen(false);
                    }}
                    >
                        📦 My Listings
                </button>
                <button
  onClick={() => {
    navigate("/my-purchase-requests");
    setProfileOpen(false);
  }}
>
  🛒 My Requests
</button>

                <button
                  onClick={() => {
                    alert("Wishlist Coming Soon");
                    setProfileOpen(false);
                  }}
                >
                  ❤️ Wishlist
                </button>

                <button onClick={handleLogout}>
                  🚪 Logout
                </button>

              </div>
            )}

          </div>
        )}

      </nav>

      {menuOpen && (
        <>
          <div
            className="mobile-overlay"
            onClick={() => setMenuOpen(false)}
          />

          <div className="mobile-sidebar">
            

            <button
              className="close-sidebar"
              onClick={() => setMenuOpen(false)}
            >
              <FaTimes />
            </button>

           <div className="sidebar-logo">
                        <FaShoppingCart />
                            <span>CampusKart</span>
                        </div>

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
            >
             <FaHome />
<span>Home</span>
            </Link>

            <Link
              to="/browse"
              onClick={() => setMenuOpen(false)}
            >
             <FaSearch />
<span>Browse</span>
            </Link>

            <Link
              to="/sell"
              onClick={() => setMenuOpen(false)}
            >
              <FaDollarSign />
<span>Sell Item</span>
            </Link>

            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
            >
             <FaInfoCircle />
<span>About</span>
            </Link>

          </div>
        </>
      )}
    </>
  );
}

export default MobileNavbar;