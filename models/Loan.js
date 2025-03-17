const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Import UUID

const LoanSchema = new mongoose.Schema({
    loanId: { type: String, default: uuidv4 }, // Unique ID for each loan
    userId: { type: String, required: true }, // Link loan to user
    username: { type: String, required: true },
    bankBalance: { type: Number, required: true, default: 0 },
    eligibility: { type: Boolean, required: true, default: true },
    loanAmount: { type: Number, required: true },
    loanDuration: { type: Number, required: true },
    interestRate: { type: Number, default: 5 },
    interestCharged: { type: Number, default: 0 },
    status: { type: String, default: "Pending", enum: ["Pending", "Approved", "Rejected"] },
    appliedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Loan", LoanSchema);
