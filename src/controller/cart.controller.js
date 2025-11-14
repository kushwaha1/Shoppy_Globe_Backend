import CartItem from '../models/CartItem.js'; // Import CartItem model
import Product from '../models/Product.js';   // Import Product model
import { Types } from 'mongoose';             // Import Mongoose Types for ID validation

// -------------------- GET USER CART --------------------
export const getUserCart = async (req, res) => {
  try {
    const userId = req.user.id; // Get logged-in user ID from request
    // Find all cart items for the user and include product details
    const items = await CartItem.find({ user: userId }).populate('product').lean();

    // Send success response with all cart items
    res.status(200).json({
      statusCode: 200,
      message: 'Cart fetched successfully',
      data: items
    });
  } catch (err) {
    console.error(err); // Log any server error
    res.status(500).json({ statusCode: 500, message: 'Server error' });
  }
};

// -------------------- ADD ITEM TO CART --------------------
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // Logged-in user ID
    const { productId, quantity = 1 } = req.body; // Get product ID and quantity from request body

    // Validate product ID
    if (!productId || !Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ statusCode: 400, message: 'Valid productId is required' });
    }

    // Validate quantity
    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({ statusCode: 400, message: 'Quantity must be a positive integer' });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ statusCode: 404, message: 'Product not found' });

    // Check product stock availability
    if (product.stock < quantity) {
      return res.status(400).json({ statusCode: 400, message: 'Insufficient stock' });
    }

    // Check if product already exists in cart
    let item = await CartItem.findOne({ user: userId, product: productId });
    if (item) {
      // If exists, increase the quantity
      item.quantity += quantity;
      await item.save();
    } else {
      // If not, create a new cart item
      item = await CartItem.create({ user: userId, product: productId, quantity });
    }

    // Send success response
    res.status(200).json({
      statusCode: 200,
      message: 'Product added to cart successfully',
      data: item
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ statusCode: 500, message: 'Server error' });
  }
};

// -------------------- UPDATE CART ITEM --------------------
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id; // Logged-in user ID
    const { id } = req.params;  // Cart item ID from URL
    const { quantity } = req.body; // Updated quantity

    // Validate cart item ID
    if (!id || !Types.ObjectId.isValid(id)) {
      return res.status(400).json({ statusCode: 400, message: 'Invalid cart item id' });
    }

    // Validate quantity
    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({ statusCode: 400, message: 'Quantity must be a positive integer' });
    }

    // Find the cart item by ID and user
    const item = await CartItem.findOne({ _id: id, user: userId });
    if (!item) return res.status(404).json({ statusCode: 404, message: 'Cart item not found' });

    // Check if related product still exists
    const product = await Product.findById(item.product);
    if (!product) return res.status(404).json({ statusCode: 404, message: 'Product not found' });

    // Check if enough stock is available
    if (quantity > product.stock) {
      return res.status(400).json({ statusCode: 400, message: 'Insufficient stock' });
    }

    // Update quantity and save
    item.quantity = quantity;
    await item.save();

    // Send success response
    res.status(200).json({
      statusCode: 200,
      message: 'Cart item updated successfully',
      data: item
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ statusCode: 500, message: 'Server error' });
  }
};

// -------------------- REMOVE ITEM FROM CART --------------------
export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id; // Logged-in user ID
    const { id } = req.params;  // Cart item ID from URL

    // Validate cart item ID
    if (!id || !Types.ObjectId.isValid(id)) {
      return res.status(400).json({ statusCode: 400, message: 'Invalid cart item id' });
    }

    // Delete the cart item
    const deleted = await CartItem.findOneAndDelete({ _id: id, user: userId });
    if (!deleted) return res.status(404).json({ statusCode: 404, message: 'Cart item not found' });

    // Send success response
    res.status(200).json({
      statusCode: 200,
      message: 'Cart item removed successfully',
      data: deleted
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ statusCode: 500, message: 'Server error' });
  }
};