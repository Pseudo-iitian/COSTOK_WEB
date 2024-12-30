const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const authenticateUser = async (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  try {
    // Verify the token with the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the decoded token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // If the token is expired, send an appropriate response
      return res.status(401).json({ error: "Token expired. Please log in again." });
    }
    return res.status(401).json({ error: "Invalid token. Please log in again." });
  }
};

module.exports = authenticateUser;
