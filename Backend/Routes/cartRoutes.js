const express = require('express');
const router = express.Router();
const shoppingCartController = require('../Controllers/shoppingCart'); 
const { addToCart, removeFromCart, getCart } = require('../Controllers/shoppingCart');

const authenticate = require('../middleware/authenticate');

router.get("/cart", authenticate, async (req, res) => {
    const userId = req.user.id;
    const cart = await getCart(userId);
    res.json(cart);
});

router.post("/cart/:id", authenticate, async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id;
    const quantity = req.body.quantity;
    const items = await addToCart(userId, productId, quantity);
    res.res(items);
});

router.delete("/cart/:id", authenticate, async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id;
    const items = await removeFromCart(userId, productId);
    res.res(items);
});
  
module.exports = router;