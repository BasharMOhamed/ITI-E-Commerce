const Cart = require('../Models/cart');
const mongoose = require('mongoose');
const Product = require('../Models/Product');

//              ADD TO CART
async function addToCart(userId, productId, quantity) {
    console.log('Adding to cart: userId =', userId, ', productId =', productId, ', quantity =', quantity);
  
    if (isNaN(productId)) {
      console.log('Invalid product ID');
      throw new Error('Invalid product ID');
    }
  
    let product = await Cart.findOne({ userId: userId, productId: productId });
  
    if (product) {
      await Cart.findByIdAndUpdate( product._Id, {quantity: product.quantity + quantity});
    } else {
      product = new Cart({
        userId: userId,
        productId: productId, 
        quantity: quantity
      });
      await product.save();
      console.log('New cart created:', product);
    }
  
    return product;
}


//              REMOVE FROM CART
async function removeFromCart(userId, productId) {
    await Cart.findOneAndDelete({ userId: userId, productId: productId });
}



//              GET CART
async function getCart(userId) {
    const products = await Cart.find({ userId: userId }).populate('productId');
    
    if (!products) {
        return [];
    }

    console.log('Cart Items:', products);
    return products.map(x=>x.productId);
}


module.exports = { addToCart, removeFromCart, getCart };