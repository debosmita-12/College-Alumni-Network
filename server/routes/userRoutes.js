const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  getAllAlumni,
  searchAlumni,
  getProfile,
  updateProfile,
} = require("../controllers/userController");

// Alumni
router.get("/alumni", protect, getAllAlumni);
router.get("/alumni/search", protect, searchAlumni);

// Logged-in User
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

module.exports = router;