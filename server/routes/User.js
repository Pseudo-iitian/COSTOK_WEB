const express = require("express");
const router = express.Router();
const { User, sequelize } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Ensure dotenv is required at the top
const { Op } = require("sequelize"); // Correctly import Op from Sequelize
const {
  maskSensitiveData,
  isValidUsername,
  isValidEmail,
} = require("../controllers/maskSensitiveData");

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
  const { name, username, email, password } = req.body;

  const errors = []; // Collect all relevant errors here

  // Validate username
  if (!isValidUsername(username)) {
    errors.push("Invalid username. It must be a 10-digit number.");
  }

  // Validate email
  if (!isValidEmail(email)) {
    errors.push("Invalid email format. Please provide a valid email.");
  }

  try {
    // Check if a user with the same username or email already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });

    if (existingUser) {
      // Check specifically if the username exists
      if (existingUser.username === username) {
        const maskedUsername = maskSensitiveData(
          existingUser.username,
          ""
        ).maskedUsername;
        errors.push(
          `This username already exists with rmn = ${maskedUsername}`
        );
      }

      // Check specifically if the email exists
      if (existingUser.email === email) {
        const maskedEmail = maskSensitiveData(
          "",
          existingUser.email
        ).maskedEmail;
        errors.push(`This email already exists: ${maskedEmail}`);
      }
    }

    if (errors.length > 0) {
      // Return all errors together
      return res.status(400).json({ error: errors });
    }

    // Create a new user
    const user = await User.create({ name, username, email, password });
    res.status(201).json(user);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to handle user login (for example)
// Route to handle user login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username (mobile number in your case)
    const user = await User.findOne({ where: { username } });

    // Check if the username exists in the database
    if (!user) {
      return res.status(404).json({
        error: `This username (${username}) does not exist. Please create a new user.`,
      });
    }

    // Check if the password is incorrect
    if (user.password !== password) {
      return res.status(401).json({
        error: "Incorrect password. Please input the correct password.",
      });
    }

    // Generate JWT token (assuming you have a function to do this)
    const token = generateToken(user);

    // Send the token to the client
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
