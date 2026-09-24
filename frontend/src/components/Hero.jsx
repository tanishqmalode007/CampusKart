import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Hero() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleBrowse = () => {
    navigate("/browse");
  };

  const handleSell = () => {
    if (isLoggedIn) {
      navigate("/sell");
    } else {
      navigate("/login", {
        state: {
          message:
            "Please login first to sell your products on CampusKart.",
        },
      });
    }
  };

  return (
    <section className="hero">
      <div className="hero-text">

        <h1>Buy • Sell • Exchange</h1>

        <p>
          The marketplace exclusively for PVG students.
          Buy affordable items or sell what you no longer need.
        </p>

        <div className="hero-buttons">

          <button
            className="primary-btn"
            onClick={handleBrowse}
          >
            Browse Items
          </button>

          <button
            className="secondary-btn"
            onClick={handleSell}
          >
            Start Selling
          </button>

        </div>

      </div>

      <div className="hero-image">
        🎓📚💻
      </div>
    </section>
  );
}

export default Hero;