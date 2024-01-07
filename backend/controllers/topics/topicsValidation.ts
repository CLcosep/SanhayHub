import { body } from "express-validator"
//name String
//gradeInt Int
export const createTopicValidation = [
    body('name')
        .exists().withMessage({ message: 'name is required ' })
        .trim()
        .isLength({ min: 1, max: 32 }).withMessage({ message: 'name must me minimum of 1 or 32 characters' }),
    body('subjectId')
        .exists().withMessage({ message: 'provide a subject Id' })
        .toInt()
        .isNumeric().withMessage({ message: 'must be a number' })
]

export const updateTopicValidation = [
    body('name')
        .optional()
        .trim()
        .isLength({ min: 1, max: 32 }).withMessage({ message: 'name must me minimum of 1 or 32 characters' }),
    body('subjectId')
        .optional()
        .toInt()
        .isNumeric().withMessage({ message: 'must be a number' })
]