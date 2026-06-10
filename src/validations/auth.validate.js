const { body } = require("express-validator");
const validate = require("../middlewares/validate");
const User = require("../models/User");

const registerValidation = [
    body("name")
    .isString().withMessage("Name must be a string")
    .isLength({ min: 2, max: 100 }).withMessage("Name must be between 2 and 50 characters long"),


    body("email")
    .isString().withMessage("Email must be a string")
    .isEmail().withMessage("Invalid email format")
    .custom(async (email) => {
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            throw new Error("Email already exists");
        }
        return true;
    }),

    body("password")
    .isString().withMessage("Password must be a string")
    .isStrongPassword({
        minLength: 8,
        minNumbers : 1,
        minLowercase: 2,
        minUppercase: 1,
        minSymbols : 1
    }).withMessage("Password is weak"),

    body("role")
    .isString().withMessage("Role must be a string")
    .isIn(["user", "admin"]).withMessage("Role must be either 'user' or 'admin'"),

    validate
]

const loginValidation = [
     body("email")
     .isString().withMessage("Email must be a string")
     .isEmail().withMessage("Invalid email format")
     .custom(async (email) => {
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            throw new Error("Email already exists");
        }
        return true;
    }),

    body("password")
    .isString().withMessage("Password must be a string")
]


module.exports = {
    registerValidation,
    loginValidation
}