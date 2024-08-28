const Cart = require('../Models/cart');
const mongoose = require('mongoose');
const Product = require('../Models/Product');

//              ADD TO CART
async function addToCart(userId, productId, quantity) {
    console.log('Adding to cart: userId =', userId, ', productId =', productId, ', quantity =', quantity);
  
    let product = await Cart.findOne({ userId: userId, productId: productId });
  
    if (product) {
        if (product.quantity + quantity <= 0) {
            await removeFromCart(userId, productId);
        } else {
        Cart.findOneAndUpdate( product._Id , { quantity: product.quantity + quantity });  
      product.quantity += quantity;
      await product.save();
      console.log('Cart updated:', product);
    }
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
    return products.map(x=> {
        return {
            product: x.productId,
            quantity: x.quantity
        };
    });
};


module.exports = { addToCart, removeFromCart, getCart };