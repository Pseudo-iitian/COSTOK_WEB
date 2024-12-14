const express = require("express");
const app = express();
const PORT = 3001; // for backend
const db = require("./models");
const { sequelize } = require("./models");
const user = require("./routes/User");
const cors = require("cors"); // it means we want to white list our system to its call
const sadhnaReportRoute = require("./routes/sadhna_report");

// Middleware
app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: false })); //form data ko bhi parse karenge
app.use(cors()); // it will not give any axios error
app.use("/user", user);
app.use("/submit_sadhna_report", sadhnaReportRoute);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("server is running on port", PORT);
  });
});