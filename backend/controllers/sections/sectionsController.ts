import express, { Express, Request, Response, Router } from 'express';
import { notYetImplemented } from '../helper';
import { create, findAll, findOne, remove, update } from './sectionsService';

export const sectionsControllers: Router = express.Router();
sectionsControllers.get('/', findAll); // findAll
sectionsControllers.get('/:id', findOne); // findOne
sectionsControllers.post('/', create); // create
sectionsControllers.patch('/:id', update); // update
sectionsControllers.delete('/:id', remove); // delete