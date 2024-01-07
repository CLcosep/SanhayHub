import { NextFunction, Request, Response } from "express";
import { Section } from "@prisma/client";
import { validationResult } from "express-validator"
import prisma from "../../db/prisma";
import { createSectionValidation, updateSectionValidation } from "./sectionsValidation";

//create
export const create = [
    ...createSectionValidation,
    async (req: Request, res: Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const form = req.body as Section
        console.log(typeof form.gradeId)
        const section = await prisma.section.findFirst({ where: { name: form.name } })
        if (section) {
            return res.status(400).json({
                message: 'Section already exist make another'
            })
        }
        // Since the gradeLevel is a foreign key, we need to check if it exists first
        const gradeLevelExist = await prisma.gradeLevel.findUnique({ where: { id: form.gradeId } });
        if (!gradeLevelExist) {
            return res.status(400).json({
                message: 'Grade level does not exist'
            })
        }
        const newSection = await prisma.section.create({
            data: form
        })
        return res.json(newSection)
    }
]
//findOne
export async function findOne(req: Request, res: Response) {
    const section = await prisma.section.findUnique({ where: { id: parseInt(req.params.id) } })
    if (!section) {
        return res.status(400).json({
            message: `section #${req.params.id} not found or does not exist`
        })
    }
    return res.status(200).json(section)
}
//findAll
export async function findAll(req: Request, res: Response) {
    const section = await prisma.section.findMany()
    return res.status(200).json(section)
}
// update
export const update = [
    ...updateSectionValidation,
    async (req: Request, res: Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const form = req.body as Section;
        const section = await prisma.section.findUnique({ where: { id: parseInt(req.params.id) } })
        if (!section) {
            return res.status(400).json({
                message: `section #${req.params.id} not found or does not exist`
            })
        }
        const optionalForm: { [key: string]: any } = {}
        if (form.name) {
            optionalForm["name"] = form.name
        }
        if (form.gradeId) {
            const gradeLevelExist = await prisma.gradeLevel.findUnique({ where: { id: form.gradeId } });
            if (!gradeLevelExist) {
                return res.status(400).json({
                    message: 'Grade level does not exist'
                })
            }
            optionalForm["gradeId"] = form.gradeId
        }
        const updatesection = await prisma.section.update({
            where: { id: parseInt(req.params.id) },
            data: optionalForm
        })
        return res.json(updatesection)
    }
]
// remove
export async function remove(req: Request, res: Response) {
    const gradeFind = await prisma.section.findUnique({ where: { id: parseInt(req.params.id) } })
    if (!gradeFind) {
        return res.status(400).json({
            message: `section #${req.params.id} not found or does not exist`
        })
    } else {
        return res.status(200).json(
            await prisma.section.delete({ where: { id: parseInt(req.params.id) } })
        )
    }
}


