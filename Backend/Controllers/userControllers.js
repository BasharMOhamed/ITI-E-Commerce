const User = require("../Models/User.js");
const bcrypt = require("bcrypt");
const createToken = require("../Utils/CreateToken.js");

//              CREATE USER
const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "Email already in use" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({ username, email, password: hashedPassword });
  try {
    await user.save();
    createToken(res, user._id);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//                LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  const user = await User.findOne({ email });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      createToken(res, user._id);
      return res.status(200).json({ message: "Logged in successfully" });
    } else {
      return res.status(400).json({ message: "Invalid password" });
    }
  } else {
    return res.status(404).json({ message: "This user is not found" });
  }
};

//              LOGOUT
const logoutCurrentUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({ message: "Logged out Successfully" });
};

//            GET USER PROFILE
const getCurrentUserProfile = async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  } else {
    return res.status(200).json(user);
  }
};

//          UPDATE USER PROFILE
const updateCurrentUserProfile = async (req, res) => {
  const userId = req.user._id;
  const { username, email, password } = req.body;
  const user = await User.findById(userId);
  if (user) {
    user.username = username || user.username;
    user.email = email || user.email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }
    const updatedUser = await user.save();
    return res.status(200).json(updatedUser);
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};

//            FIND USER BY ID
const getUserByID = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId).select("-password");
  if (user) {
    return res.status(200).json(user);
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};

module.exports = {
  createUser,
  login,
  logoutCurrentUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  getUserByID,
};
