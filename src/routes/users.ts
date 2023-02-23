import express, { Request, Response } from 'express';
import verifyToken from '../middleware/auth';
import controller from '../controllers/User';

const userRouter = express.Router();

userRouter.get('/', verifyToken, controller.getAllUsers);
userRouter.get('/:user_id', verifyToken, controller.getUser)

export = userRouter;