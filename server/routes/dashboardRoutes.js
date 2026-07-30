const express = require("express");
const router = express.Router();

const { getDashboardStats } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");
console.log("protect:", typeof protect);
console.log("getDashboardStats:", typeof getDashboardStats);
router.get("/stats", protect, getDashboardStats);

module.exports = router;