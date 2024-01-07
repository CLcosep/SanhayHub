import { NextFunction, Request, Response } from "express";
import { Subject } from "@prisma/client";
import { validationResult } from "express-validator"
import prisma from "../../db/prisma";
import { createSubjectValidation, updateSubjectValidation } from "./topicsValidation";

//create
export const create = [
    ...createSubjectValidation,
    async (req: Request, res: Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const form = req.body as Subject
        const Subject = await prisma.subject.findFirst({ where: form })
        if (Subject) {
            return res.status(400).json({
                message: 'Subject already exist make another'
            })
        }
        // Since the section is a foreign key, we need to check if it exists first
        const sectionExist = await prisma.section.findUnique({ where: { id: form.sectionId } });
        if (!sectionExist) {
            return res.status(400).json({
                message: 'Section does not exist'
            })
        }
        const newSubject = await prisma.subject.create({
            data: form
        })
        return res.json(newSubject)
    }
]
//findOne
export async function findOne(req: Request, res: Response) {
    if (isNaN(parseInt(req.params.id))) return res.status(400).json({ message: 'Please provide a valid id in params' });
    const Subject = await prisma.subject.findUnique({ where: { id: parseInt(req.params.id) } })
    if (!Subject) {
        return res.status(400).json({
            message: `Subject #${req.params.id} not found or does not exist`
        })
    }
    return res.status(200).json(Subject)
}
//findAll
export async function findAll(req: Request, res: Response) {
    const Subject = await prisma.subject.findMany()
    return res.status(200).json(Subject)
}
// update
export const update = [
    ...updateSubjectValidation,
    async (req: Request, res: Response) => {
        if (isNaN(parseInt(req.params.id))) return res.status(400).json({ message: 'Please provide a valid id in params' });
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const form = req.body as Subject;
        const Subject = await prisma.subject.findUnique({ where: { id: parseInt(req.params.id) } })
        if (!Subject) {
            return res.status(400).json({
                message: `Subject #${req.params.id} not found or does not exist`
            })
        }
        const optionalForm: { [key: string]: any } = {}
        if (form.name) {
            optionalForm["name"] = form.name
        }
        if (form.sectionId) {
            const sectionExist = await prisma.section.findUnique({ where: { id: form.sectionId } });
            if (!sectionExist) {
                return res.status(400).json({
                    message: 'Grade level does not exist'
                })
            }
            optionalForm["sectionId"] = form.sectionId
        }
        // composite unique constraints
        if (form.name && form.sectionId) {
            const SubjectExist = await prisma.subject.findFirst({ where: { name: form.name, sectionId: form.sectionId } });
            if (SubjectExist) {
                return res.status(400).json({
                    message: 'Subject already exist make another'
                })
            }
        }
        if (form.name && !form.sectionId) {
            const SubjectExist = await prisma.subject.findFirst({ where: { name: form.name, sectionId: Subject.sectionId } });
            if (SubjectExist) {
                return res.status(400).json({
                    message: 'Subject already exist make another'
                })
            }
        }
        const updateSubject = await prisma.subject.update({
            where: { id: parseInt(req.params.id) },
            data: optionalForm
        })
        return res.json(updateSubject)
    }
]
// remove
export async function remove(req: Request, res: Response) {
    if (isNaN(parseInt(req.params.id))) return res.status(400).json({ message: 'Please provide a valid id in params' });
    const subject = await prisma.subject.findUnique({ where: { id: parseInt(req.params.id) } })
    if (!subject) {
        return res.status(400).json({
            message: `Subject #${req.params.id} not found or does not exist`
        })
    } else {
        return res.status(200).json(
            await prisma.subject.delete({ where: { id: parseInt(req.params.id) } })
        )
    }
}


