import { Link } from "react-router-dom";

function LoginModal({ isOpen, onClose, action }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="login-modal">

        <h2>Join CampusKart</h2>

        <p>
          Login or create an account to {action}.
        </p>

        <div className="modal-benefits">
          <p>✅ Buy Products</p>
          <p>✅ Sell Products</p>
          <p>❤️ Save Wishlist</p>
          <p>💬 Contact Sellers</p>
        </div>

        <div className="modal-buttons">
          <Link to="/login" onClick={onClose}>
            <button className="login-btn">Login</button>
          </Link>

          <Link to="/register" onClick={onClose}>
            <button className="register-btn">
              Create Account
            </button>
          </Link>
        </div>

        <button
          className="close-btn"
          onClick={onClose}
        >
          Maybe Later
        </button>

      </div>
    </div>
  );
}

export default LoginModal;