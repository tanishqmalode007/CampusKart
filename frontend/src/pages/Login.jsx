import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
  const handleLogin = () => {
    if (email.trim() === "" || password.trim() === "") {
      alert("Please enter your email and password.");
      return;
    }

    login();
    navigate("/");
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

       <a
  href="#"
  className="forgot-password"
>
  Forgot Password?
</a>

<button
  className="login-submit-btn"
  onClick={handleLogin}
>
  Login
</button>

<div className="divider">
  <span>OR</span>
</div>

<button className="google-login-btn">
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