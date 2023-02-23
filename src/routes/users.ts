import express, { Request, Response } from 'express';
import authMiddleware from '../middleware/auth';
import userMiddleware from '../middleware/user';
import controller from '../controllers/User';

const userRouter = express.Router();

userRouter.get('/', authMiddleware.verifyToken, controller.getAllUsers);
userRouter.get('/:user_id', authMiddleware.verifyToken, userMiddleware.verifyUserPath, controller.getUser);

export = userRouter;