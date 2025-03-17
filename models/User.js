const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true, unique: true }, // Unique ID for the user
    phone: { type: String, required: true },
    bankAccount: {
        accountNumber: { type: String, required: true },
        balance: { type: Number, required: true }
    },
    income: { type: Number, required: true },
    bpl: { type: Boolean, required: true } // Below Poverty Line Status
});

module.exports = mongoose.model("User", UserSchema);
