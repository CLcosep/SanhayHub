import express, { Express, Request, Response, Router } from 'express';
import { notYetImplemented } from '../helper';
import { create, findAll, findOne, remove, update } from './subjectsService';
import passport from 'passport';
import { check, param } from 'express-validator';

export const subjectsControllers: Router = express.Router();
subjectsControllers.get('/', findAll); // findAll
subjectsControllers.get('/:id', findOne); // findOne
subjectsControllers.post('/', passport.authenticate('jwt', { session: false }), create); // create
subjectsControllers.patch('/:id', passport.authenticate('jwt', { session: false }), update); // update
subjectsControllers.delete('/:id', passport.authenticate('jwt', { session: false }), remove); // delete