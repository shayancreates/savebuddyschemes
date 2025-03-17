const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create a dummy user (For testing purposes)
router.post("/create", async (req, res) => {
    try {
        const dummyUser = new User({
            name: "John Doe",
            phone: "9876543210",
            bankAccount: {
                accountNumber: "123456789012",
                cvv: "123",
                expiryDate: "12/26",
                balance: 50000
            },
            income: 150000, // 1.5 Lakh
            bpl: false
        });

        await dummyUser.save();
        res.json(dummyUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get user by ID (Simulated)
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
