function SearchBar() {
  return (
    <section className="search-section">

      <h2>Find Student Essentials</h2>

      <div className="search-box">

        <input
          type="text"
          placeholder="Search books, calculators, electronics..."
        />

        <button>
          Search
        </button>

      </div>

    </section>
  );
}

export default SearchBar;