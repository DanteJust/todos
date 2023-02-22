import express, { Request, Response } from 'express';
import controller from '../controllers/List';
import verifyToken from '../middleware/auth';
import verifyListPayload from '../middleware/list';

const listRouter = express.Router();

listRouter.post('/create', verifyToken, verifyListPayload, controller.createList);
listRouter.delete('/delete', verifyToken, verifyListPayload, controller.deleteList);
listRouter.get('/mylists', verifyToken, controller.getMyLists);
listRouter.get('/:username', verifyToken, controller.getUserLists);

export = listRouter;