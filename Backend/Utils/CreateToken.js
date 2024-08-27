const jwt = require("jsonwebtoken");

const generateToken = (res, userID) => {
  const token = jwt.sign({ userID }, "abac12afsdkjladf", {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "None",
    secure: true,
  });
  return token;
};

module.exports = generateToken;
