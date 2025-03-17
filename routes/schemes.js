const express = require("express");
const router = express.Router();
const Scheme = require("../models/Scheme");

// Get all schemes
router.get("/", async (req, res) => {
    try {
        const schemes = await Scheme.find();
        res.json(schemes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Apply for a scheme
router.post("/apply", async (req, res) => {
    const { userId, schemeId } = req.body;

    try {
        let user = await User.findById(userId);
        let scheme = await Scheme.findById(schemeId);

        if (!user || !scheme) {
            return res.status(404).json({ message: "User or Scheme not found" });
        }

        if (user.bankAccount.balance < scheme.minBalanceRequired) {
            return res.status(400).json({ message: "Insufficient balance to apply" });
        }

        user.appliedSchemes.push(schemeId);
        await user.save();

        res.json({ message: "Application Successful", scheme });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; // ✅ Ensure this is exported
