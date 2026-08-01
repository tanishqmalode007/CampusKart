function DashboardHome() {
  return (
    <div>
      <h1>Welcome Back 👋</h1>

      <div className="stats">
        <div className="stat-card">
          <h2>0</h2>
          <p>Products</p>
        </div>

        <div className="stat-card">
          <h2>0</h2>
          <p>Wishlist</p>
        </div>

        <div className="stat-card">
          <h2>0</h2>
          <p>Requests</p>
        </div>

        <div className="stat-card">
          <h2>0</h2>
          <p>Messages</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;