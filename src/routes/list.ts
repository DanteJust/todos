import express, { Request, Response } from 'express';
import controller from '../controllers/List';
import itemController from '../controllers/Item';
import verifyToken from '../middleware/auth';
import verifyListPayload from '../middleware/list';

const listRouter = express.Router();

listRouter.get('/', verifyToken, controller.getAllLists);
listRouter.post('/create', verifyToken, verifyListPayload, controller.createList);
listRouter.delete('/delete', verifyToken, verifyListPayload, controller.deleteList);
listRouter.get('/:username', verifyToken, controller.getUserLists);
listRouter.get('/:username/:listname', verifyToken, itemController.getItems);

export = listRouter;