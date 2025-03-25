const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // 🔹 Import JWT
const router = express.Router();
const User = require('../models/user.js');

const JWT_SECRET = "your_secret_key"; // 🔹 Use a strong secret key

router.post(
    "/creatuser",
    [
        body('email', 'Enter a valid email').isEmail(),
        body('name', 'Name should be at least 3 characters').isLength({ min: 3 }),
        body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const user = await User.create({
                name: req.body.name,
                password: hashedPassword,
                email: req.body.email,
                location: req.body.location
            });

            const payload = { user: { id: user.id } }; // 🔹 Payload contains user ID
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }); // 🔹 Generate JWT

            res.json({ success: true, token });
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
);

router.post(
    "/loginuser",
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            let user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ success: false, errors: "Try login with correct credentials" });
            }

            const passwordMatch = await bcrypt.compare(req.body.password, user.password);
            if (!passwordMatch) {
                return res.status(400).json({ success: false, errors: "Try login with correct credentials" });
            }

            const payload = { user: { id: user.id } }; // 🔹 Payload contains user ID
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }); // 🔹 Generate JWT

            res.json({ success: true, token });
        } catch (error) {
            console.error("Error logging in user:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
);

module.exports = router;
