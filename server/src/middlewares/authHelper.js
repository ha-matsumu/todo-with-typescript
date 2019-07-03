const jwt = require("jsonwebtoken");
const boom = require("boom");
require("dotenv").config()

module.exports = {
  verifyToken: (req, res) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
      return boom.forbidden("No token provided.");
    }

    return jwt.verify(token, process.env.AUTH_SECRET_KEY, (err, decoded) => {
      if (err) {
        return boom.unauthorized("Invalid token.");
      }
      req.decoded = decoded;
      return { statusCode: 200 };
    });
  }
};
