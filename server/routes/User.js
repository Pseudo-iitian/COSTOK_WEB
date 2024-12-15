const express = require("express");
const router = express.Router();
require("dotenv").config(); // Ensure dotenv is required at the top
const { User, sequelize } = require("../models");
const authController = require("../controllers/authController");

router.get("/", async (req, res) => {
  const listAllUsers = await User.findAll();
  res.json(listAllUsers);
});

router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;
