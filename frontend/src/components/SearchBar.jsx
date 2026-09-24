import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    const query = search.trim();

    if (query) {
      navigate(`/browse?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/browse");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="search-section">

      <h2>Find Student Essentials</h2>

      <div className="search-box">

        <input
          type="text"
          placeholder="Search books, calculators, electronics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button onClick={handleSearch}>
          Search
        </button>

      </div>

    </section>
  );
}

export default SearchBar;