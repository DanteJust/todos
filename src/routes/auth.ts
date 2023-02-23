import express, { Request, Response } from 'express';
import controller from '../controllers/User';
import userMiddleware from '../middleware/user';

const authRouter = express.Router();

authRouter.post('/registration', userMiddleware.verifyUserPayload, controller.registerUser);
authRouter.post('/login', userMiddleware.verifyUserPayload, controller.loginUser);

export = authRouter;