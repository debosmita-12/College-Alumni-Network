const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  sendRequest,
  getReceivedRequests,
  getMyRequests,
  acceptRequest,
  rejectRequest,
} = require("../controllers/mentorshipController");

// Student
router.post("/request", protect, sendRequest);
router.get("/my-requests", protect, getMyRequests);

// Alumni
router.get("/received", protect, getReceivedRequests);
router.patch("/accept/:id", protect, acceptRequest);
router.patch("/reject/:id", protect, rejectRequest);

module.exports = router;