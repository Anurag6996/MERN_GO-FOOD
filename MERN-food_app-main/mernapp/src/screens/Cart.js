import React, { useState } from "react";
import { useCart } from "../components/ContextReducer";

export default function Cart({ closeCart }) {
  const { state, dispatch } = useCart();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
  });

  // Calculate total price
  const totalAmount = state.cartItems.reduce((sum, item) => sum + item.price, 0);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (!formData.username || !formData.email || !formData.phone || !formData.address) {
      alert("Please fill all details before checking out.");
      return;
    }

    const orderData = {
      ...formData,
      cartItems: state.cartItems,
      totalAmount,
    };

    try {
      const response = await fetch("http://localhost:5000/api/place-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        dispatch({ type: "CLEAR_CART" });
        alert("Order placed successfully! You can see your order in 'My Orders'");

        // Optionally redirect user to My Orders page
        window.location.href = "/myorders";
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          width: "95%",
          maxWidth: "700px",
          minHeight: "400px",
          maxHeight: "90vh", // Allows scrolling
          padding: "20px",
          textAlign: "center",
          borderRadius: "10px",
          position: "relative",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "auto", // Enables vertical scroll
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeCart}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "red",
            color: "white",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
            fontSize: "16px",
            borderRadius: "50%",
          }}
        >
          ❌
        </button>

        <h2 style={{ marginBottom: "20px", fontSize: "24px" }}>My Cart</h2>

        {/* Cart Items */}
        {state.cartItems.length === 0 ? (
          <p style={{ fontSize: "18px", color: "#333" }}>Your cart is empty.</p>
        ) : (
          <>
            <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #ddd" }}>
                  <th style={{ padding: "10px" }}>Food Item</th>
                  <th style={{ padding: "10px" }}>Size</th>
                  <th style={{ padding: "10px" }}>Qty</th>
                  <th style={{ padding: "10px" }}>Price</th>
                </tr>
              </thead>
              <tbody>
                {state.cartItems.map((item, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "10px" }}>{item.name}</td>
                    <td style={{ padding: "10px" }}>{item.size}</td>
                    <td style={{ padding: "10px" }}>{item.quantity}</td>
                    <td style={{ padding: "10px" }}>₹{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 style={{ marginTop: "20px" }}>Total Amount: ₹{totalAmount}</h3>

            {/* User Details Form */}
            <div style={{ width: "100%", maxWidth: "400px", textAlign: "left", marginTop: "20px" }}>
              <input
                type="text"
                name="username"
                placeholder="Full Name"
                value={formData.username}
                onChange={handleChange}
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              />
              <textarea
                name="address"
                placeholder="Delivery Address"
                value={formData.address}
                onChange={handleChange}
                style={{ width: "100%", padding: "10px", marginBottom: "10px", height: "60px" }}
              />
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              style={{
                background: "green",
                color: "white",
                padding: "10px 15px",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                borderRadius: "5px",
                marginTop: "10px",
              }}
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
