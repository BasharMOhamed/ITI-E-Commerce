const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const authenticate = async (req, res, next) => {
  let token = req.cookies.jwt;
  console.log("token: ", token);
  if (!token)
    return res.status(401).json({ error: "You are not authenticated" });
  try {
    const decoded = jwt.verify(token, "abac12afsdkjladf");
    req.user = await User.findById(decoded.userID).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not Authorized, token failed" });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin");
  }
};

module.exports = { authenticate, authorizeAdmin };
