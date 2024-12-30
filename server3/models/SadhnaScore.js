const mongoose = require("mongoose");

const SadhnaScoreSchema = new mongoose.Schema(
  {
    sleepscore: {
      type: Number,
      required: true,
      default: 0,
    },
    wakeupscore: {
      type: Number,
      required: true,
      default: 0,
    },
    dayrestscore: {
      type: Number,
      required: true,
      default: 0,
    },
    chantingscore: {
      type: Number,
      required: true,
      default: 0,
    },
    hearingscore: {
      type: Number,
      required: true,
      default: 0,
    },
    readingscore: {
      type: Number,
      required: true,
      default: 0,
    },
    servicescore: {
      type: Number,
      required: true,
      default: 0,
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
    reporting_date: {
      type: Date,
      required: true,
      ref: "SadhnaReport", // Reference to the "SadhnaReport" model by reporting_date
    },
    is_active: {
      type: mongoose.Schema.Types.Boolean,
      required: false, // Fetched dynamically via `populate`
      ref: "User", // Reference to the `is_active` field in the User model
    },
  },
  {
    collection: "SadhnaScores", // Explicit collection name
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const SadhnaScore = mongoose.model("SadhnaScore", SadhnaScoreSchema);
module.exports= {SadhnaScore};