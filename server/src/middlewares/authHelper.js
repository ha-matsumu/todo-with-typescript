const jwt = require("jsonwebtoken");
const boom = require("boom");
require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const error = boom.forbidden("No token provided.");
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.AUTH_SECRET_KEY, (err, decoded) => {
    if (err) {
      const error = boom.unauthorized("Invalid token.");
      return next(error);
    }
    req.decoded = decoded;
    req.statusCode = 200;
    next();
  });
};
