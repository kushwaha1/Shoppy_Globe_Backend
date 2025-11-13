import express from 'express';
import { getUserCart, addToCart, updateCartItem, removeCartItem } from '../controller/cart.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();
router.use(auth);

router.get('/', getUserCart);
router.post('/', addToCart);
router.put('/:id', updateCartItem);
router.delete('/:id', removeCartItem);

export default router;
