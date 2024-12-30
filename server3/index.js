require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001; // Use the environment variable or default to 3001
const User = require('./routes/User');
const db = require('./models/db'); // for connecting mongo db
const JWT_SECRET = process.env.JWT_SECRET;  // Access JWT_SECRET directly
const cors = require('cors'); // Importing cors
const SadhnaReportRoute = require('./routes/sadhna_report') // Correct import of sadhnaReportRoute
const apiRoute = require("./routes/api");

// handling json values
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // form data parsing
app.use(cors()); // It will not give any axios error

// Using the routes
app.use("/", User); // Ensure User is a valid Express Router
app.use("/sadhna_report", SadhnaReportRoute); // Ensure sadhnaReportRoute is a valid Express Router
app.use("/api/v1",apiRoute)
app.get("/", (req, res) => {
    res.json({ message: "Hi brother, how are you?" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
