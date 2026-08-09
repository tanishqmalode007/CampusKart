import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

import { publishProduct } from "../services/productService";
import { uploadImages } from "../services/imageService";

function Sell() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [profile, setProfile] = useState(null);

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const snap = await getDoc(
        doc(db, "users", user.uid)
      );

      if (snap.exists()) {
        setProfile(snap.data());
      }
    };

    loadProfile();
  }, [user]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 5) {
      alert("Maximum 5 images allowed.");
      return;
    }

    setImages([...images, ...files]);
  };

  const handlePublish = async () => {
    if (
      !productName ||
      !price ||
      !category ||
      !condition ||
      !description ||
      !pickupLocation
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
        const imageUrls = await uploadImages(images);
      await publishProduct({
        ownerId: user.uid,

        ownerName: profile.fullName,

        ownerDepartment: profile.department,

        ownerYear: profile.year,

        ownerCollege: profile.college,

        title: productName,

        price: Number(price),

        category,

        condition,

        description,

        pickupLocation,
        
        imageUrls,
        });

      alert("🎉 Product Published Successfully!");

      navigate("/browse");

    } catch (error) {

      alert(error.message);

    }

    setLoading(false);
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
          Sell your unused items to students.
        </p>

        <label>
          Upload Product Images
        </label>

        <label className="upload-box">

          {images.length === 0 ? (

            <>
              <FaCloudUploadAlt className="upload-icon" />

              <span>
                Tap to Upload Images
              </span>

              <small>
                Maximum 5 Images
              </small>
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
            hidden
            multiple
            accept="image/*"
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
          onChange={(e) =>
            setProductName(e.target.value)
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="">
            Select Category
          </option>

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
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <select
          value={condition}
          onChange={(e) =>
            setCondition(e.target.value)
          }
        >
          <option value="">
            Select Condition
          </option>

          <option>New</option>

          <option>Like New</option>

          <option>Good</option>

          <option>Fair</option>

        </select>

        <textarea
          rows="5"
          placeholder="Describe your product..."
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Pickup Location"
          value={pickupLocation}
          onChange={(e) =>
            setPickupLocation(e.target.value)
          }
        />

        <button
          className="publish-btn"
          onClick={handlePublish}
          disabled={loading}
        >
          {loading
            ? "Publishing..."
            : "Publish Listing"}
        </button>

      </div>

    </div>
  );
}

export default Sell;