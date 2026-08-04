import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero.png";
import { useAuth } from "../context/AuthContext";

function WelcomeModal({ isOpen, onClose }) {
  const { isLoggedIn } = useAuth();

  if (!isOpen || isLoggedIn) return null;

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      console.log("Logged in:", result.user);

      onClose();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="welcome-overlay">
      <div className="welcome-modal">

        <button
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <img
          src={heroImage}
          alt="CampusKart"
          className="welcome-image"
        />

        <h2>Welcome to CampusKart</h2>

        <p>
          Buy • Sell • Exchange with verified students.
        </p>

        <button
          className="google-btn"
          onClick={handleGoogleLogin}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="google-icon"
          />

          <span>Continue with Google</span>
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