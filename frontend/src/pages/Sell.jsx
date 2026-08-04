import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

function Sell() {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
  const files = Array.from(e.target.files);

  if (files.length + images.length > 5) {
    alert("Maximum 5 images allowed.");
    return;
  }

  setImages([...images, ...files]);
};
  const handlePublish = () => {
    if (
      !productName ||
      !price ||
      !category ||
      !condition ||
      !description ||
      !pickupLocation ||
      images.length === 0
    ) {
      alert("Please fill all fields.");
      return;
    }

    alert("🎉 Product Listed Successfully!");

    navigate("/my-campus");
  };

  return (
    <div className="sell-container">
      <div className="sell-card">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h1>📦 Sell an Item</h1>

        <p>
          Sell your unused items to other students.
        </p>

        <label>Upload Product Images</label>

<label className="upload-box">

  {images.length === 0 ? (
    <>
      <FaCloudUploadAlt className="upload-icon" />
      <span>Tap to Upload Images</span>
      <small>Maximum 5 Images</small>
    </>
  ) : (
    <div className="preview-grid">

      {images.map((img, index) => (
        <img
          key={index}
          src={URL.createObjectURL(img)}
          alt=""
          className="preview-image"
        />
      ))}

    </div>
  )}

  <input
    type="file"
    accept="image/*"
    multiple
    hidden
    onChange={handleImageChange}
  />

</label>

<p className="image-count">
  {images.length} / 5 Images Selected
</p>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option>Books</option>
          <option>Electronics</option>
          <option>Calculators</option>
          <option>Bags</option>
          <option>Hostel Essentials</option>
          <option>Other</option>
        </select>

        <input
          type="number"
          placeholder="Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="">Select Condition</option>
          <option>New</option>
          <option>Like New</option>
          <option>Good</option>
          <option>Fair</option>
        </select>

        <textarea
          rows="5"
          placeholder="Describe your product..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Pickup Location"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
        />

        <button
          className="publish-btn"
          onClick={handlePublish}
        >
          Publish Listing
        </button>

      </div>
    </div>
  );
}

export default Sell;