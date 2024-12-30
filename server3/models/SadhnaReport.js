const mongoose = require("mongoose");

const SadhnaReportSchema = new mongoose.Schema(
  {
    previous_night_sleep_time: {
      type: String, // Stored as a string (HH:mm format)
      required: true,
    },
    morning_wakeup_time: {
      type: String, // Stored as a string (HH:mm format)
      required: true,
    },
    target_chanting_end_time: {
      type: String, // Stored as a string (HH:mm format)
      required: true,
    },
    chanting_rounds: {
      type: Number,
      required: true,
      min: 0, // Ensures non-negative values
    },
    day_rest_duration: {
      type: String, // Stored as a string (e.g., "2h 30m")
      required: true,
    },
    hearing_topic: {
      type: String, // Brief description of the topic
      required: true,
    },
    hearing_duration: {
      type: String, // Stored as a string (e.g., "1h 15m")
      required: true,
    },
    reading_topic: {
      type: String, // Brief description of the topic
      required: true,
    },
    reading_duration: {
      type: String, // Stored as a string (e.g., "45m")
      required: true,
    },
    service_name: {
      type: String, // Name of the service
      required: true,
    },
    service_duration: {
      type: String, // Stored as a string (e.g., "2h")
      required: true,
    },
    comment: {
      type: String, // Additional comments or notes
      maxlength: 500, // Restricts comment length to 500 characters
    },
    reporting_date: {
      type: Date, // Stored as a date
      required: true,
      unique: true, // Ensures only one report per date
    },
    username: {
      type: String,
      required: true,
      ref: "User", // Reference to the "User" model by username
    },
    email: {
      type: String,
      required: true,
      ref: "User", // Reference to the "User" model by email
    },
    is_active: {
      type: mongoose.Schema.Types.Boolean,
      required: false, // Fetched dynamically via `populate`
      ref: "User", // Reference to the `is_active` field in the User model
    },
  },
  {
    collection: "SadhnaReports", // Explicit collection name
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const SadhnaReport = mongoose.model("SadhnaReport", SadhnaReportSchema);
module.exports= {SadhnaReport};