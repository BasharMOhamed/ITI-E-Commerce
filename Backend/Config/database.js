const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://bashareg6645:BASHAR1234@cluster0.rw8cjr1.mongodb.net/E-commerce?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Successfully connected to MongoDB 😉");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
