const express = require("express");
const router = express.Router();


const ProtectedController = require("../controllers/protected.controller");
const asyncHandler = require("../utils/asyncHandler");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");
const { userIdValidation } = require("../validations/protected.validate");

router.get("/me/welcome", [auth], asyncHandler(ProtectedController.welcome));
router.get("/me/account-summary", [auth], asyncHandler(ProtectedController.accountSummary));
router.get("/admin/overview", [auth, role(["admin"])], asyncHandler(ProtectedController.overview));
router.get("/admin/users-info", [auth, role(["admin"])], asyncHandler(ProtectedController.usersInfo));
router.delete("/admin/users/:id",[ auth , userIdValidation , role(["admin"])], asyncHandler(ProtectedController.deleteUser));

module.exports = router;