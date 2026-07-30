const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["Student", "Alumni", "Admin"],
      required: true,
    },

    // Only one permanent administrator should have this set to true.
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },

    skills: {
      type: [String],
      default: [],
    },

    industry: {
      type: String,
      default: "",
    },

    experience: {
      type: Number,
      default: 0,
    },

    company: {
      type: String,
      default: "",
    },

    designation: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);