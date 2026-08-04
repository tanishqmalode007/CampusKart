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

        <p>Join CampusKart and start buying & selling.</p>

        <input
          type="text"
          placeholder="Full Name"
        />

        <input
          type="email"
          placeholder="Email Address"
        />

        <input
          type="tel"
          placeholder="Mobile Number"
        />

        <input
          type="text"
          placeholder="College Name"
        />

        <select defaultValue="">
          <option value="" disabled>
            Select Department
          </option>

          <option>Information Technology (IT)</option>
          <option>Computer Engineering</option>
          <option>Mechanical Engineering</option>
          <option>ENTC</option>
          <option>Artificial Intelligence & Data Science (AI & DS)</option>
        </select>

        <select defaultValue="">
          <option value="" disabled>
            Select Year
          </option>

          <option>First Year (FE)</option>
          <option>Second Year (SE)</option>
          <option>Third Year (TE)</option>
          <option>Final Year (BE)</option>
        </select>

        <input
          type="password"
          placeholder="Password"
        />

        <input
          type="password"
          placeholder="Confirm Password"
        />

        <label className="terms-check">
          <input type="checkbox" />
          <span>I agree to the Terms & Conditions</span>
        </label>

        <button className="create-btn">
          Create Account
        </button>

        <p className="login-link">
          Already have an account?{" "}
          <a href="/login">Login</a>
        </p>

      </div>
    </div>
  );
}

export default Register;