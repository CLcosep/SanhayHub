import express, { Express, Request, Response, Router } from 'express';
import { notYetImplemented } from '../helper';
import { create, findAll, findOne, remove, update } from './sectionsService';
import passport from 'passport';

export const sectionsControllers: Router = express.Router();
sectionsControllers.get('/', findAll); // findAll
sectionsControllers.get('/:id', findOne); // findOne
sectionsControllers.post('/', passport.authenticate('jwt', { session: false }), create); // create
sectionsControllers.patch('/:id', passport.authenticate('jwt', { session: false }), update); // update
sectionsControllers.delete('/:id', passport.authenticate('jwt', { session: false }), remove); // delete