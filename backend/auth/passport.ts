// https://github.com/jwalton/passport-api-docs

require("dotenv").config();
import { compareSync } from "bcryptjs"
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

import prisma from "../db/prisma";
import { User } from "@prisma/client";

// Note: You can use multiple passport strategies it is separated by 
// passport.authenticate("local") or passport.authenticate("jwt") etc.

// Passport local is a passport strategy for Authentication INSIDE your back-end instead of using 3rd party like Auth0, Supabase Auth, or FireBase Auth etc.
passport.use(new LocalStrategy(
    async function (username: string, password: string, done: Function) {
        // Checks if username and password is exactly correct
        // Might change this later when applying password encryption
        const user = await prisma.user.findUnique({ where: { username: username } });
        // The result query is empty then that means that either username and password is wrong
        if (!user || !compareSync(password, user.password)) {
            // Pattern if the authentication form is wrong, the third parameter indicates what is the message
            return done(null, false, { message: "Incorrect username or password" });
        }
        const { password: userPassword, ...userObj } = user;
        // Pattern if the authentication is correct, the third parameter indicates what is the message
        return done(null, userObj, { message: "Logged In Successfully" });
    }
));

// 
var opts: { [key: string]: any } = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;
passport.use(new JwtStrategy(opts, function (jwt_payload: User, done: Function) {
    const user = prisma.user.findUnique({
        where: { id: jwt_payload.id, username: jwt_payload.username },
        select: { username: true, id: true } // Excluding password
    });
    if (!user) {
        // if the token doesn't contain the user id and username
        return done(null, false);
    }
    // upon success the req.user is available to any next middleware or route handler
    return done(null, user);
}));