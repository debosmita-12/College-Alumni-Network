const Opportunity = require("../models/Opportunity");

// ======================================
// Create Opportunity (Alumni Only)
// ======================================
const createOpportunity = async (req, res) => {
  try {
    if (req.user.role !== "Alumni") {
      return res.status(403).json({
        message: "Only alumni can post opportunities.",
      });
    }

    const {
      title,
      company,
      description,
      type,
      location,
      deadline,
    } = req.body;

    if (!title || !company || !description || !type) {
      return res.status(400).json({
        message: "Please fill all required fields.",
      });
    }

    const opportunity = await Opportunity.create({
      title,
      company,
      description,
      type,
      location,
      deadline,
      postedBy: req.user._id,
    });

    res.status(201).json({
      message: "Opportunity posted successfully.",
      opportunity,
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
      .populate("postedBy", "name company designation")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: opportunities.length,
      opportunities,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================
// Search Opportunities
// ======================================
const searchOpportunities = async (req, res) => {
  try {
    const { keyword, type, company } = req.query;

    let query = {};

    if (keyword) {
      query.title = {
        $regex: keyword,
        $options: "i",
      };
    }

    if (company) {
      query.company = {
        $regex: company,
        $options: "i",
      };
    }

    if (type) {
      query.type = type;
    }

    const opportunities = await Opportunity.find(query)
      .populate("postedBy", "name company designation")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: opportunities.length,
      opportunities,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================
// My Opportunities (Alumni)
// ======================================
const getMyOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find({
      postedBy: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: opportunities.length,
      opportunities,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================
// Update Opportunity
// ======================================
const updateOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({
        message: "Opportunity not found.",
      });
    }

    if (String(opportunity.postedBy) !== String(req.user._id)) {
      return res.status(403).json({
        message: "Unauthorized.",
      });
    }

    const updated = await Opportunity.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Opportunity updated.",
      opportunity: updated,
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

    if (
      String(opportunity.postedBy) !== String(req.user._id) &&
      req.user.role !== "Admin"
    ) {
      return res.status(403).json({
        message: "Unauthorized.",
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
  createOpportunity,
  getAllOpportunities,
  searchOpportunities,
  getMyOpportunities,
  updateOpportunity,
  deleteOpportunity,
};