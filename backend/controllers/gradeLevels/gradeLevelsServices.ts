import { NextFunction, Request, Response } from "express";
import { GradeLevel } from "@prisma/client";
import { body, check, param, validationResult } from "express-validator"
// import { genSalt, genSaltSync, hashSync } from "bcryptjs"
import prisma from "../../db/prisma";
import { createGradeLevelValidation, updateGradeLevelValidation } from "./gradeLevelValidation";
// import { createUserValidation, updateUserValidation } from "./userValidation";
// import passport from "passport";
// import * as jwt from "jsonwebtoken";

//create
export const create = [
    ...createGradeLevelValidation,
    async (req:Request, res:Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        // const gradeLevel = await prisma.gradeLevel.create()
        const gradeLevel = await prisma.gradeLevel.findFirst({where: {gradeNo: parseInt(req.body.gradeNo)}})
        if(gradeLevel){
            return res.status(400).json({
                message: 'grade level already exist make another'
            })
        }
        const form = req.body as {name: string, gradeNo: string}
        const newGradeLevel = await prisma.gradeLevel.create({
            data: {
                name: form.name,
                gradeNo: parseInt(form.gradeNo)
            }
        })
        return res.json(newGradeLevel)
    } 
]
    
    

//findOne
export async function findOne(req:Request, res:Response) {
    console.log(parseInt(req.params.id))
    const gradeLevel = await prisma.gradeLevel.findUnique({where: {id: parseInt(req.params.id)}})
    if(!gradeLevel){
        return res.status(400).json({
            message: 'id not found or does not exist'
        })
    }
    return res.status(200).json(gradeLevel)
}
//findAll
export async function findAll(req:Request, res:Response) {
    const gradeLevel = await prisma.gradeLevel.findMany()
    return res.status(200).json(gradeLevel)
}
// update
export const update = [
    ...updateGradeLevelValidation,
    async (req:Request, res:Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const gradeLevel = await prisma.gradeLevel.findUnique({where: {id: parseInt(req.params.id)}})
        
        if(!gradeLevel){
            return res.status(400).json({
                message: 'id not found or does not exist'
            })
        }
        const form = req.body as {name: string, gradeNo: string}
        const optionalForm:{[key: string]: any} = {}
       if (form.name){
            optionalForm["name"] = form.name
       } 
       if(form.gradeNo){
            optionalForm["gradeNo"] = parseInt(form.gradeNo)

            const gradeLevelExist = await prisma.gradeLevel.findFirst({where: {gradeNo: parseInt(req.body.gradeNo)}})
            if(gradeLevelExist){
                return res.status(400).json({
                    message: 'grade level already exist make another'
                })
            }
       }
       
        
        // bisag unsa nga string key with any value
       
        const updateGradeLevel = await prisma.gradeLevel.update({
            where:{id: parseInt(req.params.id)},
            data: optionalForm
        })
        return res.json(updateGradeLevel)
    }
]
// remove
export async function remove(req:Request, res: Response) {
    console.log(parseInt(req.params.id))
    const gradeFind = await prisma.gradeLevel.findUnique({where: {id: parseInt(req.params.id)}})
    if(!gradeFind) {
        return res.status(400).json({
            message: `Id: ${req.params.id} not found`
        })
    } else {
         return res.status(200).json(
            await prisma.gradeLevel.delete({where: {id: parseInt(req.params.id)}}) 
            )
    }
    
}


