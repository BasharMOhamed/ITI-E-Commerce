const express = require("express");
const router = express.Router();
const {
  addToCart,
  removeFromCart,
  getCart,
} = require("../Controllers/shoppingCart");

const { authenticate } = require("../Middlewares/authMiddleware");

router.get("/cart", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await getCart(userId);
    res.json(cart); // Correct response method
  } catch (error) {
    res.status(500).json({ error: "Server error" }); // Handle errors
  }
});

// POST /cart/:id
router.post("/cart/:id", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;
    const quantity = req.body.quantity;
    const items = await addToCart(userId, productId, quantity);
    res.json(items); // Correct response method
  } catch (error) {
    res.status(500).json({ error: "Server error" }); // Handle errors
  }
});

// DELETE /cart/:id
router.delete("/cart/:id", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;
    const items = await removeFromCart(userId, productId);
    res.json(items); // Correct response method
  } catch (error) {
    res.status(500).json({ error: "Server error" }); // Handle errors
  }
});

module.exports = router;
