const express = require("express");
const {
  createUser,
  login,
  logoutCurrentUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  getUserByID,
} = require("../Controllers/userControllers");
const {
  authenticate,
  authorizeAdmin,
} = require("../Middlewares/authMiddleware");
const router = express.Router();

router.route("/register").post(createUser);

router.post("/auth", login);
router.post("/logout", logoutCurrentUser);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

router.route("/:id").get(authenticate, authorizeAdmin, getUserByID);

module.exports = router;
