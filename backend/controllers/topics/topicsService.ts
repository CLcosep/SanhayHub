import { NextFunction, Request, Response } from "express";
import { Topic } from "@prisma/client";
import { Location, validationResult } from "express-validator"
import prisma from "../../db/prisma";
import { createTopicValidation, updateTopicValidation } from "./topicsValidation";
import { uploadPDF } from "../../microservices/supabase";
//create
export const create = [
    ...createTopicValidation,
    async (req: Request, res: Response) => {
        // file validation
        const errors = validationResult(req);
        let fileError: any = [];
        if (!req.file) {
            fileError.push({ type: 'field', msg: 'Please provide a file', location: 'file' as Location, path: 'file', value: req.file })
        }
        else {
            if (req.file.mimetype !== "application/pdf") {
                fileError.push({ type: 'field', msg: 'Please provide a pdf file', location: 'file' as Location, path: 'file/mimetype', value: req.file.mimetype })
            }
            if (req.file.size > 1024 * 1024 * 10) {
                fileError.push({ type: 'field', msg: 'Please provide a file less than 10mb', location: 'file' as Location, path: 'file/size', value: req.file.size })
            }
        }
        if (!errors.isEmpty() || fileError.length > 0) {
            (!fileError) ? res.status(400).json({ errors: errors.array() }) : res.status(400).json({ errors: [...errors.array(), fileError] });
            return;
        }
        const form = req.body as Topic;
        const Topic = await prisma.topic.findFirst({ where: form });
        if (Topic) {
            return res.status(400).json({
                message: 'Topic already exist make another'
            });
        }
        // Since the subject is a foreign key, we need to check if it exists first
        const subjectExist = await prisma.subject.findUnique({ where: { id: form.subjectId } });
        if (!subjectExist) {
            return res.status(400).json({
                message: 'Subject does not exist'
            })
        }
        req.body.file = await uploadPDF(req.file);
        const newTopic = await prisma.topic.create({
            data: form
        })
        return res.json(newTopic)
    }
]
//findOne
export async function findOne(req: Request, res: Response) {
    if (isNaN(parseInt(req.params.id))) return res.status(400).json({ message: 'Please provide a valid id in params' });
    const Topic = await prisma.topic.findUnique({ where: { id: parseInt(req.params.id) } })
    if (!Topic) {
        return res.status(400).json({
            message: `Topic #${req.params.id} not found or does not exist`
        })
    }
    return res.status(200).json(Topic)
}
//findAll
export async function findAll(req: Request, res: Response) {
    const Topic = await prisma.topic.findMany()
    return res.status(200).json(Topic)
}
// update
export const update = [
    ...updateTopicValidation,
    async (req: Request, res: Response) => {
        if (isNaN(parseInt(req.params.id))) return res.status(400).json({ message: 'Please provide a valid id in params' });
        const errors = validationResult(req)
        let fileError: any = [];
        // only checks if there is file since it is optional in update
        if (req.file) {
            if (req.file.mimetype !== "application/pdf") {
                fileError.push({ type: 'field', msg: 'Please provide a pdf file', location: 'file' as Location, path: 'file/mimetype', value: req.file.mimetype })
            }
            if (req.file.size > 1024 * 1024 * 10) {
                fileError.push({ type: 'field', msg: 'Please provide a file less than 10mb', location: 'file' as Location, path: 'file/size', value: req.file.size })
            }
        }
        if (!errors.isEmpty() || fileError.length > 0) {
            (!fileError) ? res.status(400).json({ errors: errors.array() }) : res.status(400).json({ errors: [...errors.array(), fileError] });
            return;
        }
        const form = req.body as Topic;
        const Topic = await prisma.topic.findUnique({ where: { id: parseInt(req.params.id) } })
        if (!Topic) {
            return res.status(400).json({
                message: `Topic #${req.params.id} not found or does not exist`
            })
        }
        const optionalForm: { [key: string]: any } = {}
        console.log(form);
        if (form.name) {
            optionalForm["name"] = form.name
        }
        if (form.subjectId) {
            const subjectExist = await prisma.subject.findUnique({ where: { id: form.subjectId } });
            if (!subjectExist) {
                return res.status(400).json({
                    message: 'Subject level does not exist'
                })
            }
            optionalForm["subjectId"] = form.subjectId
        }
        if (req.file) {
            optionalForm["file"] = await uploadPDF(req.file);
        }
        // composite unique constraints
        if (form.name && form.subjectId) {
            const TopicExist = await prisma.topic.findFirst({ where: { name: form.name, subjectId: form.subjectId } });
            if (TopicExist) {
                return res.status(400).json({
                    message: 'Topic already exist make another'
                })
            }
        }
        if (form.name && !form.subjectId) {
            const TopicExist = await prisma.topic.findFirst({ where: { name: form.name, subjectId: Topic.subjectId } });
            if (TopicExist) {
                return res.status(400).json({
                    message: 'Topic already exist make another'
                })
            }
        }
        const updateTopic = await prisma.topic.update({
            where: { id: parseInt(req.params.id) },
            data: optionalForm
        })
        return res.json(updateTopic)
    }
]
// remove
export async function remove(req: Request, res: Response) {
    if (isNaN(parseInt(req.params.id))) return res.status(400).json({ message: 'Please provide a valid id in params' });
    const topic = await prisma.topic.findUnique({ where: { id: parseInt(req.params.id) } })
    if (!topic) {
        return res.status(400).json({
            message: `Topic #${req.params.id} not found or does not exist`
        })
    } else {
        return res.status(200).json(
            await prisma.topic.delete({ where: { id: parseInt(req.params.id) } })
        )
    }
}


