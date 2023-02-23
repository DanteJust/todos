import express from "express";
import controller from "../controllers/List";
import itemController from "../controllers/Item";
import authMiddleware from "../middleware/auth";
import listMiddleware from "../middleware/list";
import userMiddleware from "../middleware/user";
import itemMiddleware from "../middleware/item";
import methodNotAllowed from "../middleware/route";

const listRouter = express.Router();

listRouter
    .get("/", authMiddleware.verifyToken, controller.getAllLists)
    .all("/", methodNotAllowed);
listRouter
    .post(
        "/create",
        authMiddleware.verifyToken,
        listMiddleware.verifyListPayload,
        controller.createList
    )
    .all("/create", methodNotAllowed);
listRouter
    .delete(
        "/delete",
        authMiddleware.verifyToken,
        listMiddleware.verifyListPayload,
        controller.deleteList
    )
    .all("/delete", methodNotAllowed);
listRouter
    .get(
        "/:user_id",
        authMiddleware.verifyToken,
        userMiddleware.verifyUserPath,
        controller.getUserLists
    )
    .all("/:user_id", methodNotAllowed);
listRouter.get(
    "/:user_id/:list_id",
    authMiddleware.verifyToken,
    userMiddleware.verifyUserPath,
    listMiddleware.verifyListPath,
    itemController.getItems
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
    .all("/:user_id/:list_id", methodNotAllowed);
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
    .all("/:user_id/:list_id/:item_id", methodNotAllowed);
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
    .all("/:user_id/:list_id/:item_id/status", methodNotAllowed);

export = listRouter;