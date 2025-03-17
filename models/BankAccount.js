const mongoose = require("mongoose");

const BankAccountSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    cardNumber: { type: String, required: true, unique: true },
    cvv: { type: String, required: true },
    expiryDate: { type: String, required: true },
    balance: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("BankAccount", BankAccountSchema); 