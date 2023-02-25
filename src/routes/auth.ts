import express from 'express';
import userController from '../controllers/User';
import userMiddleware from '../middleware/user';
import routeMiddleware from '../middleware/route';

const authRouter = express.Router();

authRouter
    .post(
        "/registration",
        userMiddleware.verifyUserPayload,
        userController.registerUser
    )
    .all("/registration", routeMiddleware.methodNotAllowed);
authRouter
    .post("/login", userMiddleware.verifyUserPayload, userController.loginUser)
    .all("/login", routeMiddleware.methodNotAllowed);

export = authRouter;