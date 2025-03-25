import React, { useState } from "react";
import { useCart } from "../components/ContextReducer";
import { useNavigate } from "react-router-dom";

export default function Card({ data }) {
  const { dispatch } = useCart();
  const navigate = useNavigate();

  // Extract available size options
  const sizeOptions = data.options && data.options.length > 0 ? Object.keys(data.options[0]) : [];

  // State for quantity and size
  const [quantity, setQuantity] = useState("Qnt");
  const [selectedSize, setSelectedSize] = useState("Size");

  // Calculate total price dynamically
  const pricePerUnit = selectedSize !== "Size" ? data.options[0][selectedSize] : 0;
  const totalPrice = quantity !== "Qnt" ? quantity * pricePerUnit : 0;

  // Handle add to cart
  const handleAddToCart = () => {
    // Check if the user is logged in
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
      return;
    }

    // Ensure both quantity and size are selected
    if (quantity === "Qnt" || selectedSize === "Size") {
      alert("Please select quantity and size before adding to cart.");
      return;
    }

    // Add item to cart
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        name: data.name,
        quantity,
        size: selectedSize,
        price: totalPrice,
      },
    });

    // Reset dropdowns after adding to cart
    setQuantity("Qnt");
    setSelectedSize("Size");
  };

  return (
    <div className="card mt-2 shadow-sm rounded-3" style={{ width: "18rem", maxHeight: "450px", overflow: "hidden" }}>
      <img src={data.img} className="card-img-top" alt={data.name} style={{ height: "120px", objectFit: "cover" }} />
      <div className="card-body p-3 d-flex flex-column justify-content-between" style={{ backgroundColor: "#e8f5e9" }}>
        <h6 className="card-title mb-1 text-truncate" style={{ fontWeight: "bold" }}>{data.name}</h6>
        <p className="card-text text-muted mb-2" style={{ fontSize: "0.85rem", height: "40px", overflow: "hidden", textOverflow: "ellipsis" }}>{data.description}</p>
        
        <div className="container w-100 d-flex align-items-center justify-content-between gap-2">
          {/* Quantity Dropdown */}
          <select className="form-select" style={{ width: "30%", fontSize: "0.85rem", padding: "4px" }}
            value={quantity} onChange={(e) => setQuantity(e.target.value)}>
            <option value="Qnt">Qnt</option>
            {Array.from({ length: 6 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>

          {/* Size Selection Dropdown */}
          <select className="form-select" style={{ width: "30%", fontSize: "0.85rem", padding: "4px" }}
            value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
            <option value="Size">Size</option>
            {sizeOptions.map((size, index) => (
              <option key={index} value={size}>
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </option>
            ))}
          </select>

          {/* Price Display */}
          <div className="fs-6 fw-bold text-success text-nowrap">
            ₹{totalPrice || "N/A"}
          </div>
        </div>
        
        <hr className="my-2" />
        <button className="btn text-white w-100" style={{ backgroundColor: "#355E3B", borderRadius: "5px", padding: "6px 0" }} onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}




