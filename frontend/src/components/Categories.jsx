function Categories() {
  const categories = [
    "📚 Books",
    "💻 Electronics",
    "🧮 Calculators",
    "🚲 Cycles",
    "🏠 Hostel Items",
    "📄 Notes",
  ];

  return (
    <div className="categories">
      <h2>Browse Categories</h2>

      <div className="category-grid">
        {categories.map((item, index) => (
          <div key={index} className="category-card">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;