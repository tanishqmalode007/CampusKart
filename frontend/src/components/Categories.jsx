import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Books",
      icon: "📚",
    },
    {
      name: "Electronics",
      icon: "💻",
    },
    {
      name: "Calculators",
      icon: "🧮",
    },
    {
      name: "Cycles",
      icon: "🚲",
    },
    {
      name: "Hostel Items",
      icon: "🏠",
    },
    {
      name: "Notes",
      icon: "📄",
    },
  ];

  const handleCategory = (category) => {
    navigate(
      `/browse?category=${encodeURIComponent(category)}`
    );
  };

  return (
    <div className="categories">

      <h2>Browse Categories</h2>

      <div className="category-grid">

        {categories.map((category) => (
          <div
            key={category.name}
            className="category-card"
            onClick={() => handleCategory(category.name)}
          >
            {category.icon} {category.name}
          </div>
        ))}

      </div>

    </div>
  );
}

export default Categories;