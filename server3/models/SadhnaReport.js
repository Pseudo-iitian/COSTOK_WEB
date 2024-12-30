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
      required: false,
      default: 0,
      min: 0, // Ensures non-negative values
    },
    day_rest_duration: {
      type: Number, // Stored as a string (e.g., "2h 30m")
      default: 0,
      required: false,
    },
    hearing_topic: {
      type: String, // Brief description of the topic
      required: false,
    },
    hearing_duration: {
      type: Number, // Stored as a string (e.g., "1h 15m")
      default: 0,
      required: false,
    },
    reading_topic: {
      type: String, // Brief description of the topic
      required: false,
    },
    reading_duration: {
      type: Number, // Stored as a string (e.g., "45m")
      default: 0,
      required: false,
    },
    service_name: {
      type: String, // Name of the service
      required: false,
    },
    service_duration: {
      type: Number, // Stored as a string (e.g., "2h")
      default: 0,
      required: false,
    },
    comment: {
      type: String, // Additional comments or notes
      maxlength: 500, // Restricts comment length to 500 characters
    },
    reporting_date: {
      type: Date, // Stored as a date
      required: true,
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