const User = require("../models/User");
const Message = require("../models/Message");
const Opportunity = require("../models/Opportunity");
const MentorshipRequest = require("../models/MentorshipRequest");
const Post = require("../models/Post");

exports.getDashboardStats = async (req, res) => {
  try {
    // Total users
    const totalUsers = await User.countDocuments();

    // Total alumni
    const totalAlumni = await User.countDocuments({
      role: "Alumni",
    });

    // Mentorship count
    let mentors = 0;

    if (req.user.role === "Student") {
      mentors = await MentorshipRequest.countDocuments({
        student: req.user._id,
        status: "Accepted",
      });
    } else if (req.user.role === "Alumni") {
      mentors = await MentorshipRequest.countDocuments({
        alumni: req.user._id,
        status: "Accepted",
      });
    }

    // Opportunities
    const opportunities = await Opportunity.countDocuments();

    // Community Posts
    const totalPosts = await Post.countDocuments();

    // Unread Messages (Student & Alumni only)
    let unreadMessages = 0;

    if (req.user.role !== "Admin") {
      unreadMessages = await Message.countDocuments({
        receiver: req.user._id,   // ✅ FIXED (was recipient)
        isRead: false,
      });
    }

    res.status(200).json({
      totalUsers,
      totalAlumni,
      mentors,
      opportunities,
      totalPosts,
      unreadMessages,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};