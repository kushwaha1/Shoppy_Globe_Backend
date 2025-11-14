import express from 'express';
import { getUserCart, addToCart, updateCartItem, removeCartItem } from '../controller/cart.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Apply authentication middleware to all cart routes
router.use(auth);

// Get all items in the user's cart
router.get('/', getUserCart);

// Add a new item to the cart
router.post('/', addToCart);

// Update quantity or details of a cart item by ID
router.put('/:id', updateCartItem);

// Remove a cart item by ID
router.delete('/:id', removeCartItem);

// Export router to use in main app
export default router;