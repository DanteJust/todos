import express, { Request, Response } from 'express';
import controller from '../controllers/User';
import verifyUserPayload from '../middleware/user';

const authRouter = express.Router();

authRouter.post('/registration', verifyUserPayload, controller.registerUser);
authRouter.post('/login', verifyUserPayload, controller.loginUser);

export = authRouter;