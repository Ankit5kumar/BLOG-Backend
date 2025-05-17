const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://BlogDB:Ankit5kumar@cluster0.k4tgqaz.mongodb.net/BlogDB");
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
