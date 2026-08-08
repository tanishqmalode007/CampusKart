import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, googleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // ==========================
  // Email Login
  // ==========================

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const result = await login(email, password);

      const docRef = doc(db, "users", result.user.uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const redirectTo = location.state?.from || "/";
        navigate(redirectTo, { replace: true });
      } else {
        navigate("/complete-profile");
      }

    } catch (error) {

      switch (error.code) {

        case "auth/user-not-found":
          alert("No account found with this email.");
          break;

        case "auth/wrong-password":
          alert("Incorrect password.");
          break;

        case "auth/invalid-credential":
          alert("Invalid email or password.");
          break;

        case "auth/invalid-email":
          alert("Please enter a valid email address.");
          break;

        default:
          alert(error.message);

      }

    }

    setLoading(false);
  };

  // ==========================
  // Google Login
  // ==========================

  const handleGoogleLogin = async () => {
    try {

      setLoading(true);

      const user = await googleLogin();

      const docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const redirectTo = location.state?.from || "/";
        navigate(redirectTo, { replace: true });
      } else {
        navigate("/complete-profile");
      }

    } catch (error) {

      alert(error.message);

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

        {location.state?.message && (

          <div className="login-alert">
            🔒 {location.state.message}
          </div>

        )}

        <h1>Welcome Back 👋</h1>

        <p>Login to your CampusKart account</p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p
          className="forgot-password"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </p>

        <button
          className="login-submit-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging In..." : "Login"}
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <button
          className="google-login-btn"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          Continue with Google
        </button>

        <p className="register-link">
          Don't have an account?{" "}
          <a href="/register">
            Create Account
          </a>
        </p>

      </div>

    </div>
  );
}

export default Login;