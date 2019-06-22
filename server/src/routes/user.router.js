const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

// 新規登録
router.post("/", userController.signup);

// ログイン
router.post("/login", userController.signin);

// 退会
router.delete("/", userController.deactivate);

module.exports = router;
