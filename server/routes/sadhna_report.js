const express = require("express");
const router = express.Router();
const { sadhna_report, sadhna_score, User } = require("../models");
const authenticateUser = require("../middlewares/jwt_auth"); // Import the middleware
const { calculateScores } = require("../controllers/calculateScore");
// Route to create a Sadhna Report and calculate the score
router.post("/", authenticateUser, async (req, res) => {
  try {
    const {
      previous_night_sleep_time,
      morning_wakeup_time,
      target_chanting_end_time,
      chanting_rounds,
      day_rest_duration,
      hearing_topic,
      hearing_duration,
      reading_topic,
      reading_duration,
      service_name,
      service_duration,
      comment,
    } = req.body;

    // Use the authenticated user's details
    const { username, email } = req.user; // User details are now available from req.user

    // Get the current date in YYYY-MM-DD format
    const reporting_date = new Date().toISOString().split("T")[0];

    // Create the sadhna report
    const report = await sadhna_report.create({
      username, // Taken automatically
      email, // Taken automatically
      reporting_date, // Automatically set to the current date
      previous_night_sleep_time,
      morning_wakeup_time,
      target_chanting_end_time,
      chanting_rounds,
      day_rest_duration,
      hearing_topic,
      hearing_duration,
      reading_topic,
      reading_duration,
      service_name,
      service_duration,
      comment,
    });

    // Calculate the scores using the created report
    const scores = calculateScores(report);

    // Create a new score entry in the sadhna_score table
    const scoreData = await sadhna_score.create({
      sleepscore: scores.sleepscore,
      wakeupscore: scores.wakeupscore,
      dayrestscore: scores.dayrestscore,
      chantingscore: scores.chantingscore,
      hearingscore: scores.hearingscore,
      readingscore: scores.readingscore,
      servicescore: scores.servicescore,
      username, // Use the same username as in the report
      email, // Use the same email as in the report
      reporting_date, // Use the same reporting date as in the report
    });

    res.status(201).json({
      message: "Sadhna Report and Score created successfully",
      report,
      scoreData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create Sadhna Report and Score" });
  }
});

module.exports = router;
