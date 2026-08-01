import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-card">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h1>Create Your Account</h1>

        <p>Join CampusKart</p>

        <input
          type="text"
          placeholder="Full Name"
        />

        <input
          type="email"
          placeholder="Email Address"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button>Create Account</button>

        <span>
          Already have an account?{" "}
          <a href="/login">Login</a>
        </span>

      </div>
    </div>
  );
}

export default Register;