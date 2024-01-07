import { NextFunction, Request, Response } from "express";
import { User } from "@prisma/client";
import { body, check, param, validationResult } from "express-validator"
import { genSalt, genSaltSync, hashSync } from "bcryptjs"
import prisma from "../../db/prisma";
import { createUserValidation, updateUserValidation } from "./userValidation";
import passport from "passport";
import * as jwt from "jsonwebtoken";

export const create = [
    // Form Valdiation
    ...createUserValidation,
    async (req: Request, res: Response) => {
        const errors = validationResult(req); //checks if the request objects contains errors
        // If there are errors in the form
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const form = req.body as User;
        // If User already exist in the database then cancel the create request
        const userExist = await prisma.user.findUnique({ where: { username: form.username } });
        if (userExist) {
            return res.status(409).json({ message: "User already exists" });
        }
        // Creates new user
        form.password = hashSync(form.password, genSaltSync());
        const newUser = await prisma.user.create({ data: { username: form.username, password: form.password } });
        return res.status(200).json(newUser);
    }
]

export async function findOne(req: Request, res: Response) {
    const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
}
export async function findAll(req: Request, res: Response) {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
}

export const update = [
    param("id").isNumeric().withMessage({ message: "Please provide an numeric id in params" }),
    ...updateUserValidation,
    async (req: Request, res: Response) => {
        const errors = validationResult(req); //checks if the request objects contains errors
        // If there are errors in the form
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) } });
        const form = req.body as User;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (form.username) {
            const userExist = await prisma.user.findUnique({ where: { username: form.username } });
            if (userExist) {
                return res.status(409).json({ message: "User already exists" });
            }
        }
        if (form.password) {
            form.password = hashSync(form.password, genSaltSync());
        }
        const updatedUser = await prisma.user.update({ where: { id: parseInt(req.params.id) }, data: form });
        return res.status(200).json(updatedUser);
    }
]

export async function remove(req: Request, res: Response) {
    const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    await prisma.user.delete({ where: { id: parseInt(req.params.id) } });
    return res.status(200).json({ message: "User deleted successfully" });
}

export async function login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', { session: false }, (err: Error, user: User, info: any) => {
        // session is set to false since API is used for authentication
        // remeber passport.ts return value patterns?  this is how it used in passport.authenticate

        // if (!user) {
        //     // Pattern if the authentication form is wrong, the third parameter indicates what is the message
        //     { return done(null, false, { message: "Incorrect username or password" }); }
        // }
        // // Patter if the authentication is correct, the third parameter indicates what is the message
        // return done(null, user, { message: "Logged In Successfuly" });

        if (err || !user) {
            return res.status(400).json({
                message: "Invalid Password",
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            jwt.sign({ user }, process.env.SECRET_KEY as jwt.Secret, (err: null | Error, token: undefined | string) => {
                if (err) {
                    return res.status(400).json({
                        message: "Something is not right",
                    });
                }
                return res.status(200).json({ user, token });
            });
        });
    })(req, res, next);
}