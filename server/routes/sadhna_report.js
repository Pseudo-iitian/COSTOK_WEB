const express = require("express");
const router = express.Router();
const {
  sadhna_report,
  sadhna_score,
  sadhna_result,
  User,
} = require("../models");
const authenticateUser = require("../middlewares/jwt_auth"); // Import the middleware
const calculations = require("../controllers/calculations");

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

    const { username, email } = req.user; // Authenticated user's details
    const reporting_date = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD

    // Check if a sadhna_report already exists for this date
    let report = await sadhna_report.findOne({
      where: { username, reporting_date },
    });

    if (report) {
      // Update existing report
      await report.update({
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
    } else {
      // Create a new report
      report = await sadhna_report.create({
        username,
        email,
        reporting_date,
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
    }

    // Calculate scores
    const scores = calculations.calculateScores(report);

    // Check if a sadhna_score entry exists for this date
    let scoreEntry = await sadhna_score.findOne({
      where: { username, reporting_date },
    });

    if (scoreEntry) {
      // Update existing scores
      await scoreEntry.update({
        sleepscore: scores.sleepscore,
        wakeupscore: scores.wakeupscore,
        dayrestscore: scores.dayrestscore,
        chantingscore: scores.chantingscore,
        hearingscore: scores.hearingscore,
        readingscore: scores.readingscore,
        servicescore: scores.servicescore,
      });
    } else {
      // Create a new score entry
      scoreEntry = await sadhna_score.create({
        sleepscore: scores.sleepscore,
        wakeupscore: scores.wakeupscore,
        dayrestscore: scores.dayrestscore,
        chantingscore: scores.chantingscore,
        hearingscore: scores.hearingscore,
        readingscore: scores.readingscore,
        servicescore: scores.servicescore,
        username,
        email,
        reporting_date,
      });
    }

    // Calculate the average score
    const averageScore = calculations.calculateFinalResult(scores);

    // Check if a sadhna_result entry exists for this date
    let resultEntry = await sadhna_result.findOne({
      where: { username, reporting_date },
    });

    if (resultEntry) {
      // Update the existing result
      await resultEntry.update({
        final_score: averageScore,
      });
    } else {
      // Create a new result entry
      await sadhna_result.create({
        id: report.id, // Reference to sadhna_report id
        username,
        reporting_date,
        final_score: averageScore,
      });
    }

    res.status(201).json({
      message: "Sadhna Report, Score, and Result processed successfully",
      report,
      scoreEntry,
      finalScore: averageScore,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to process Sadhna Report, Score, and Result" });
  }
});

module.exports = router;
