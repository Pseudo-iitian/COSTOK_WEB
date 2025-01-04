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

// cors related thing here
// app.use(cors({
//   origin: "https://costok-web.vercel.app",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));
const allowedOrigins = [
  "https://costok-web.vercel.app",
  "https://obscure-telegram-q7q67qqp9xp349qw-5173.app.github.dev"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// handling json values
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // form data parsing
// Set up CORS options

// Using the routes
app.use("/", User); // Ensure User is a valid Express Router
app.use("/sadhna_report", SadhnaReportRoute); // Ensure sadhnaReportRoute is a valid Express Router
app.use("/api/v1", apiRoute);

// Default route for health check
app.get("/", (req, res) => {
    res.json({ message: "Hi brother, how are you?" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
