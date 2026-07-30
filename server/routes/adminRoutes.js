const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getAllUsers,
  getAllOpportunities,
  getRecentActivity,
  deleteUser,
  deletePost,
  deleteOpportunity,
} = require("../controllers/adminController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Dashboard
router.get(
  "/dashboard",
  protect,
  authorize("Admin"),
  getDashboardStats
);

router.get(
  "/recent-activity",
  protect,
  authorize("Admin"),
  getRecentActivity
);

// User Management
router.get(
  "/users",
  protect,
  authorize("Admin"),
  getAllUsers
);

router.delete(
  "/users/:id",
  protect,
  authorize("Admin"),
  deleteUser
);

// Opportunity Management
router.get(
  "/opportunities",
  protect,
  authorize("Admin"),
  getAllOpportunities
);

router.delete(
  "/opportunities/:id",
  protect,
  authorize("Admin"),
  deleteOpportunity
);

// Community Posts
router.delete(
  "/posts/:id",
  protect,
  authorize("Admin"),
  deletePost
);

module.exports = router;
