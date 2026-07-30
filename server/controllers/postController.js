const Post = require("../models/Post");
const MentorshipRequest = require("../models/MentorshipRequest");
// Create a new post
const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        message: "Post content is required",
      });
    }

    const post = await Post.create({
      author: req.user._id,
      content,
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {

    // Get accepted mentorships only
    const connections = await MentorshipRequest.find({
      status: "Accepted",
      $or: [
        { student: req.user._id },
        { alumni: req.user._id }
      ]
    });

    // Build list of connected user IDs
    const connectedUsers = connections.map(connection => {

      if (connection.student.toString() === req.user._id.toString()) {
        return connection.alumni;
      }

      return connection.student;

    });

    // Include yourself
    connectedUsers.push(req.user._id);

    // Fetch only visible posts
    const posts = await Post.find({
      author: { $in: connectedUsers }
    })
      .populate("author", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: posts.length,
      posts,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update own post
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can update only your own posts",
      });
    }

    post.content = req.body.content || post.content;

    await post.save();

    res.status(200).json({
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete own post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can delete only your own posts",
      });
    }

    await post.deleteOne();

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
};