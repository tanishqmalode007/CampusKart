import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ForgotPassword() {
  const navigate = useNavigate();

  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      await forgotPassword(email);

      alert(
        "Password reset link has been sent to your email."
      );

      navigate("/login");

    } catch (error) {

      switch (error.code) {

        case "auth/user-not-found":
          alert("No account found with this email.");
          break;

        case "auth/invalid-email":
          alert("Please enter a valid email.");
          break;

        default:
          alert(error.message);

      }

    }

    setLoading(false);
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h1>Forgot Password</h1>

        <p>
          Enter your registered email address.
        </p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <button
          className="login-submit-btn"
          onClick={handleReset}
          disabled={loading}
        >
          {loading
            ? "Sending..."
            : "Send Reset Link"}
        </button>

      </div>

    </div>
  );
}

export default ForgotPassword;