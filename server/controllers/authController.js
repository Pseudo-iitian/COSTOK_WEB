// src/app/controllers/authController.js

const { signupUser, loginUser } = require("../services/authService");
const { User, sequelize } = require("../models");

async function signup(req, res) {
  const { name, username, email, password } = req.body;

  try {
    // Call the signup function from the service layer
    const result = await signupUser({ name, username, email, password });

    // Handle errors if the function fails validation
    if (!result.success) {
      return res.status(400).json({ error: result.errors });
    }

    // Success: return the created user
    return res.status(201).json(result.data);
  } catch (err) {
    console.error("Error in signup controller:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Call the login service
    const result = await loginUser(username, password);

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    // Return the token on successful login
    return res.status(200).json({ token: result.token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  signup,
  login,
};
