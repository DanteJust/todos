import express from 'express';
import authMiddleware from '../middleware/auth';
import userMiddleware from '../middleware/user';
import controller from '../controllers/User';
import routeMiddleware from '../middleware/route';

const userRouter = express.Router();

userRouter.get('/', authMiddleware.verifyToken, controller.getAllUsers).all('/', routeMiddleware.methodNotAllowed);
userRouter.get('/:user_id', authMiddleware.verifyToken, userMiddleware.verifyUserPath, controller.getUser).all('/:user_id', routeMiddleware.methodNotAllowed);

export = userRouter;