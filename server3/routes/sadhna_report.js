const express = require("express");
const router = express.Router();
const { SadhnaReport } = require("../models/SadhnaReport");
const { SadhnaScore } = require("../models/SadhnaScore");
const { SadhnaResult } = require("../models/SadhnaResult");
const mongoose = require("mongoose");

const authenticateUser = require("../middlewares/jwt_auth");
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

    // Check if a report already exists for this username and reporting_date
    const existingReport = await SadhnaReport.findOne({
      username,
      reporting_date,
    });

    let reportId;
    if (existingReport) {
      // If the report exists, update it
      await SadhnaReport.updateOne(
        { _id: existingReport._id }, // Target the existing report by its _id
        {
          $set: {
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
            updatedAt: new Date(),
          },
        }
      );
      reportId = existingReport._id;
    } else {
      // If no report exists, create a new one
      const newReport = new SadhnaReport({
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
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const savedReport = await newReport.save();
      reportId = savedReport._id;
    }

    // Calculate scores using a helper function
    const scores = calculations.calculateScores({
      previous_night_sleep_time,
      morning_wakeup_time,
      target_chanting_end_time,
      chanting_rounds,
      day_rest_duration,
      hearing_duration,
      reading_duration,
      service_duration,
    });

    // Update or create SadhnaScore
    const existingScore = await SadhnaScore.findOne({
      username,
      reporting_date,
    });

    if (existingScore) {
      await SadhnaScore.updateOne(
        { _id: existingScore._id },
        {
          $set: {
            sleepscore: scores.sleepscore,
            wakeupscore: scores.wakeupscore,
            dayrestscore: scores.dayrestscore,
            chantingscore: scores.chantingscore,
            hearingscore: scores.hearingscore,
            readingscore: scores.readingscore,
            servicescore: scores.servicescore,
            updatedAt: new Date(),
          },
        }
      );
    } else {
      const newScore = new SadhnaScore({
        username,
        email,
        reporting_date,
        ...scores,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await newScore.save();
    }

    // Calculate final score and update/create SadhnaResult
    const finalScore = calculations.calculateFinalResult(scores);
    // console.log(finalScore);
    
    const existingResult = await SadhnaResult.findOne({
      username,
      reporting_date,
    });

    if (existingResult) {
      await SadhnaResult.updateOne(
        { _id: existingResult._id },
        {
          $set: {
            final_score: finalScore,
            updatedAt: new Date(),
          },
        }
      );
    } else {
      const newResult = new SadhnaResult({
        username,
        reporting_date,
        final_score: finalScore,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await newResult.save();
    }

    return res.status(200).json({
      message: existingReport
        ? "Report and scores updated successfully"
        : "New report and scores created successfully",
      data: {existingReport, existingResult, existingScore}
    });
  } catch (error) {
    console.error("Error while handling report submission:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
