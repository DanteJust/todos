import express, { Request, Response } from 'express';
import controller from '../controllers/User';

const authRouter = express.Router();

authRouter.post('/registration', controller.registerUser);
authRouter.post('/login', controller.loginUser);

export = authRouter;