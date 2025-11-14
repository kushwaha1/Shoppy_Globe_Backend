import { configDotenv } from "dotenv"; // Load environment variables from .env
import mongoose from "mongoose";       // Import Mongoose for MongoDB

configDotenv(); // Initialize dotenv

// Function to connect to MongoDB
export const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI; // Get MongoDB URI from env

        // Check if URI exists
        if (!mongoUri) {
            throw new Error("MongoDB URI is missing. Check your .env file.");
        }

        await mongoose.connect(mongoUri); // Connect to MongoDB
        console.log('MongoDB connected'); // Success message
    } catch (error) {
        console.error('MongoDB connection error:', error); // Log connection error
        process.exit(1); // Exit process on failure
    }
}