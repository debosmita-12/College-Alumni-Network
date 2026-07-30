const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  createOpportunity,
  getAllOpportunities,
  searchOpportunities,
  getMyOpportunities,
  updateOpportunity,
  deleteOpportunity,
} = require("../controllers/opportunityController");

// ======================================
// Public (Authenticated)
// ======================================

// Get all opportunities
router.get("/", protect, getAllOpportunities);

// Search opportunities
router.get("/search", protect, searchOpportunities);

// Alumni - View My Opportunities
router.get("/my", protect, getMyOpportunities);

// ======================================
// Alumni
// ======================================

// Create Opportunity
router.post("/", protect, createOpportunity);

// Update Opportunity
router.put("/:id", protect, updateOpportunity);

// Delete Opportunity
router.delete("/:id", protect, deleteOpportunity);

module.exports = router;