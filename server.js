require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "An internal server error occurred"
    });
});

// MongoDB Connection with proper error handling
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    });

// Routes
const loanRoutes = require("./routes/loanRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bankRoutes = require("./routes/bankRoutes");

app.use("/api/loans", loanRoutes);
app.use("/api/admin", adminRoutes.router);
app.use("/api/bank", bankRoutes);

// Handle 404
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
