import { Link } from "react-router-dom";

function LoginModal({
  isOpen,
  onClose,
  title = "Login Required",
  message = "Please login to continue.",
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="login-modal">

        <h2>{title}</h2>

        <p>{message}</p>

        <div className="modal-benefits">
          <p>✅ Buy Products</p>
          <p>✅ Sell Products</p>
          <p>❤️ Save Wishlist</p>
          <p>💬 Contact Sellers</p>
        </div>

        <div className="modal-buttons">

          <Link to="/login" onClick={onClose}>
            <button className="login-btn">
              Login
            </button>
          </Link>

          <Link to="/register" onClick={onClose}>
            <button className="register-btn">
              Create Account
            </button>
          </Link>

        </div>

        <button
          className="cancel-btn"
          onClick={onClose}
        >
          Continue as Guest
        </button>

      </div>
    </div>
  );
}

export default LoginModal;