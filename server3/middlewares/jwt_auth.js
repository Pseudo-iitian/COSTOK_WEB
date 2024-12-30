const jwt = require("jsonwebtoken");
const { User } = require("../models/User"); // Assuming User is a Mongoose model

// Middleware to authenticate user using JWT
const authenticateUser = async (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming "Bearer <token>"

  // If there's no token, return unauthorized error
  if (!token) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  try {
    // Verify the token with the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Log the decoded token for debugging purposes
    console.log("Decoded Token:", decoded);

    // Find the user associated with the decoded token
    const user = await User.findById(decoded.id); // Using Mongoose's `findById` method

    // If the user does not exist, return an error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach the user data to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authenticateUser;
