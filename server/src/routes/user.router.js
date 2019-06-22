const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

// (POST:新規登録 DELETE:退会)
router
  .route("/")
  .post(userController.signup)
  .delete(userController.deactivate);

// ログイン
router.post("/login", userController.signin);

module.exports = router;
