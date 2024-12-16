const jwt = require("jsonwebtoken");

function generateToken(user) {
  const payload = { username: user.username, id: user.id }; // example payload
  const secret = process.env.JWT_SECRET_KEY; // Retrieve the secret from the .env file
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign(payload, secret, { expiresIn: "1d" });
}

module.exports = {
  generateToken,
};
