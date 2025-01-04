const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://vermaabhimanyu593:MniLtQC4XZ84rIDE@costok.mcz6c.mongodb.net/BMS";

const options = {
  connectTimeoutMS: 60000,  // 60 seconds timeout
  socketTimeoutMS: 60000,   // 60 seconds socket timeout
};

let isConnected = false;

const connectToMongoDB = async () => {
  if (!isConnected) {
    try {
      await mongoose.connect(mongoURI, options);
      isConnected = true;
      console.log("MongoDB connected successfully");
    } catch (e) {
      console.log("Failed to connect to MongoDB");
      console.error(e);
    }
  } else {
    console.log("MongoDB is already connected");
  }
};

connectToMongoDB();
