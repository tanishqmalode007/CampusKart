import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";

function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

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

  return (
    <>
      <nav className="navbar">

        <Link to="/" className="logo">
          <FaShoppingCart />
          <span>CampusKart</span>
        </Link>

       <ul className="nav-links desktop-nav">
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

  <li>
    <Link to="/about">
      About
    </Link>
  </li>
</ul>

        {!isLoggedIn ? (

          <div className="nav-buttons">

            <Link to="/login">
              <button className="login-btn">
                Login
              </button>
            </Link>

            <Link to="/register">
              <button className="register-btn">
                Register
              </button>
            </Link>

          </div>

        ) : (

          <div className="profile-menu">

            <button
              className="profile-btn"
              onClick={() => setShowMenu(!showMenu)}
            >
              <FaUserCircle size={24} />
              user
            </button>

            {showMenu && (

              <div className="dropdown-menu">

                <button onClick={() => navigate("/My-Campus")}>
                 My  Campus
                </button>

                <button>My Listings</button>

                <button>Wishlist</button>

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