const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, skills, industry, experience } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      skills,
      industry,
      experience,
    });

    // Save to MongoDB
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // User not found
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
    return res.status(401).json({
        message: "Invalid email or password.",
    });
    }

    // Generate JWT Token
    const token = jwt.sign(
    {
        id: user._id,
        role: user.role,
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d",
    }
    );

    res.status(200).json({
    message: "Login Successful!",
    token,
    user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update Profile
const updateProfile = async (req, res) => {
  try {
    // Get logged-in user from middleware
    const user = req.user;

    // Get data from request body
    const { name, skills, industry, experience } = req.body;

    // Update only the provided fields
    if (name) user.name = name;
    if (skills) user.skills = skills;
    if (industry) user.industry = industry;
    if (experience !== undefined) user.experience = experience;

    // Save updated user
    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated successfully!",
      user: updatedUser,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateProfile,
};