const User = require("../models/User");

// Get All Alumni
const getAllAlumni = async (req, res) => {
  try {
    const alumni = await User.find({ role: "Alumni" }).select("-password");

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
// Search Alumni by Skill or Industry
const searchAlumni = async (req, res) => {
  try {
    const { skill, industry } = req.query;

    let query = { role: "Alumni" };

    if (skill) {
      query.skills = { $regex: skill, $options: "i" };
    }

    if (industry) {
      query.industry = { $regex: industry, $options: "i" };
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

module.exports = {
  getAllAlumni,
  searchAlumni,
};