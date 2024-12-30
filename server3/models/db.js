const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://vermaabhimanyu593:MniLtQC4XZ84rIDE@costok.mcz6c.mongodb.net/BMS";

// Define connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 60000,  // 60 seconds timeout for initial connection
  socketTimeoutMS: 60000,   // 60 seconds timeout for socket inactivity
};

// Establish MongoDB connection with options
mongoose.connect(mongoURI, options)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((e) => {
    console.log("Failed to connect to MongoDB");
    console.error(e);
  });
