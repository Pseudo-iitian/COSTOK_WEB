const bcrypt = require("bcrypt");
const {User} = require("../models/User"); // Import the User model
const { maskSensitiveData, isValidUsername, isValidEmail } = require("./maskSensitiveData"); // Import utility functions
const { generateToken } = require("./generateToken"); // Import the generateToken function
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

async function signupUser({ name, username, email, password }) {
  const errors = [];

  // Validate username (10-digit number)
  if (!isValidUsername(username)) {
    errors.push("Invalid username. It must be a 10-digit number.");
  }

  // Validate email
  if (!isValidEmail(email)) {
    errors.push("Invalid email format. Please provide a valid email.");
  }

  // Validate password (8 to 15 characters)
  if (!password || password.length < 8 || password.length > 15) {
    errors.push("Password must be between 8 and 15 characters long.");
  }

  try {
    // Check for existing user with the same username or email
    const existingUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (existingUser) {
      // Check for username conflict
      if (existingUser.username === username) {
        const maskedUsername = maskSensitiveData(existingUser.username, "").maskedUsername;
        errors.push(`This username already exists with rmn = ${maskedUsername}`);
      }

      // Check for email conflict
      if (existingUser.email === email) {
        const maskedEmail = maskSensitiveData("", existingUser.email).maskedEmail;
        errors.push(`This email already exists: ${maskedEmail}`);
      }
    }

    // If there are errors, return them
    if (errors.length > 0) {
      return { success: false, errors };
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new user with the hashed password
    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await user.save(); // Save the user to MongoDB

    return { success: true, data: user };
  } catch (err) {
    console.error("Error in signup process:", err);
    throw new Error("Internal server error");
  }
}


// Login function
async function loginUser(username, password) {
  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return { success: false, 
        error: `This username (${username}) does not exist. Please create a new user.`,
       };
    }

    // Check if the user is active
    if (!user.is_active) {
      return { success: false, error: "User is inactive" };
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { success: false, error: "Invalid username or password" };
    }

    // Generate JWT token
    const token = generateToken(user);
    return { success: true, token };

  } catch (error) {
    console.error("Error in loginUser:", error);
    return { success: false, error: "An error occurred during login" };
  }
}


module.exports = {loginUser, signupUser}
