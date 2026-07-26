const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    let token;

    // Check Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");
      req.user = user;

      next();
    } else {
      res.status(401).json({
        message: "No token provided.",
      });
    }

  } catch (error) {
    res.status(401).json({
      message: "Invalid token.",
    });
  }
};

module.exports = protect;