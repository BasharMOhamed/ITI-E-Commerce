const Cart = require('../Models/cart');
const Product = require('../models/Product');

//              ADD TO CART
async function addToCart(userId, productId, quantity) {
    let product = await cart.findOne({ userId: userId,  'items.productId': productId });
    if (product) {
        if (product.items.quantity + quantity <= 0) {
            await removeFromCart(userId, productId);
        } else {
            await cart.findOneAndUpdate({ 'items.productId': productId }, { quantity: product.item.quantity + quantity} );
        }
    } else {
        product = new cart({
            userId: userId,
            items: [{ productId, quantity }]
        });
        await product.save();
    }
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