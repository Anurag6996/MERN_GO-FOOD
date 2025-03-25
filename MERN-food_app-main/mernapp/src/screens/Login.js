import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(""); // ✅ Added message state

  const colors = ["#e8f5e9", "#d0f0c0", "#b2d8b2", "#8fbc8f", "#6fa96f", "#4a7c59", "#355e3b"];
  const [bgColor, setBgColor] = useState("#e8f5e9");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
    let index = event.target.value.length % colors.length;
    setBgColor(colors[index]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json(); // ✅ Fixed variable name to 'data'

    if (data.success) {
      localStorage.setItem("authToken", data.authToken);
      setMessage("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setMessage("Invalid login credentials");
    }
  };

  return (
    <motion.div
      className="login-container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: bgColor,
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="login-form"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          background: "#ffffff",
          padding: "2rem",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          width: "350px",
          border: "2px solid #4a7c59",
        }}
      >
        <motion.h2
          style={{ color: "#355e3b", marginBottom: "1rem" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Login
        </motion.h2>

        <motion.input
          type="email"
          name="email"
          placeholder="Email Address"
          value={credentials.email}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            margin: "10px 0",
            border: "1px solid #6fa96f",
            borderRadius: "8px",
            fontSize: "1rem",
            outline: "none",
            backgroundColor: "#e8f5e9",
          }}
          whileFocus={{ scale: 1.05 }}
        />

        <motion.input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            margin: "10px 0",
            border: "1px solid #6fa96f",
            borderRadius: "8px",
            fontSize: "1rem",
            outline: "none",
            backgroundColor: "#e8f5e9",
          }}
          whileFocus={{ scale: 1.05 }}
        />

        <motion.button
          type="submit"
          style={{
            background: "linear-gradient(45deg, #4a7c59, #355e3b)",
            color: "#fff",
            padding: "12px",
            width: "100%",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            marginTop: "10px",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Login
        </motion.button>

        {/* ✅ Message Display */}
        {message && (
          <motion.p
            style={{
              marginTop: "10px",
              color: message.includes("successful") ? "green" : "red",
              fontWeight: "bold",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message}
          </motion.p>
        )}

        <Link
          to="/creatuser"
          style={{
            display: "block",
            marginTop: "15px",
            color: "#355e3b",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          New here? Sign up
        </Link>
      </motion.form>
    </motion.div>
  );
}
