const mongoose = require("mongoose");

const SchemeSchema = new mongoose.Schema({
    name: String,
    description: String,
    minBalanceRequired: Number,
    interestRate: Number,
});

module.exports = mongoose.model("Scheme", SchemeSchema);
