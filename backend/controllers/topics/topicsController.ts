import express, { Express, Request, Response, Router } from 'express';
import { notYetImplemented } from '../helper';
import { create, findAll, findOne, remove, update } from './topicsService';
import passport from 'passport';
import { check, param } from 'express-validator';
import multer from 'multer';
const upload = multer();

export const topicsControllers: Router = express.Router();
topicsControllers.get('/', findAll); // findAll
topicsControllers.get('/:id', findOne); // findOne
topicsControllers.post('/', passport.authenticate('jwt', { session: false }), upload.single('file'), create); // create
topicsControllers.patch('/:id', passport.authenticate('jwt', { session: false }), upload.single('file'), update); // update
topicsControllers.delete('/:id', passport.authenticate('jwt', { session: false }), remove); // delete