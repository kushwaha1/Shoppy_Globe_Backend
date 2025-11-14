import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true }, // User's name (required, removes extra spaces)
    email: { type: String, required: true, unique: true, lowercase: true, trim: true }, // Unique email (required, auto lowercase)
    password: { type: String, required: true }, // User's password (required)
    createdAt: { type: Date, default: Date.now() } // Record creation date (defaults to current time)
});

// Export the User model
export default mongoose.model('User', userSchema);