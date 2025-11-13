import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';
import { Types } from 'mongoose';

export const getUserCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const items = await CartItem.find({ user: userId }).populate('product').lean();
    res.status(200).json({
      statusCode: 200,
      message: 'Cart fetched successfully',
      data: items
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ statusCode: 500, message: 'Server error' });
  }
};

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;

    if (!productId || !Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ statusCode: 400, message: 'Valid productId is required' });
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({ statusCode: 400, message: 'Quantity must be a positive integer' });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ statusCode: 404, message: 'Product not found' });
    if (product.stock < quantity) return res.status(400).json({ statusCode: 400, message: 'Insufficient stock' });

    let item = await CartItem.findOne({ user: userId, product: productId });
    if (item) {
      item.quantity += quantity;
      await item.save();
    } else {
      item = await CartItem.create({ user: userId, product: productId, quantity });
    }

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

export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { quantity } = req.body;

    if (!id || !Types.ObjectId.isValid(id)) {
      return res.status(400).json({ statusCode: 400, message: 'Invalid cart item id' });
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({ statusCode: 400, message: 'Quantity must be a positive integer' });
    }

    const item = await CartItem.findOne({ _id: id, user: userId });
    if (!item) return res.status(404).json({ statusCode: 404, message: 'Cart item not found' });

    const product = await Product.findById(item.product);
    if (!product) return res.status(404).json({ statusCode: 404, message: 'Product not found' });
    if (quantity > product.stock) return res.status(400).json({ statusCode: 400, message: 'Insufficient stock' });

    item.quantity = quantity;
    await item.save();

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

export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    if (!id || !Types.ObjectId.isValid(id)) {
      return res.status(400).json({ statusCode: 400, message: 'Invalid cart item id' });
    }

    const deleted = await CartItem.findOneAndDelete({ _id: id, user: userId });
    if (!deleted) return res.status(404).json({ statusCode: 404, message: 'Cart item not found' });

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