const mongoose = require("mongoose");

const mentorshipRequestSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    alumni: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// A student can send only ONE request to a particular alumnus
mentorshipRequestSchema.index(
  { student: 1, alumni: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "MentorshipRequest",
  mentorshipRequestSchema
);