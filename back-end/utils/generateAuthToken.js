const jwt = require("jsonwebtoken");

const generateAuthToken = (username) => {
  return jwt.sign(
    {username},
    process.env.JWT_SECRET_KEY,
    { expiresIn: "30d" }
  );
};
module.exports = generateAuthToken