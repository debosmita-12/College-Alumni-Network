const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

// Register User
router.post("/register", registerUser);
// Login User
router.post("/login", loginUser);
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected Profile Route",
    user: req.user,
  });
});

module.exports = router;