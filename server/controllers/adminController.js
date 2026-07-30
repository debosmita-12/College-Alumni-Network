const User = require("../models/User");
const Post = require("../models/Post");
const Opportunity = require("../models/Opportunity");

// ======================================
// Get Dashboard Statistics
// ======================================
const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalStudents,
      totalAlumni,
      totalAdmins,
      totalPosts,
      totalOpportunities,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "Student" }),
      User.countDocuments({ role: "Alumni" }),
      User.countDocuments({ role: "Admin" }),
      Post.countDocuments(),
      Opportunity.countDocuments(),
    ]);

    res.status(200).json({
      totalUsers,
      totalStudents,
      totalAlumni,
      totalAdmins,
      totalPosts,
      totalOpportunities,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================
// Get All Users
// ======================================
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================
// Delete User
// ======================================
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Permanent Admin cannot be deleted
    if (user.isSuperAdmin) {
      return res.status(403).json({
        message: "Super Administrator cannot be deleted.",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      message: "User deleted successfully.",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// ======================================
// Get All Opportunities
// ======================================
const getAllOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find()
      .populate("postedBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(opportunities);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// ======================================
// Recent Activity
// ======================================
const getRecentActivity = async (req, res) => {
  try {
    const recentUsers = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentPosts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const recentOpportunities = await Opportunity.find()
      .populate("postedBy", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      recentUsers,
      recentPosts,
      recentOpportunities,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// ======================================
// Delete Community Post
// ======================================
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found.",
      });
    }

    await post.deleteOne();

    res.status(200).json({
      message: "Post deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================
// Delete Opportunity
// ======================================
const deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({
        message: "Opportunity not found.",
      });
    }

    await opportunity.deleteOne();

    res.status(200).json({
      message: "Opportunity deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  getAllOpportunities,
  getRecentActivity,
  deleteUser,
  deletePost,
  deleteOpportunity,
};