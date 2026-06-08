const { param } = require("express-validator");
const validate = require("../middlewares/validate");

const userIdValidation = [
    param("id")
    .isMongoId().withMessage("Invalid user ID format"),

    validate
]

module.exports = {
    userIdValidation
}