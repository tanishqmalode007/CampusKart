import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ProductDetails() {
  const navigate = useNavigate();

  const product = {
    images: [
      "https://picsum.photos/700/500?1",
      "https://picsum.photos/700/500?2",
      "https://picsum.photos/700/500?3",
      "https://picsum.photos/700/500?4",
      "https://picsum.photos/700/500?5",
    ],

    name: "Engineering Mechanics Book",

    price: 350,

    category: "Books",

    condition: "Good",

    seller: "Rahul",

    college: "PVG COE",

    department: "IT",

    description:
      "Engineering Mechanics Book in excellent condition. No torn pages and very less used.",

    location: "College Canteen",
  };

  const [selectedImage, setSelectedImage] = useState(
    product.images[0]
  );

  return (
    <div className="details-container">

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="image-gallery">

        <div className="thumbnail-column">

          {product.images.map((image, index) => (

            <img
              key={index}
              src={image}
              alt={`Preview ${index + 1}`}
              className={`thumbnail ${
                selectedImage === image
                  ? "active-thumbnail"
                  : ""
              }`}
              onClick={() =>
                setSelectedImage(image)
              }
            />

          ))}

        </div>

        <div className="main-image-container">

          <img
            src={selectedImage}
            alt={product.name}
            className="details-image"
          />

        </div>

      </div>

      <h1>{product.name}</h1>

      <h2>₹{product.price}</h2>

      <div className="details-info">

        <p>
          <strong>Category:</strong>{" "}
          {product.category}
        </p>

        <p>
          <strong>Condition:</strong>{" "}
          {product.condition}
        </p>

        <p>
          <strong>Seller:</strong>{" "}
          {product.seller}
        </p>

        <p>
          <strong>College:</strong>{" "}
          {product.college}
        </p>

        <p>
          <strong>Department:</strong>{" "}
          {product.department}
        </p>

      </div>

      <div className="details-description">

        <h3>Description</h3>

        <p>{product.description}</p>

      </div>

      <div className="details-location">

        <h3>Pickup Location</h3>

        <p>{product.location}</p>

      </div>

      <button className="buy-btn">
        Contact Seller
      </button>

    </div>
  );
}

export default ProductDetails;