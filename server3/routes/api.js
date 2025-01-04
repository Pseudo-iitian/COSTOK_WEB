const express = require("express");
const router = express.Router();
const { SadhnaResult } = require("../models/SadhnaResult");
const { SadhnaScore } = require("../models/SadhnaScore");
const { SevaAllocation } = require("../models/SevaAllocation");
const { User } = require("../models/User");
const authenticateUser = require("../middlewares/jwt_auth"); // Import the middleware

// Route to get Sadhna results for the authenticated user
router.get("/getmysadhna", authenticateUser, async (req, res) => {
  try {
    // Extract the username from the authenticated user's request
    const { username } = req.user;

    // Query the database for Sadhna results matching the user's username
    const sadhnaResults = await SadhnaResult.find(
      { username }, // Filter by username
      { final_score: 1, reporting_date: 1, _id: 0 } // Select only required fields
    ).sort({ reporting_date: -1 }); // Sort by reporting_date in descending order

    // Respond with the results
    res.status(200).json(sadhnaResults);
  } catch (error) {
    console.error("Error fetching Sadhna results:", error);
    res.status(500).json({ error: "Failed to fetch Sadhna results" });
  }
});

// Route to fetch leaderboard data
// Route to fetch leaderboard data
router.post("/leaderboarddata", async (req, res) => {
    try {
      const { reporting_date } = req.body;
  
      if (!reporting_date) {
        return res.status(400).json({ error: "Reporting date is required" });
      }
  
      // Fetch the top 3 users based on final_score in descending order for the given reporting_date
      const topScores = await SadhnaResult.aggregate([
        {
          $match: { reporting_date: new Date(reporting_date) }, // Filter by reporting_date
        },
        {
          $sort: { final_score: -1 }, // Sort by final_score in descending order
        },
        {
          $limit: 3, // Limit to the top 3 results
        },
        {
          $lookup: {
            from: "Users", // Collection name for User
            localField: "username", // Match SadhnaResult's username
            foreignField: "username", // With User's username
            as: "user_details", // Alias for joined data
          },
        },
        {
          $unwind: "$user_details", // Deconstruct the user_details array
        },
        {
          $project: {
            name: "$user_details.name", // Include name from User collection
            username: "$username", // Include username from SadhnaResult
            final_score: "$final_score", // Include final_score from SadhnaResult
            _id: 0, // Exclude the _id field
          },
        },
      ]);
  
      // Respond with the top 3 leaderboard data
      res.status(200).json(topScores);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
      res.status(500).json({ error: "Failed to fetch leaderboard data" });
    }
  });
  

// POST request to save SevaAllocation details
router.post("/allocateseva", authenticateUser, async (req, res) => {
  try {
    const { department, main_incharge, vice_incharge, scope_of_service } = req.body;

    // Extract username from the token data
    const { username } = req.user;

    // Validate input fields
    if (!department || !main_incharge || !vice_incharge || !scope_of_service) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists and is an admin
    if (!user) {
      return res.status(404).json({ message: "User not found. Access denied." });
    }

    if (!user.is_admin) {
      return res.status(403).json({ message: "You are not an admin. Access denied." });
    }

    // Create a new SevaAllocation document
    const newSeva = new SevaAllocation({
      department,
      main_incharge,
      vice_incharge,
      scope_of_service,
    });

    // Save the document to the database
    await newSeva.save();

    // Respond with success
    res.status(201).json({ message: "Seva Allocation saved successfully!", data: newSeva });
  } catch (error) {
    console.error("Error during Seva Allocation creation:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});


module.exports = router;
