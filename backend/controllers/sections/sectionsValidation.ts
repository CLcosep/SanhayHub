import { body, check } from "express-validator"
//name String
//gradeInt Int
export const createSectionValidation = [
    body('name')
        .exists().withMessage({ message: 'name is required ' })
        .trim()
        .isLength({ min: 1, max: 32 }).withMessage({ message: 'name must me minimum of 1 or 32 characters' }),
    body('gradeId')
        .exists().withMessage({ message: 'provide a grade Id' })
        .toInt()
        .isNumeric().withMessage({ message: 'must be a number' }),
]

export const updateSectionValidation = [
    body('name')
        .optional()
        .trim()
        .isLength({ min: 1, max: 32 }).withMessage({ message: 'name must me minimum of 1 or 32 characters' }),
    body('gradeId')
        .optional()
        .toInt()
        .isNumeric().withMessage({ message: 'must be a number' })
]