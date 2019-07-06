const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();
const verifyToken = require("../middlewares/authHelper");

// 新規登録
router.post("/", userController.signup);

// ログイン
router.post("/login", userController.signin);

// 退会
router.delete("/:id", verifyToken, userController.deactivate);

module.exports = router;
