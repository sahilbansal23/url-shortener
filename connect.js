const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    return mongoose.connect(url);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return false; // Exit process with failure
  }
};

module.exports = { connectDB };
