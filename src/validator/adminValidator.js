import { body, param } from "express-validator";
import User from "../model/userModel.js";

const createAdminValidation = [
    body("name")
        .notEmpty().withMessage("Name is required")
        .bail()
        .isLength({ min: 5 }).withMessage("Name must have at least 5 characters"),
    body("username")
        .notEmpty().withMessage("Username is required")
        .bail()
        .isLength({ min: 6, max: 20 }).withMessage("Username must be between 6 and 20 characters")
        .bail()
        .custom(async (value) => {
            const existingUser = await User.findOne({ username: value });
            if (existingUser) throw new Error("Username already exists");
            return true;
        }),
    body("email")
        .notEmpty().withMessage("Email is required")
        .bail()
        .isEmail().withMessage("Invalid email format")
        .bail()
        .custom(async (value) => {
            const existingUser = await User.findOne({ email: value });
            if (existingUser) throw new Error("Email already exists");
            return true;
        }),
    body("password")
        .notEmpty().withMessage("Password is required")
        .bail()
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("contact")
        .notEmpty().withMessage("Contact number is required")
        .bail()
        .isLength({ min: 10, max: 10 }).withMessage("Contact number must be 10 digits long")
        .bail()
        .isNumeric().withMessage("Contact number must contain only digits")
        .bail()
        .custom(async (value) => {
            const existingUser = await User.findOne({ contact: value });
            if (existingUser) throw new Error("Contact already exists");
            return true;
        }),
];

const updateAdminValidation = [
    param("id").isMongoId().withMessage("Invalid user ID."),
    body("name").optional().isLength({ min: 5 }).withMessage("Name must have at least 5 characters"),
    body("username")
        .optional()
        .isLength({ min: 6, max: 20 }).withMessage("Username must be between 6 and 20 characters")
        .bail()
        .custom(async (value, { req }) => {
            const existingUser = await User.findOne({ username: value, _id: { $ne: req.params.id } });
            if (existingUser) throw new Error("Username already exists");
            return true;
        }),
    body("email")
        .optional()
        .isEmail().withMessage("Invalid email format")
        .bail()
        .custom(async (value, { req }) => {
            const existingUser = await User.findOne({ email: value, _id: { $ne: req.params.id } });
            if (existingUser) throw new Error("Email already exists");
            return true;
        }),
    body("contact")
        .optional()
        .isLength({ min: 10, max: 10 }).withMessage("Contact number must be 10 digits long")
        .bail()
        .isNumeric().withMessage("Contact number must contain only digits")
        .bail()
        .custom(async (value, { req }) => {
            const existingUser = await User.findOne({ contact: value, _id: { $ne: req.params.id } });
            if (existingUser) throw new Error("Contact already exists");
            return true;
        }),
];

const updateAdminPasswordValidation = [
    param("id").isMongoId().withMessage("Invalid user ID."),
    body("password")
        .notEmpty().withMessage("Password is required")
        .bail()
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];

const idValidation = [
    param("id").isMongoId().withMessage("Invalid user ID."),
];

export const adminValidator = { createAdminValidation, updateAdminValidation, updateAdminPasswordValidation, idValidation };
