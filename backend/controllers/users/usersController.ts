import express, { Express, Request, Response, Router } from 'express';
import { notYetImplemented } from '../helper';
import { create, findAll, findOne, login, remove, update } from './usersService';

export const userController: Router = express.Router();
userController.get('/', findAll); // findAll
userController.get('/:id', findOne); // findOne
userController.post('/', create); // create
userController.patch('/:id', update); // update
userController.delete('/:id', remove); // delete

userController.post('/login', login); // login user
