import express, { Request, Response } from 'express';
import controller from '../controllers/List';
import itemController from '../controllers/Item';
import authMiddleware from '../middleware/auth';
import listMiddleware from '../middleware/list';
import userMiddleware from '../middleware/user';
import itemMiddleware from '../middleware/item';

const listRouter = express.Router();

listRouter.get('/', authMiddleware.verifyToken, controller.getAllLists);
listRouter.post('/create', authMiddleware.verifyToken, listMiddleware.verifyListPayload, controller.createList);
listRouter.delete('/delete', authMiddleware.verifyToken, listMiddleware.verifyListPayload, controller.deleteList);
listRouter.get('/:user_id', authMiddleware.verifyToken, userMiddleware.verifyUserPath, controller.getUserLists);
listRouter.get('/:user_id/:list_id', authMiddleware.verifyToken, userMiddleware.verifyUserPath, listMiddleware.verifyListPath, itemController.getItems);
listRouter.post('/:user_id/:list_id', authMiddleware.verifyToken, userMiddleware.verifyUserPath, listMiddleware.verifyListPath, authMiddleware.verifyUserAccess, itemController.createItem);
listRouter.get('/:user_id/:list_id/:item_id', authMiddleware.verifyToken, userMiddleware.verifyUserPath, listMiddleware.verifyListPath, itemMiddleware.verifyItemPath, itemController.getItem);
listRouter.delete('/:user_id/:list_id/:item_id', authMiddleware.verifyToken, userMiddleware.verifyUserPath, listMiddleware.verifyListPath, itemMiddleware.verifyItemPath, authMiddleware.verifyUserAccess, itemController.deleteItem);
listRouter.patch('/:user_id/:list_id/:item_id', authMiddleware.verifyToken, userMiddleware.verifyUserPath, listMiddleware.verifyListPath, itemMiddleware.verifyItemPath, authMiddleware.verifyUserAccess, itemController.updateItem);
listRouter.patch('/:user_id/:list_id/:item_id/status', authMiddleware.verifyToken, userMiddleware.verifyUserPath, listMiddleware.verifyListPath, itemMiddleware.verifyItemPath, authMiddleware.verifyUserAccess, itemController.updateItemStatus);

export = listRouter;