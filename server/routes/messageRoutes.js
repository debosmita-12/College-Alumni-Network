const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  sendMessage,
  getConversation,
  getChatContacts,
  clearConversation,
} = require("../controllers/messageController");

router.get("/contacts", protect, getChatContacts);

router.post("/send", protect, sendMessage);

router.get("/conversation/:userId", protect, getConversation);

router.delete(
  "/conversation/:userId",
  protect,
  clearConversation
);
module.exports = router;