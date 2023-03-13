import express from 'express';
import authMiddleware from '../middleware/auth';
import pathMiddlware from '../middleware/path';
import userController from '../controllers/User';
import errorMiddleware from '../middleware/error';

const userRouter = express.Router();

userRouter
    .get("/", authMiddleware.verifyToken, 
    userController.getAllUsers
    )
    .all("/", errorMiddleware.methodNotAllowed);
userRouter
    .get(
        "/:user_id",
        authMiddleware.verifyToken,
        pathMiddlware.verifyUserPath,
        userController.getUser
    )
    .all("/:user_id", errorMiddleware.methodNotAllowed);

export = userRouter;