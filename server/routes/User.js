const express = require("express");
const router = express.Router();
const { User } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Ensure dotenv is required at the top

function generateToken(user) {
  const payload = { username: user.username, id: user.id }; // example payload
  const secret = process.env.JWT_SECRET_KEY; // Retrieve the secret from the .env file

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign(payload, secret, { expiresIn: "1h" });
}

router.get("/", async (req, res) => {
  const listAllUsers = await User.findAll();
  res.json(listAllUsers);
});

router.post("/signup", async (req, res) => {
  // console.log(User);
  const { name, username, email, password } = req.body;
  try {
    const user = await User.create({ name, username, email, password });
    res.status(201).json(user);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: err.message });
  }
});

// Route to handle user login (for example)
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username (mobile number in your case)
    const user = await User.findOne({ where: { username } });

    if (!user || user.password !== password) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Send the token to the client
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
