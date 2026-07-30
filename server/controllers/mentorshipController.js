const MentorshipRequest = require("../models/MentorshipRequest");

// ===============================
// Send Mentorship Request
// ===============================
const sendRequest = async (req, res) => {
  try {
    const { alumniId, message } = req.body;

    if (req.user._id.toString() === alumniId) {
      return res.status(400).json({
        message: "You cannot send a mentorship request to yourself.",
      });
    }

    const existingRequest = await MentorshipRequest.findOne({
      student: req.user._id,
      alumni: alumniId,
    });

    if (existingRequest) {
      return res.status(400).json({
        message: `You have already sent a request. Current status: ${existingRequest.status}`,
      });
    }

    const request = await MentorshipRequest.create({
      student: req.user._id,
      alumni: alumniId,
      message,
    });

    res.status(201).json({
      message: "Mentorship request sent successfully!",
      request,
    });

  } catch (error) {

    // Duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        message: "A mentorship request already exists for this alumnus.",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Get Requests Received by Alumni
// ===============================
// ===============================
// Get Pending Requests Received by Alumni
// ===============================
const getReceivedRequests = async (req, res) => {
  try {
    const requests = await MentorshipRequest.find({
      alumni: req.user._id,
      status: "Pending",
    })
      .populate("student", "name email skills industry experience")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: requests.length,
      requests,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Get Requests Sent by Student
// ===============================
const getMyRequests = async (req, res) => {
  try {
    const requests = await MentorshipRequest.find({
      student: req.user._id,
    })
      .populate("alumni", "name email company designation")
      .sort({ createdAt: -1 });

    res.status(200).json({
      requests,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Accept Mentorship Request
// ===============================
// ===============================
// Accept Mentorship Request
// ===============================
const acceptRequest = async (req, res) => {
  try {
    const request = await MentorshipRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    if (request.alumni.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    if (request.status !== "Pending") {
      return res.status(400).json({
        message: "This request has already been processed.",
      });
    }

    request.status = "Accepted";
    await request.save();

    res.status(200).json({
      message: "Mentorship request accepted.",
      request,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Reject Mentorship Request
// ===============================
// ===============================
// Reject Mentorship Request
// ===============================
const rejectRequest = async (req, res) => {
  try {
    const request = await MentorshipRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    if (request.alumni.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    if (request.status !== "Pending") {
      return res.status(400).json({
        message: "This request has already been processed.",
      });
    }

    request.status = "Rejected";
    await request.save();

    res.status(200).json({
      message: "Mentorship request rejected.",
      request,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  sendRequest,
  getReceivedRequests,
  getMyRequests,
  acceptRequest,
  rejectRequest,
};