const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: Number, required: true },
      quantity: { type: Number, required: true, min: 1 }
    }
  ],
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;