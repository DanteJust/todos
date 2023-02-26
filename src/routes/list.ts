import express from 'express';
import listController from '../controllers/List';
import itemController from '../controllers/Item';
import authMiddleware from '../middleware/auth';
import listMiddleware from '../middleware/list';
import userMiddleware from '../middleware/user';
import itemMiddleware from '../middleware/item';
import routeMiddleware from '../middleware/route';

const listRouter = express.Router();

listRouter
    .get("/", authMiddleware.verifyToken, listController.getAllLists)
    .all("/", routeMiddleware.methodNotAllowed);
listRouter
    .post(
        "/new",
        authMiddleware.verifyToken,
        listMiddleware.verifyListPayload,
        listController.createList
    )
    .all("/new", routeMiddleware.methodNotAllowed);
listRouter
    .get(
        "/:user_id",
        authMiddleware.verifyToken,
        userMiddleware.verifyUserPath,
        listController.getUserLists
    )
    .all("/:user_id", routeMiddleware.methodNotAllowed);
listRouter.get(
    "/:user_id/:list_id",
    authMiddleware.verifyToken,
    userMiddleware.verifyUserPath,
    listMiddleware.verifyListPath,
    itemController.getItems
);
listRouter.delete(
    "/:user_id/:list_id",
    authMiddleware.verifyToken,
    userMiddleware.verifyUserPath,
    listMiddleware.verifyListPath,
    authMiddleware.verifyUserAccess,
    listController.deleteList
);
listRouter
    .post(
        "/:user_id/:list_id",
        authMiddleware.verifyToken,
        userMiddleware.verifyUserPath,
        listMiddleware.verifyListPath,
        authMiddleware.verifyUserAccess,
        itemMiddleware.checkPayloadTypesAndPresence,
        itemController.createItem
    )
    .all("/:user_id/:list_id", routeMiddleware.methodNotAllowed);
listRouter.get(
    "/:user_id/:list_id/:item_id",
    authMiddleware.verifyToken,
    userMiddleware.verifyUserPath,
    listMiddleware.verifyListPath,
    itemMiddleware.verifyItemPath,
    itemController.getItem
);
listRouter.delete(
    "/:user_id/:list_id/:item_id",
    authMiddleware.verifyToken,
    userMiddleware.verifyUserPath,
    listMiddleware.verifyListPath,
    itemMiddleware.verifyItemPath,
    authMiddleware.verifyUserAccess,
    itemController.deleteItem
);
listRouter
    .patch(
        "/:user_id/:list_id/:item_id",
        authMiddleware.verifyToken,
        userMiddleware.verifyUserPath,
        listMiddleware.verifyListPath,
        itemMiddleware.verifyItemPath,
        authMiddleware.verifyUserAccess,
        itemMiddleware.checkPayloadTypesAndPresenceTextUpdate,
        itemController.updateItem
    )
    .all("/:user_id/:list_id/:item_id", routeMiddleware.methodNotAllowed);
listRouter
    .patch(
        "/:user_id/:list_id/:item_id/status",
        authMiddleware.verifyToken,
        userMiddleware.verifyUserPath,
        listMiddleware.verifyListPath,
        itemMiddleware.verifyItemPath,
        authMiddleware.verifyUserAccess,
        itemMiddleware.checkPayloadTypesAndPresenceStatusUpdate,
        itemController.updateItemStatus
    )
    .all("/:user_id/:list_id/:item_id/status", routeMiddleware.methodNotAllowed);

export = listRouter;