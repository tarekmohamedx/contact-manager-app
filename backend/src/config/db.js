const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://tarekdb:13ttt2YYjABmJiq5@mongodb.4vz18.mongodb.net/ContactManager?retryWrites=true&w=majority&appName=MongoDB");
    console.log(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ Database Connection Failed" + err.message);
  }
};
module.exports = connectDB;