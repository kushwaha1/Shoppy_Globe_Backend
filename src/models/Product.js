import mongoose from "mongoose";

// Define product schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },        // Product name
    price: { type: Number, required: true, min: 0 },           // Product price (min 0)
    description: { type: String, default: '' },                // Product description
    stock: { type: Number, default: 0, min: 0 },               // Product stock quantity
    createdAt: { type: Date, default: Date.now }               // Creation date
});

// Export product model
export default mongoose.model('Product', productSchema);