import { Request, Response } from "express";
import prisma from "../db/prisma";


const findOne = async (req:Request,res:Response) => {
    const allGrades = await prisma.gradeLevel.findMany();
    return res.json(allGrades);
}



export default {findOne};