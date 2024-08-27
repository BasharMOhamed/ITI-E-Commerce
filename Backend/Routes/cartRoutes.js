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
      if (!userId) return res.status(400).json({ error: "User ID is required" });
      const cart = await getCart(userId);
      res.json(cart);
    } catch (error) {
      console.error("Error in GET /cart:", error); // Log detailed error
      res.status(500).json({ error: "Server error" });
    }
  });
  
  router.post("/cart/:id", authenticate, async (req, res) => {
    try {
      const userId = req.user.id;
      const productId = req.params.id;
      const quantity = req.body.quantity;
  
      if (!userId || !productId || !quantity) {
        return res.status(400).json({ error: "User ID, product ID, and quantity are required" });
      }
  
      const items = await addToCart(userId, productId, quantity);
      res.status(201).json(items);
    } catch (error) {
      console.error("Error in POST /cart/:id:", error); // Log detailed error
      res.status(500).json({ error: "Server error" });
    }
  });
  
  router.delete("/cart/:id", authenticate, async (req, res) => {
    try {
      const userId = req.user.id;
      const productId = req.params.id;
  
      if (!userId || !productId) {
        return res.status(400).json({ error: "User ID and product ID are required" });
      }
  
      const items = await removeFromCart(userId, productId);
      res.json(items);
    } catch (error) {
      console.error("Error in DELETE /cart/:id:", error); // Log detailed error
      res.status(500).json({ error: "Server error" });
    }
  });
  

module.exports = router;
