import { body } from "express-validator"
//name String
//gradeNo Int
export const createGradeLevelValidation = [
    body('name')
        .exists().withMessage({message: 'name is required '})
        .trim()
        .isLength({min: 1, max: 32}).withMessage({message: 'name must me minimum of 1 or 32 characters'}),
    body('gradeNo')
        .exists().withMessage({message: 'provide a grade number'})
        .toInt()
        .isNumeric().withMessage({message: 'must be a number'})
        .isInt({min: 7, max: 12}).withMessage({message: 'grade number must not be below 7 or exceed 12'})
] 

export const updateGradeLevelValidation = [
    body('name')
        .optional()
        .trim()
        .isLength({min:1, max: 32}).withMessage({message: 'name must be minimum of 1 or 32 characters'}),
    body('gradoNo')
        .optional()
        .toInt()
        .isNumeric().withMessage({message: 'must be a number'})
        .isInt({min: 7, max: 12}).withMessage({message: 'grade number must not be below 7 or exceed 12'})
]