import Product from '../models/Product.js';
import { Types } from 'mongoose';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.status(200).json({
      statusCode: 200,
      message: 'Products fetched successfully',
      data: products
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ statusCode: 500, message: 'Server error' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ statusCode: 400, message: 'Invalid product id' });
    }

    const product = await Product.findById(id).lean();
    if (!product) return res.status(404).json({ statusCode: 404, message: 'Product not found' });

    res.status(200).json({
      statusCode: 200,
      message: 'Product found successfully',
      data: product
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ statusCode: 500, message: 'Server error' });
  }
};