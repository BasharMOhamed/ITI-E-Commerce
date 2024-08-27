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
  
    const productNumberId = Number(productId);
    let cart = await Cart.findOne({ userId: userId, 'items.productId': productNumberId });
  
    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.productId === productNumberId);
      
      if (itemIndex > -1) {
        const newQuantity = cart.items[itemIndex].quantity + quantity;
  
        if (newQuantity <= 0) {
          cart.items.splice(itemIndex, 1);
        } else {
          cart.items[itemIndex].quantity = newQuantity;
        }
        await cart.save();
        console.log('Cart updated:', cart);
      }
    } else {
      cart = new Cart({
        userId: userId,
        items: [{ productId: productNumberId, quantity }]
      });
      await cart.save();
      console.log('New cart created:', cart);
    }
  
    return cart;
}


//              REMOVE FROM CART
async function removeFromCart(userId, productId) {
    await Cart.findOneAndUpdate({ userId: userId }, { $pull: { items: { productId: productId } } });
}



//              GET CART
async function getCart(userId) {
    const cart = await Cart.findOne({ userId: userId }).populate('items.productId');
    
    if (!cart) {
        return [];
    }

    return cart.items.map(item => {
        return {
            product: item.productId,
            quantity: item.quantity
        };
    });
}


module.exports = { addToCart, removeFromCart, getCart };