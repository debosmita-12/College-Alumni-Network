const MentorshipRequest = require("../models/MentorshipRequest");

// Send Mentorship Request
const sendRequest = async (req, res) => {
  try {
    const { alumniId, message } = req.body;

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
    res.status(500).json({
      message: error.message,
    });
  }
};
// View Requests Received by an Alumni
const getReceivedRequests = async (req, res) => {
  try {
    const requests = await MentorshipRequest.find({
      alumni: req.user._id,
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
// Accept Mentorship Request
const acceptRequest = async (req, res) => {
  try {
    const request = await MentorshipRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    // Only the intended alumni can accept
    if (request.alumni.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
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


// Reject Mentorship Request
const rejectRequest = async (req, res) => {
  try {
    const request = await MentorshipRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    // Only the intended alumni can reject
    if (request.alumni.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
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
  acceptRequest,
  rejectRequest,
};