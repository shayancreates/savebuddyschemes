const express = require("express");
const router = express.Router();
const Loan = require("../models/Loan");

// Apply for loan
router.post("/apply", async (req, res) => {
    try {
        const { name, userId, loanAmount, loanDuration } = req.body;

        // Check if user has any pending or approved loans
        const existingLoan = await Loan.findOne({
            userId,
            status: { $in: ["Pending", "Approved"] }
        });

        if (existingLoan) {
            return res.status(400).json({
                message: "You already have an active loan application"
            });
        }

        // Calculate interest
        const interestRate = 5;
        const interestCharged = (loanAmount * interestRate * loanDuration) / (12 * 100);

        const newLoan = new Loan({
            username: name,
            userId,
            bankBalance: 50000, // Default balance for demo
            loanAmount,
            loanDuration,
            interestRate,
            interestCharged,
            eligibility: true
        });

        await newLoan.save();
        res.json({
            success: true,
            message: "Loan application submitted successfully!"
        });
    } catch (error) {
        console.error("Loan application error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while processing loan application"
        });
    }
});

// Get user's loans
router.get("/user/:userId", async (req, res) => {
    try {
        const loans = await Loan.find({ userId: req.params.userId });
        res.json(loans);
    } catch (error) {
        res.status(500).json({ message: "Error fetching loans" });
    }
});

// Get all loans (admin)
router.get("/all", async (req, res) => {
    try {
        const loans = await Loan.find().sort({ appliedDate: -1 });
        res.json(loans);
    } catch (error) {
        res.status(500).json({ message: "Error fetching loans" });
    }
});

// Update loan status
router.put("/update/:id", async (req, res) => {
    try {
        const { status } = req.body;
        const loan = await Loan.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json({ success: true, loan });
    } catch (error) {
        res.status(500).json({ message: "Error updating loan status" });
    }
});

module.exports = router;
