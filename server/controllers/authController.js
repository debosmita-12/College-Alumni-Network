const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==============================
// Register User
// ==============================
const registerUser = async (req, res) => {
  try {
    let {
      name,
      email,
      password,
      role,
      skills,
      industry,
      experience,
    } = req.body;

    // ============================
    // Check if email already exists
    // ============================
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email.",
      });
    }

    // ============================
    // Prevent Admin Registration
    // ============================
    if (role === "Admin") {
      return res.status(403).json({
        message: "Admin accounts cannot be created through registration.",
      });
    }

    // Allow only Student or Alumni
    if (!["Student", "Alumni"].includes(role)) {
      role = "Student";
    }

    // ============================
    // Hash Password
    // ============================
    const hashedPassword = await bcrypt.hash(password, 10);

    // ============================
    // Create User
    // ============================
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      skills,
      industry,
      experience,
      isSuperAdmin: false,
    });

    await newUser.save();

    const registeredUser = await User.findById(newUser._id).select("-password");

    res.status(201).json({
      message: "User registered successfully!",
      user: registeredUser,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// Login User
// ==============================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("========== LOGIN ==========");
    console.log("Email received:", `"${email}"`);

    const allUsers = await User.find();
    console.log("Users in DB:", allUsers.map(u => u.email));

    const user = await User.findOne({ email });

    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);


    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // Generate JWT
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

    // Fetch complete user details (without password)
    const loggedInUser = await User.findById(user._id).select("-password");

    res.status(200).json({
      message: "Login Successful!",
      token,
      user: loggedInUser,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// Update Profile
// ==============================
const updateProfile = async (req, res) => {
  try {
    const user = req.user;

    const {
      name,
      skills,
      industry,
      experience,
    } = req.body;

    if (name) user.name = name;
    if (skills) user.skills = skills;
    if (industry) user.industry = industry;
    if (experience !== undefined) user.experience = experience;

    const updatedUser = await user.save();

    // Return updated user without password
    const safeUser = await User.findById(updatedUser._id).select("-password");

    res.status(200).json({
      message: "Profile updated successfully!",
      user: safeUser,
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