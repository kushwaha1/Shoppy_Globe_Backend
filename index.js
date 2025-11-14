import { configDotenv } from "dotenv";           // Load environment variables
import express from "express";                   // Import Express framework
import { connectDB } from "./src/config/db.js";  // Import DB connection function
import authRoutes from "./src/routes/auth.routes.js";     // Auth routes
import productRoutes from "./src/routes/product.routes.js"; // Product routes
import cartRoutes from "./src/routes/cart.routes.js";       // Cart routes
import cors from "cors";                         // Enable Cross-Origin requests
import morgan from "morgan";                     // HTTP request logger

configDotenv();  // Initialize dotenv
connectDB();     // Connect to MongoDB

const app = express();       // Create Express app

app.use(cors());             // Enable CORS for all routes
app.use(express.json());     // Parse JSON request bodies
app.use(morgan("dev"));      // Log HTTP requests to console

// Route middlewares
app.use('/auth', authRoutes);      // Auth routes: /auth/*
app.use('/products', productRoutes); // Product routes: /products/*
app.use('/cart', cartRoutes);        // Cart routes: /cart/*

const PORT = process.env.PORT || 5000; // Server port
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`); // Server start message
});