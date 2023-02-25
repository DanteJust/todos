import express from 'express';
import authMiddleware from '../middleware/auth';
import userMiddleware from '../middleware/user';
import userController from '../controllers/User';
import routeMiddleware from '../middleware/route';

const userRouter = express.Router();

userRouter
    .get("/", authMiddleware.verifyToken, userController.getAllUsers)
    .all("/", routeMiddleware.methodNotAllowed);
userRouter
    .get(
        "/:user_id",
        authMiddleware.verifyToken,
        userMiddleware.verifyUserPath,
        userController.getUser
    )
    .all("/:user_id", routeMiddleware.methodNotAllowed);

export = userRouter;