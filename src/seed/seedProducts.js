import { connectDB } from "../config/db.js"; // DB connection function
import Product from "../models/Product.js";  // Product model

// Array of sample products to seed
const products = [
  { name: "Wireless Bluetooth Headphones", price: 1299, description: "Over-ear, noise-isolating headphones with 20hr battery.", stock: 45 },
  { name: "USB-C Fast Charger 30W", price: 799, description: "Compact PD charger for phones and tablets.", stock: 120 },
  { name: "Stainless Steel Water Bottle 750ml", price: 499, description: "Insulated bottle keeps drinks cold for 24hr.", stock: 200 },
  { name: "Ergonomic Office Chair", price: 8999, description: "Adjustable lumbar support, breathable mesh.", stock: 15 },
  { name: "Mechanical Gaming Keyboard", price: 3499, description: "RGB backlight, blue switches.", stock: 60 },
  { name: "Wireless Mouse (Optical)", price: 699, description: "Silent clicks, 1600 DPI.", stock: 180 },
  { name: "27\" Full HD Monitor", price: 10499, description: "IPS panel, 75Hz refresh rate.", stock: 22 },
  { name: "Portable SSD 1TB", price: 6999, description: "USB 3.1 high-speed external SSD.", stock: 55 },
  { name: "Smart LED Bulb (RGB)", price: 899, description: "Wi-Fi controlled, schedule & scenes.", stock: 240 },
  { name: "Fitness Tracker Band", price: 1999, description: "Heart rate + sleep tracking, 7-day battery.", stock: 95 },
  { name: "Noise Cancelling Earbuds", price: 2499, description: "True wireless, charging case.", stock: 80 },
  { name: "Portable Bluetooth Speaker", price: 1799, description: "Water resistant, 12hr playback.", stock: 130 },
  { name: "Laptop Sleeve 15.6\"", price: 699, description: "Neoprene, padded protection.", stock: 300 },
  { name: "4K Action Camera", price: 5499, description: "Waterproof, 4K@30fps recording.", stock: 25 },
  { name: "Wireless Charging Pad", price: 999, description: "Qi-certified fast wireless charger.", stock: 140 },
  { name: "Smartwatch (Fitness)", price: 5999, description: "Notifications, GPS, multi-sport modes.", stock: 40 },
  { name: "Electric Kettle 1.7L", price: 1599, description: "Auto shut-off, stainless steel.", stock: 75 },
  { name: "Ceramic Non-stick Frypan 28cm", price: 999, description: "Durable ceramic coating.", stock: 190 },
  { name: "Cotton Bedsheet Set (Queen)", price: 2499, description: "100% cotton, 3-piece set.", stock: 85 },
  { name: "Kids Wooden Puzzle Set", price: 599, description: "Educational 24-piece puzzle.", stock: 220 },
  { name: "Travel Backpack 40L", price: 2199, description: "Water-resistant with laptop sleeve.", stock: 65 },
  { name: "Digital Air Fryer 3.5L", price: 4999, description: "Oil-less frying with preset programs.", stock: 32 },
  { name: "Home Security Camera (2-pack)", price: 3999, description: "1080p IP cameras with night vision.", stock: 48 },
  { name: "Electric Toothbrush (Rechargeable)", price: 2199, description: "Multiple cleaning modes, 2-week battery.", stock: 110 },
  { name: "Bluetooth Car FM Transmitter", price: 699, description: "Hands-free calls and music playback.", stock: 260 },
  { name: "Photo Paper Pack (100 sheets)", price: 999, description: "Glossy A4 inkjet photo paper.", stock: 420 },
  { name: "Gaming Headset with Mic", price: 1999, description: "Surround sound, noise-reducing mic.", stock: 73 },
  { name: "LED Desk Lamp with USB", price: 899, description: "Adjustable brightness & color temp.", stock: 210 },
  { name: "Standing Desk Mat", price: 1299, description: "Anti-fatigue mat for comfort.", stock: 150 },
  { name: "Wireless HDMI Display Adapter", price: 2999, description: "Mirror smartphone/laptop to TV.", stock: 38 }
];

// Function to seed products into DB
const seedProducts = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    console.log("MongoDB Connected");

    // Optional: clear old products
    // await Product.deleteMany({});

    const count = await Product.countDocuments(); // Check if products already exist
    if (count > 0) {
      console.log("Products already exist. Skipping insert.");
      process.exit(0); // Exit if products exist
    }

    // Insert all products
    const result = await Product.insertMany(products);
    console.log(`${result.length} products inserted successfully.`);
  } catch (error) {
    console.error("Error inserting products:", error.message); // Log error
  } finally {
    process.exit(); // Exit process after seeding
  }
};

// Run the seed function
seedProducts();