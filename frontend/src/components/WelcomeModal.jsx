import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function WelcomeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="welcome-overlay">

      <div className="welcome-modal">

        <button
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        {/* CampusKart Cart Logo */}

        <div className="welcome-logo">
          <FaShoppingCart className="welcome-cart" />
        </div>

        <h2>Welcome to CampusKart</h2>

        <p>
          Buy • Sell • Exchange with verified students.
        </p>

        <button className="google-btn">
          Continue with Google
        </button>

        <Link to="/login">
          <button className="login-btn">
            Login
          </button>
        </Link>

        <Link to="/register">
          <button className="register-btn">
            Create Account
          </button>
        </Link>

        <button
          className="guest-btn"
          onClick={onClose}
        >
          Browse as Guest →
        </button>

      </div>

    </div>
  );
}

export default WelcomeModal;