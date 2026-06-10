const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const asyncHandler = require("../utils/asyncHandler");
const auth = require("../middlewares/auth");
const optionalAuth = require("../middlewares/optionalAuth");
const { loginLimiter } = require("../middlewares/limiter");
const { registerValidation, loginValidation } = require("../validations/auth.validate");


router.post("/register",[registerValidation], asyncHandler(authController.register));
router.post("/login", [loginLimiter, ...loginValidation], asyncHandler(authController.login));
router.post("/logout",[auth], asyncHandler(authController.logout));
router.post("/profile", [auth], asyncHandler(authController.getProfile));
router.put("/refresh-token", asyncHandler(authController.refreshToken));

module.exports = router;