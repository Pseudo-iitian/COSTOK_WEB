const mongoose = require("mongoose");

const SadhnaResultSchema = new mongoose.Schema(
  {
    final_score: {
      type: Number,
      required: true,
      default: 0, // Default to 0 if no score is provided
    },
    username: {
      type: String,
      required: true,
      ref: "User", // Reference to the "User" model by username
    },
    reporting_date: {
      type: Date,
      required: true,
      ref: "SadhnaReport", // Reference to the "SadhnaReport" model by reporting_date
    },
    is_active: {
      type: Boolean,
      required: false, // Dynamically fetched from the User model
      ref: "User", // Reference to the `is_active` field in the User model
    },
  },
  {
    collection: "SadhnaResults", // Explicit collection name
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const SadhnaResult = mongoose.model("SadhnaResult", SadhnaResultSchema);
module.exports = {SadhnaResult}