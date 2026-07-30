const User = require("../models/User");
const MentorshipRequest = require("../models/MentorshipRequest");

// ==============================
// Get All Alumni
// ==============================
const getAllAlumni = async (req, res) => {
  try {
    let query = {
      role: "Alumni",
    };

    // Alumni should not see themselves
    if (req.user.role === "Alumni") {
      query._id = { $ne: req.user._id };
    }

    // Students should not see alumni they've already requested
    if (req.user.role === "Student") {
      const requests = await MentorshipRequest.find({
        student: req.user._id,
      }).select("alumni");

      const requestedIds = requests.map((r) => r.alumni);

      query._id = {
        $nin: requestedIds,
      };
    }

    const alumni = await User.find(query).select("-password");

    res.status(200).json({
      count: alumni.length,
      alumni,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// Search Alumni
// ==============================
const searchAlumni = async (req, res) => {
  try {
    const { skill, industry } = req.query;

    let query = {
      role: "Alumni",
    };

    // Alumni should not see themselves
    if (req.user.role === "Alumni") {
      query._id = { $ne: req.user._id };
    }

    // Students should not see alumni they've already requested
    if (req.user.role === "Student") {
      const requests = await MentorshipRequest.find({
        student: req.user._id,
      }).select("alumni");

      const requestedIds = requests.map((r) => r.alumni);

      query._id = {
        $nin: requestedIds,
      };
    }

    if (skill) {
      query.skills = {
        $regex: skill,
        $options: "i",
      };
    }

    if (industry) {
      query.industry = {
        $regex: industry,
        $options: "i",
      };
    }

    const alumni = await User.find(query).select("-password");

    res.status(200).json({
      count: alumni.length,
      alumni,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// Get My Profile
// ==============================
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// Update My Profile
// ==============================
const updateProfile = async (req, res) => {
  try {
    const {
      name,
      skills,
      industry,
      experience,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.skills = skills || user.skills;
    user.industry = industry || user.industry;
    user.experience = experience || user.experience;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    console.error("UPDATE PROFILE ERROR:");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllAlumni,
  searchAlumni,
  getProfile,
  updateProfile,
};