const jwt = require("jsonwebtoken");

function generateToken(user) {
  const payload = { username: user.username, id: user.id };
  const secret = process.env.JWT_SECRET;  // Ensure this is coming from the environment
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign(payload, secret, { expiresIn: "30d" });  // Token expires in 30 days
}

module.exports = {
  generateToken,
};
