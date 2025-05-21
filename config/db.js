const mongoose = require("mongoose");
const URL = process.env.DB
const connectDB = async () => {
  try {
    console.log("db connecting",);
    await mongoose.connect(process.env.DB);
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
