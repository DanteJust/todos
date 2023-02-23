import { NextFunction, Request, Response } from "express";
import Item from "../models/Item";
import List from "../models/List";
import User from '../models/User';

const verifyUserAndListPath = (req: Request, res: Response, next: NextFunction) => {
    const { user_id, list_id } = req.params;

    User.findById(user_id).then(user => {
        if (user === null){
            return res.status(404).json({ message: 'User not found!' });
        }
        List.findOne({ _id: list_id, owner_id: user._id })
        .then(list => {
            if (list === null){
                return res.status(404).json({ message: 'List not found!' });
            }
            return next();
        })
        .catch(error => res.status(500).json({ message: 'Invalid list_id/Bad request!' }));
    })
    .catch(error => res.status(500).json({ message: 'Invalid user_id/Bad request!' }));
}

const verifyItemPath = (req: Request, res: Response, next: NextFunction) => {
    const { item_id } = req.params;

    Item.findById(item_id)
    .then(item => {
        if (item === null){
            return res.status(404).json({ message: 'Item not found!' });
        }
        return next();
    })
    .catch(error => res.status(500).json({ message: 'Invalid item_id or Bad Request!' }))
}

export default { verifyUserAndListPath, verifyItemPath };