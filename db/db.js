import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase timeout to 15 seconds
      socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
    });
   
    console.log("Database connected successfully");
  } catch (error) {
    console.log(`Error in Connecting to database`, error);
  }
};

export default connectDB;
