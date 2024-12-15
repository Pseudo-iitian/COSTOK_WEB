const { Op } = require("sequelize");
const { User } = require("../models"); // Import your user model
const {
  maskSensitiveData,
  isValidUsername,
  isValidEmail,
} = require("../controllers/maskSensitiveData");
const { generateToken } = require("../controllers/generateToken");
const bcrypt = require("bcrypt");

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
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });

    if (existingUser) {
      // Check for username conflict
      if (existingUser.username === username) {
        const maskedUsername = maskSensitiveData(
          existingUser.username,
          ""
        ).maskedUsername;
        errors.push(
          `This username already exists with rmn = ${maskedUsername}`
        );
      }

      // Check for email conflict
      if (existingUser.email === email) {
        const maskedEmail = maskSensitiveData(
          "",
          existingUser.email
        ).maskedEmail;
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
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return { success: true, data: user };
  } catch (err) {
    console.error("Error in signup process:", err);
    throw new Error("Internal server error");
  }
}

async function loginUser(username, password) {
  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return {
        success: false,
        error: `This username (${username}) does not exist. Please create a new user.`,
      };
    }

    let isPasswordValid = false;

    // Check if the stored password is hashed (bcrypt format)
    if (user.password.startsWith("$2b$") || user.password.startsWith("$2a$")) {
      // Compare the bcrypt-hashed password
      isPasswordValid = await bcrypt.compare(password, user.password);
    } else {
      // Compare plaintext passwords (for old users before bcrypt was implemented)
      isPasswordValid = password === user.password;
    }

    if (!isPasswordValid) {
      return {
        success: false,
        error: "Incorrect password. Please input the correct password.",
      };
    }

    // Generate JWT token
    const token = generateToken(user);
    return { success: true, token };
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Internal server error");
  }
}

module.exports = { signupUser, loginUser };
