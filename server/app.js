const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const mentorshipRoutes = require("./routes/mentorshipRoutes");
const messageRoutes = require("./routes/messageRoutes");
const postRoutes = require("./routes/postRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("College Alumni Networking API is Running 🚀");
});

// Authentication Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/mentorship", mentorshipRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;