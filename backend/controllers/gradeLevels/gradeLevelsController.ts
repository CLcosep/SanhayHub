import express, { Express, Request, Response, Router } from 'express';
import { notYetImplemented } from '../helper';
import { create, findAll, findOne, remove, update } from './gradeLevelsServices';
import passport from 'passport';
// import { create, findAll, findOne, login, remove, update } from './gradeLevels';

export const gradeLevelsController: Router = express.Router();
gradeLevelsController.get('/', findAll); // findAll
gradeLevelsController.get('/:id', findOne); // findOne
gradeLevelsController.post('/', passport.authenticate('jwt', {session: false}) ,create); // create
gradeLevelsController.patch('/:id', passport.authenticate('jwt', {session: false}) ,update); // update
gradeLevelsController.delete('/:id', passport.authenticate('jwt', {session: false}) ,remove); // delete


