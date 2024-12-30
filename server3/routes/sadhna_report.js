const express = require("express");
const router = express.Router();
const {SadhnaReport} = require("../models/SadhnaReport"); // Import MongoDB models
const {SadhnaResult} = require("../models/SadhnaResult"); // Import MongoDB models
const {SadhnaScore} = require("../models/SadhnaScore"); // Import MongoDB models
const {User} = require("../models/User"); // Import MongoDB models
const mongoose = require("mongoose");

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
    let report = await SadhnaReport.findOne({
      username,
      reporting_date,
    });

    if (report) {
      // Update existing report
      report = await SadhnaReport.findByIdAndUpdate(
        report._id,
        {
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
        },
        { new: true }
      );
    } else {
      // Create a new report
      report = new SadhnaReport({
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
      await report.save();
    }

    // Calculate scores
    const scores = calculations.calculateScores(report);

    // Check if a sadhna_score entry exists for this date
    let scoreEntry = await SadhnaScore.findOne({
      username,
      reporting_date,
    });

    if (scoreEntry) {
      // Update existing scores
      scoreEntry = await SadhnaScore.findByIdAndUpdate(
        scoreEntry._id,
        {
          sleepscore: scores.sleepscore,
          wakeupscore: scores.wakeupscore,
          dayrestscore: scores.dayrestscore,
          chantingscore: scores.chantingscore,
          hearingscore: scores.hearingscore,
          readingscore: scores.readingscore,
          servicescore: scores.servicescore,
        },
        { new: true }
      );
    } else {
      // Create a new score entry
      scoreEntry = new SadhnaScore({
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
      await scoreEntry.save();
    }

    // Calculate the average score
    const averageScore = calculations.calculateFinalResult(scores);

    // Check if a sadhna_result entry exists for this date
    let resultEntry = await SadhnaResult.findOne({
      username,
      reporting_date,
    });

    if (resultEntry) {
      // Update the existing result
      resultEntry = await SadhnaResult.findByIdAndUpdate(
        resultEntry._id,
        { final_score: averageScore },
        { new: true }
      );
    } else {
      // Create a new result entry
      resultEntry = new SadhnaResult({
        reportId: report._id, // Reference to SadhnaReport id
        username,
        reporting_date,
        final_score: averageScore,
      });
      await resultEntry.save();
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