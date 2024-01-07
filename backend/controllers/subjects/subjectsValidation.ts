import { body } from "express-validator"
//name String
//gradeInt Int
export const createSubjectValidation = [
    body('name')
        .exists().withMessage({ message: 'name is required ' })
        .trim()
        .isLength({ min: 1, max: 32 }).withMessage({ message: 'name must me minimum of 1 or 32 characters' }),
    body('sectionId')
        .exists().withMessage({ message: 'provide a section Id' })
        .toInt()
        .isNumeric().withMessage({ message: 'must be a number' })
]

export const updateSubjectValidation = [
    body('name')
        .optional()
        .trim()
        .isLength({ min: 1, max: 32 }).withMessage({ message: 'name must me minimum of 1 or 32 characters' }),
    body('sectionId')
        .optional()
        .toInt()
        .isNumeric().withMessage({ message: 'must be a number' })
]