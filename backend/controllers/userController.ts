import { Request, Response } from "express";
const findOne = async (req:Request,res:Response) => {
    return res.json({message:"Hello from UserController"});
}

export default {findOne};