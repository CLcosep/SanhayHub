import { body } from "express-validator"

// Express validator checks if the forms is valid and if it is not valid, 
// adds errors to the request object which will be checked by the validationResult(request:Express.Request) function 
export const createUserValidation = [
    body("username") // checks req.body.username
        .exists().withMessage({ message: "Username is required" })
        .trim() // removes extra spaces for ex. form = " memes " the trim() function would remove extra spaces from left and right side returning form = "memes"
        .isLength({ min: 4, max: 32 }).withMessage("Username must be at least 4 characters long and at most 32 characters long"),

    body("password") // checks req.body.password
        .exists().withMessage({ message: "Password is required" })
        .trim()
        .isLength({ min: 8, max: 32 }).withMessage("Password must be at least 8 characters long and at most 32 characters long")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i").withMessage({ message: "Password must contain at least one number and one uppercase and lowercase letter" })
]

export const updateUserValidation = [
    body("username") // checks req.body.username
        .optional() // optional means that it is not required
        .trim() // removes extra spaces for ex. form = " memes " the trim() function would remove extra spaces from left and right side returning form = "memes"
        .isLength({ min: 4, max: 32 }).withMessage("Username must be at least 4 characters long and at most 32 characters long"),

    body("password") // checks req.body.password
        .optional() // optional means that it is not required
        .trim()
        .isLength({ min: 8, max: 32 }).withMessage("Password must be at least 8 characters long and at most 32 characters long")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i").withMessage({ message: "Password must contain at least one number and one uppercase and lowercase letter" })
]