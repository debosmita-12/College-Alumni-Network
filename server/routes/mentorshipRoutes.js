const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  sendRequest,
  getReceivedRequests,
  acceptRequest,
  rejectRequest,
} = require("../controllers/mentorshipController");
// Send Mentorship Request
router.post("/request", protect, sendRequest);
router.get("/received", protect, getReceivedRequests);
router.patch("/accept/:id", protect, acceptRequest);
router.patch("/reject/:id", protect, rejectRequest);
module.exports = router;