import "./SplashScreen.css";

function SplashScreen() {
  return (
    <div className="splash-screen">

      <img
        src="/logo.png"
        alt="CampusKart Logo"
        className="splash-logo"
      />

      <h1>CampusKart</h1>

      <p>Buy • Sell • Exchange</p>

      <div className="loader"></div>

    </div>
  );
}

export default SplashScreen;