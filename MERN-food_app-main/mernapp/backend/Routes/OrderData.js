const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

// Place an order
router.post("/place-order", async (req, res) => {
  try {
    const { username, email, phone, address, cartItems, totalAmount } = req.body;

    const newOrder = new Order({
      username,
      email,
      phone,
      address,
      cartItems,
      totalAmount,
      date: new Date(),
    });

    await newOrder.save();
    res.status(201).json({ success: true, message: "Order placed successfully!" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Fetch all orders
router.get("/get-orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 }); // Latest orders first
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
