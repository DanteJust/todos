import express from 'express';
import controller from '../controllers/User';
import userMiddleware from '../middleware/user';
import methodNotAllowed from '../middleware/route';

const authRouter = express.Router();

authRouter.post('/registration', userMiddleware.verifyUserPayload, controller.registerUser).all('/registration', methodNotAllowed);
authRouter.post('/login', userMiddleware.verifyUserPayload, controller.loginUser).all('/login', methodNotAllowed);

export = authRouter;