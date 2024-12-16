const express = require("express");
const router = express.Router();
const { sequelize } = require("../models"); // Import sequelize instance
const {
  sadhna_report,
  sadhna_score,
  sadhna_result,
  User,
} = require("../models");
const authenticateUser = require("../middlewares/jwt_auth"); // Import the middleware

router.get("/getmysadhna", authenticateUser, async (req, res) => {
  try {
    // Extract the username from the authenticated user's request
    const { username } = req.user;

    // Query the database for records matching the user's username
    const sadhnaResults = await sadhna_result.findAll({
      attributes: ["final_score", "reporting_date"], // Select only required fields
      where: { username }, // Filter by username
    });

    // Respond with the results
    res.status(200).json(sadhnaResults);
  } catch (error) {
    console.error("Error fetching Sadhna results:", error);
    res.status(500).json({ error: "Failed to fetch Sadhna results" });
  }
});

router.post("/leaderboarddata", async (req, res) => {
  const { reporting_date } = req.body;

  if (!reporting_date) {
    return res.status(400).json({ error: "Reporting date is required" });
  }

  try {
    // Perform a LEFT JOIN between Users and sadhna_result
    const leaderboardData = await sequelize.query(
      `SELECT 
         Users.name, 
         Users.email, 
         Users.username, 
         COALESCE(sadhna_results.final_score, 0) AS final_score 
       FROM 
         Users 
       LEFT JOIN 
         sadhna_results 
       ON 
         Users.username = sadhna_results.username 
         AND sadhna_results.reporting_date = :reporting_date
       ORDER BY 
         final_score DESC;`,
      {
        replacements: { reporting_date }, // Parameterize the query for security
        type: sequelize.QueryTypes.SELECT, // Return plain objects
      }
    );

    // Respond with the leaderboard data
    res.status(200).json(leaderboardData);
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard data" });
  }
});

module.exports = router;
