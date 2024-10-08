import { body, ValidationChain, validationResult } from "express-validator";
import { Response, Request, NextFunction } from "express";

const handleValidationErrors = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const validateRegister :any= [
    body("firstName")
        .notEmpty().withMessage("Please provide first name")
        .isString().withMessage("First name must be text")
        .isLength({ min: 3 }).withMessage("Min length is 3"),
    
    body("lastName")
        .notEmpty().withMessage("Please provide last name")
        .isString().withMessage("Last name must be text")
        .isLength({ min: 3 }).withMessage("Min length is 3"),
    
    body("email")
        .notEmpty().withMessage("Please provide an email")
        .isString().isEmail(),
    body("address")
        .notEmpty().withMessage("Please provide an address")
        .isString(),
    
    body("password")
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[A-Za-z]/).withMessage('Password must contain at least one letter')
        .matches(/[^A-Za-z0-9]/).withMessage('Password must contain at least one symbol'),

    handleValidationErrors 
];


export const validationLogin :any =[
    body("email")
        .notEmpty().withMessage("Please provide an email")
        .isString().isEmail(),
        handleValidationErrors
]