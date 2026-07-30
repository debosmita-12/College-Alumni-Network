const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const mentorshipRoutes = require("./routes/mentorshipRoutes");
const messageRoutes = require("./routes/messageRoutes");
const postRoutes = require("./routes/postRoutes");
const opportunityRoutes = require("./routes/opportunityRoutes");
const adminRoutes = require("./routes/adminRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const app = express();

// ======================================
// Middlewares
// ======================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/admin", adminRoutes);
app.use("/api/dashboard", dashboardRoutes);
// ======================================
// Health Check
// ======================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🎓 Alumni Nexus API is Running Successfully",
  });
});

// ======================================
// API Routes
// ======================================

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/mentorship", mentorshipRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/posts", postRoutes);

app.use("/api/opportunities", opportunityRoutes);

// app.use("/api/admin", adminRoutes);

// ======================================
// 404 Route
// ======================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

module.exports = app;