import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectDB() {
  try {
    if (MongoServerClosedError.connection.readyState >= 1) {
      console.log("MD Already Connected");
      return;
    }
    await mongoose.connect(MONGODB_URI);
    console.log("MD connected successfully");
  } catch (err) {
    console.log("MD connection error:", err);
  }
}
