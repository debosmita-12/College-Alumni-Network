const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getAllAlumni,
  searchAlumni,
} = require("../controllers/userController");

// Get All Alumni
router.get("/alumni/search", protect, searchAlumni);
router.get("/alumni", protect, getAllAlumni);

module.exports = router;