const jwt = require("jsonwebtoken");

// JWT Configuration
const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: "7d",
};

module.exports = jwtConfig;
