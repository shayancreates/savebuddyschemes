const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

// Admin login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (username === "admin123" && password === "123") {
            const token = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Middleware to protect admin routes
const adminAuth = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json({ message: "No token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.isAdmin) {
            next();
        } else {
            res.status(401).json({ message: "Not authorized" });
        }
    } catch (error) {
        res.status(401).json({ message: "Token invalid" });
    }
};

module.exports = { router, adminAuth }; 