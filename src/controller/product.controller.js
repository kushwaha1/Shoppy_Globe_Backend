import Product from '../models/Product.js'; // Import Product model
import { Types } from 'mongoose'; // Import Mongoose Types for ObjectId validation

// -------------------- Get All Products --------------------
export const getProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find().lean();

    // Send success response with product list
    res.status(200).json({
      statusCode: 200,
      message: 'Products fetched successfully',
      data: products
    });
  } catch (err) {
    console.error(err); // Log error to console
    res.status(500).json({ statusCode: 500, message: 'Server error' }); // Send server error response
  }
};

// -------------------- Get Product by ID --------------------
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params; // Get product ID from URL

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ statusCode: 400, message: 'Invalid product id' });
    }

    // Find product by its ID
    const product = await Product.findById(id).lean();

    // If no product found, return 404 error
    if (!product) {
      return res.status(404).json({ statusCode: 404, message: 'Product not found' });
    }

    // Send success response with product details
    res.status(200).json({
      statusCode: 200,
      message: 'Product found successfully',
      data: product
    });
  } catch (err) {
    console.error(err); // Log error to console
    res.status(500).json({ statusCode: 500, message: 'Server error' }); // Send server error response
  }
};