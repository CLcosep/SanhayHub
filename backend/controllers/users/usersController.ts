import express, { Express, Request, Response, Router } from 'express';
import { notYetImplemented } from '../helper';
import { create, findAll, findOne, login, remove, update, validateUser } from './usersService';
import passport from 'passport';

export const usersController: Router = express.Router();
usersController.get('/', findAll); // findAll
usersController.get('/validate', passport.authenticate('jwt', {
    session: false
}),validateUser)//
usersController.get('/:id', findOne); // findOne
usersController.post('/', create); // create
usersController.patch('/:id', update); // update
usersController.delete('/:id', remove); // delete

usersController.post('/login', login); // login users
