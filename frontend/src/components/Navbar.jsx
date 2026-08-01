import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSellClick = () => {
    if (isLoggedIn) {
      navigate("/sell");
    } else {
      setShowModal(true);
    }
  };

  const handleLogout = () => {
    logout();
    setShowMenu(false);
    navigate("/");
  };

  const goToMyCampus = () => {
    setShowMenu(false);
    navigate("/my-campus");
  };

  const goToListings = () => {
    setShowMenu(false);
    alert("My Listings Coming Soon 🚀");
  };

  const goToWishlist = () => {
    setShowMenu(false);
    alert("Wishlist Coming Soon ❤️");
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          <FaShoppingCart />
          <span>CampusKart</span>
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/browse">Browse</Link>
          </li>

          <li>
            <button
              className="nav-link-btn"
              onClick={handleSellClick}
            >
              Sell
            </button>
          </li>

          <li>About</li>
        </ul>

        {!isLoggedIn ? (
          <div className="nav-buttons">
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>

            <Link to="/register">
              <button className="register-btn">
                Register
              </button>
            </Link>
          </div>
        ) : (
          <div
            className="profile-menu"
            ref={menuRef}
          >
            <button
              className="profile-btn"
              onClick={() => setShowMenu(!showMenu)}
            >
              <FaUserCircle size={24} />
              user
            </button>

            {showMenu && (
              <div className="dropdown-menu">
                <button onClick={goToMyCampus}>
                  My Campus
                </button>

                <button onClick={goToListings}>
                  My Listings
                </button>

                <button onClick={goToWishlist}>
                  Wishlist
                </button>

                <button onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      <LoginModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        action="sell your products"
      />
    </>
  );
}

export default Navbar;