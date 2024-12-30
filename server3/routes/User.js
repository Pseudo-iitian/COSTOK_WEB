const express = require("express");
const router = express.Router();
const {User} = require("../models/User"); // Ensure this path is correct
require("dotenv").config(); // Ensure dotenv is required at the top
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const { generateToken } = require("../controllers/generateToken"); // Import the generateToken function
const { signupUser, loginUser } = require("../controllers/authcontroller"); // Import signupUser function


// Define routes
router.post("/signup", async (req, res) => {
    try {
      const { name, username, email, password } = req.body;
  
      // Call the signupUser function to create a new user
      const result = await signupUser({ name, username, email, password });
  
      if (!result.success) {
        return res.status(400).json({ errors: result.errors });
      }
  
      return res.status(201).json({ message: "User created successfully", user: result.data });
    } catch (error) {
      console.error("Error during signup:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  

// login user
router.post("/login", async (req, res) => {
try {
    const { username, password } = req.body;

    // Call the loginUser function to authenticate the user
    const result = await loginUser(username, password);

    if (!result.success) {
    return res.status(400).json({ error: result.error });
    }

    // Return the token on successful login
    return res.status(200).json({ message: "Login successful", token: result.token });
} catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
}
});
    

module.exports = router; // Ensure you are exporting the router
