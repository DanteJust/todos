import express from 'express';
import listController from '../controllers/List';
import itemController from '../controllers/Item';
import authMiddleware from '../middleware/auth';
import pathMiddleware from '../middleware/path';
import errorMiddleware from '../middleware/error';
import { body } from 'express-validator';

const listRouter = express.Router();

listRouter
    .get("/", authMiddleware.verifyToken, listController.getAllLists)
    .all("/", errorMiddleware.methodNotAllowed);
listRouter
    .post(
        "/new",
        authMiddleware.verifyToken,
        body('name').isString().notEmpty(),
        errorMiddleware.printPossibleErrors,
        listController.createList
    )
    .all("/new", errorMiddleware.methodNotAllowed);
listRouter
    .get(
        "/:user_id",
        authMiddleware.verifyToken,
        pathMiddleware.verifyUserPath,
        listController.getUserLists
    )
    .all("/:user_id", errorMiddleware.methodNotAllowed);
listRouter.get(
    "/:user_id/:list_id",
    authMiddleware.verifyToken,
    pathMiddleware.verifyUserPath,
    pathMiddleware.verifyListPath,
    itemController.getItems
);
listRouter.delete(
    "/:user_id/:list_id",
    authMiddleware.verifyToken,
    pathMiddleware.verifyUserPath,
    pathMiddleware.verifyListPath,
    authMiddleware.verifyUserAccess,
    listController.deleteList
);
listRouter
    .post(
        "/:user_id/:list_id",
        authMiddleware.verifyToken,
        pathMiddleware.verifyUserPath,
        pathMiddleware.verifyListPath,
        authMiddleware.verifyUserAccess,
        body('title').isString().notEmpty(),
        body('text').isString().notEmpty(),
        body('deadline').isString().notEmpty(),
        body('status').optional().isString(),
        errorMiddleware.printPossibleErrors,
        itemController.createItem
    )
    .all("/:user_id/:list_id", errorMiddleware.methodNotAllowed);
listRouter.get(
    "/:user_id/:list_id/:item_id",
    authMiddleware.verifyToken,
    pathMiddleware.verifyUserPath,
    pathMiddleware.verifyListPath,
    pathMiddleware.verifyItemPath,
    itemController.getItem
);
listRouter.delete(
    "/:user_id/:list_id/:item_id",
    authMiddleware.verifyToken,
    pathMiddleware.verifyUserPath,
    pathMiddleware.verifyListPath,
    pathMiddleware.verifyItemPath,
    authMiddleware.verifyUserAccess,
    itemController.deleteItem
);
listRouter
    .patch(
        "/:user_id/:list_id/:item_id",
        authMiddleware.verifyToken,
        pathMiddleware.verifyUserPath,
        pathMiddleware.verifyListPath,
        pathMiddleware.verifyItemPath,
        authMiddleware.verifyUserAccess,
        body('text').isString().notEmpty(),
        errorMiddleware.printPossibleErrors,
        itemController.updateItem
    )
    .all("/:user_id/:list_id/:item_id", errorMiddleware.methodNotAllowed);
listRouter
    .patch(
        "/:user_id/:list_id/:item_id/status",
        authMiddleware.verifyToken,
        pathMiddleware.verifyUserPath,
        pathMiddleware.verifyListPath,
        pathMiddleware.verifyItemPath,
        authMiddleware.verifyUserAccess,
        body('status').isString().notEmpty(),
        errorMiddleware.printPossibleErrors,
        itemController.updateItemStatus
    )
    .all("/:user_id/:list_id/:item_id/status", errorMiddleware.methodNotAllowed);

export = listRouter;