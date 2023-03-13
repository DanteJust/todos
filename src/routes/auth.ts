import express from 'express';
import userController from '../controllers/User';
import errorMiddleware from '../middleware/error';
import { body } from 'express-validator';

const authRouter = express.Router();

authRouter
    .post(
        "/registration",
        body('username').isString().notEmpty(),
        body('password').isString().notEmpty(),
        errorMiddleware.printPossibleErrors,
        userController.registerUser
    )
    .all("/registration", errorMiddleware.methodNotAllowed);
authRouter
    .post("/login",
    body('username').isString().notEmpty(),
    body('password').isString().notEmpty(),
    errorMiddleware.printPossibleErrors,
    userController.loginUser
    )
    .all("/login", errorMiddleware.methodNotAllowed);

export = authRouter;