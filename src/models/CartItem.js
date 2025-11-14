import mongoose from 'mongoose'; // Import mongoose

// Define cart item schema
const cartItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, // Reference to User
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }, // Reference to Product
  quantity: {
    type: Number,
    default: 1,
    min: 1
  }, // Quantity of product
  addedAt: {
    type: Date,
    default: Date.now()
  } // Date when added to cart
});

// Prevent same product from being added twice for same user
cartItemSchema.index({ user: 1, product: 1 }, { unique: true });

// Export cart item model
export default mongoose.model('CartItem', cartItemSchema);