import { useNavigate } from "react-router-dom";

function Sell() {
  const navigate = useNavigate();

  return (
    <div className="sell-container">
      <div className="sell-card">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h1>Sell Your Product</h1>

        <input type="text" placeholder="Product Name" />

        <input type="number" placeholder="Price (₹)" />

        <select>
          <option>Select Category</option>
          <option>Books</option>
          <option>Electronics</option>
          <option>Furniture</option>
          <option>Stationery</option>
          <option>Others</option>
        </select>

        <select>
          <option>Condition</option>
          <option>New</option>
          <option>Used</option>
        </select>

        <textarea
          placeholder="Product Description"
          rows="5"
        ></textarea>

        <input type="file" />

        <button>Publish Product</button>

      </div>
    </div>
  );
}

export default Sell;