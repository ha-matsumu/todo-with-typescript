const jwt = require("jsonwebtoken");
const boom = require("boom");
require("dotenv").config();

module.exports = {
  verifyToken: (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return boom.forbidden("No token provided.");
    }

    const token = authHeader.split(" ")[1];

    return jwt.verify(token, process.env.AUTH_SECRET_KEY, (err, decoded) => {
      if (err) {
        return boom.unauthorized("Invalid token.");
      }
      req.decoded = decoded;
      return { statusCode: 200 };
    });
  }
};
