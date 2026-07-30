const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddleware");

// Create a post
router.post("/", protect, createPost);

// Get all posts
router.get("/", protect, getAllPosts);

// Update a post
router.put("/:id", protect, updatePost);

// Delete a post
router.delete("/:id", protect, deletePost);

module.exports = router;