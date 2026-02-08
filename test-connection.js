require("dotenv").config();
const mongoose = require("mongoose");

console.log("Testing MongoDB connection...");
console.log("URI:", process.env.MONGODB_URI.replace(/:[^:@]+@/, ":****@"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:");
    console.error(error.message);
    process.exit(1);
  });

setTimeout(() => {
  console.error("⏱️  Connection timeout after 30 seconds");
  process.exit(1);
}, 30000);
