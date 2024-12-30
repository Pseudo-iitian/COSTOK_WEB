const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://vermaabhimanyu593:MniLtQC4XZ84rIDE@costok.mcz6c.mongodb.net/BMS";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 60000,  // 60 seconds timeout
  socketTimeoutMS: 60000,   // 60 seconds socket timeout
};

mongoose.connect(mongoURI, options)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((e) => {
    console.log("Failed to connect to MongoDB");
    console.error(e);
  });
