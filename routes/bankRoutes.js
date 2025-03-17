const express = require("express");
const router = express.Router();
const BankAccount = require("../models/BankAccount");

// Add new bank account
router.post("/add", async (req, res) => {
    try {
        const { userId, cardNumber, cvv, expiryDate, balance } = req.body;
        const newAccount = new BankAccount({
            userId,
            cardNumber,
            cvv,
            expiryDate,
            balance
        });
        await newAccount.save();
        res.json({ success: true, account: newAccount });
    } catch (error) {
        res.status(500).json({ message: "Error adding bank account" });
    }
});

// Get user's bank accounts
router.get("/accounts/:userId", async (req, res) => {
    try {
        const accounts = await BankAccount.find({ userId: req.params.userId });
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching accounts" });
    }
});

// Update account balance (when loan is approved)
router.put("/update-balance/:accountId", async (req, res) => {
    try {
        const { amount } = req.body;
        const account = await BankAccount.findById(req.params.accountId);
        account.balance += amount;
        await account.save();
        res.json({ success: true, newBalance: account.balance });
    } catch (error) {
        res.status(500).json({ message: "Error updating balance" });
    }
});

module.exports = router; 