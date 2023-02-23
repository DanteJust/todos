import express, { Request, Response } from 'express';
import controller from '../controllers/List';
import itemController from '../controllers/Item';
import verifyToken from '../middleware/auth';
import verifyListPayload from '../middleware/list';
import verifyItem from '../middleware/item';

const listRouter = express.Router();

listRouter.get('/', verifyToken, controller.getAllLists);
listRouter.post('/create', verifyToken, verifyListPayload, controller.createList);
listRouter.delete('/delete', verifyToken, verifyListPayload, controller.deleteList);
listRouter.get('/:user_id', verifyToken, controller.getUserLists);
listRouter.get('/:user_id/:list_id', verifyToken, verifyItem.verifyUserAndListPath, itemController.getItems);
listRouter.post('/:user_id/:list_id', verifyToken, verifyItem.verifyUserAndListPath, verifyItem.verifyUserAccess, itemController.createItem);
listRouter.get('/:user_id/:list_id/:item_id', verifyToken, verifyItem.verifyUserAndListPath, verifyItem.verifyItemPath, itemController.getItem);
listRouter.delete('/:user_id/:list_id/:item_id', verifyToken, verifyItem.verifyUserAndListPath, verifyItem.verifyItemPath, verifyItem.verifyUserAccess, itemController.deleteItem);
listRouter.patch('/:user_id/:list_id/:item_id', verifyToken, verifyItem.verifyUserAndListPath, verifyItem.verifyItemPath, verifyItem.verifyUserAccess, itemController.updateItem);
listRouter.patch('/:user_id/:list_id/:item_id/status', verifyToken, verifyItem.verifyUserAndListPath, verifyItem.verifyItemPath, verifyItem.verifyUserAccess, itemController.updateItemStatus);

export = listRouter;