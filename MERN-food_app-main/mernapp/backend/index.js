const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

const mongoDB = require("./db");
mongoDB();

// Use CORS middleware properly
app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend requests
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed request methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Middleware for JSON parsing
app.use(express.json());

// Routes
app.use("/api", require("./Routes/CreatUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData")); // ✅ Ensure this is after express.json()

// Test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
