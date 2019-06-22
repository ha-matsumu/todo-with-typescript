const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

// 新規登録
router.post("/signup", userController.signup);

// ログイン
router.post("/signin", userController.signin);

// 退会
router.delete("/", userController.deactivate);

module.exports = router;
