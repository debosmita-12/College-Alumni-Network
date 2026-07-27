const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getConversation,
} = require("../controllers/messageController");

const protect = require("../middleware/authMiddleware");

// Send a message
router.post("/send", protect, sendMessage);

// Get conversation with another user
router.get("/conversation/:userId", protect, getConversation);

module.exports = router;