import express from 'express';
import { getProducts, getProductById } from '../controller/product.controller.js';

const router = express.Router();

// Fetch all products from the database
router.get('/', getProducts);

// Fetch a single product by its ID
router.get('/:id', getProductById);

// Export router to use in main app
export default router;