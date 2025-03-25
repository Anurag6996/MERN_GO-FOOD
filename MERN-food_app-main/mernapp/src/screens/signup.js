import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "", // ✅ Fixed: Changed from 'geolocation' to 'location'
  });

  const [bgColor, setBgColor] = useState("#1e3d32");
  const [successMessage, setSuccessMessage] = useState(""); // For showing success message
  const navigate = useNavigate(); // For redirecting to login page

  const colors = ["#2e8b57", "#3cb371", "#66cdaa", "#20b2aa", "#008b8b", "#2f4f4f", "#556b2f"];

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });

    let index = event.target.value.length % colors.length;
    setBgColor(colors[index]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/creatuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();
    console.log(json);

    if (json?.success) {
      setSuccessMessage("Account created successfully! Redirecting to login...");

      // After 2 seconds, redirect to login page
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setSuccessMessage(""); // Clear the message if the sign-up failed
      alert("Enter valid credentials");
    }
  };

  return (
    <motion.div
      className="signup-container"
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
        className="signup-form"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          background: "#f0fff0",
          padding: "2rem",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          width: "350px",
        }}
      >
        <motion.h2
          style={{ color: "#2e8b57", marginBottom: "1rem" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Create an Account
        </motion.h2>

        {successMessage && (
          <motion.div
            style={{
              background: "#0a1f33",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
              color: "#fff",
              fontWeight: "bold",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            {successMessage}
          </motion.div>
        )}

        <motion.input
          type="text"
          name="name"
          placeholder="Full Name"
          value={credentials.name}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            margin: "10px 0",
            border: "1px solid #3cb371",
            borderRadius: "8px",
            fontSize: "1rem",
            outline: "none",
          }}
          whileFocus={{ scale: 1.05 }}
        />

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
            border: "1px solid #3cb371",
            borderRadius: "8px",
            fontSize: "1rem",
            outline: "none",
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
            border: "1px solid #3cb371",
            borderRadius: "8px",
            fontSize: "1rem",
            outline: "none",
          }}
          whileFocus={{ scale: 1.05 }}
        />

        <motion.input
          type="text"
          name="location" // ✅ Fixed: Changed from 'geolocation' to 'location'
          placeholder="Address"
          value={credentials.location}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            margin: "10px 0",
            border: "1px solid #3cb371",
            borderRadius: "8px",
            fontSize: "1rem",
            outline: "none",
          }}
          whileFocus={{ scale: 1.05 }}
        />

        <motion.button
          type="submit"
          style={{
            background: "linear-gradient(45deg, #2e8b57, #66cdaa)",
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
          Sign Up
        </motion.button>

        <Link
          to="/login"
          style={{
            display: "block",
            marginTop: "15px",
            color: "#2e8b57",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Already have an account? Login
        </Link>
      </motion.form>
    </motion.div>
  );
}
