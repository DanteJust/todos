import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import List from '../models/List';
import Item from '../models/Item';

const verifyUserPath = (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req.params;

    User.findById(user_id).then(user => {
        if (user === null){
            return res.status(404).json({ message: 'User not found!' });
        }
        return next();
    })
    .catch(() => res.status(500).json({ message: 'Invalid user_id or Bad Request!' }));
}

const verifyListPath = (req: Request, res: Response, next: NextFunction) => {
    const { user_id, list_id } = req.params;

    List.findOne({ _id: list_id, owner_id: user_id })
    .then(list => {
        if (list === null){
            return res.status(404).json({ message: 'List not found!' });
        }
        return next();
    })
    .catch(() => res.status(500).json({ message: 'Invalid list_id or Bad request!' }));
}

const verifyItemPath = (req: Request, res: Response, next: NextFunction) => {
    const { item_id } = req.params;

    Item.findById(item_id)
        .then((item) => {
            if (item === null) {
                return res.status(404).json({ message: "Item not found!" });
            }
            return next();
        })
        .catch(() =>
            res.status(500).json({ message: "Invalid item_id or Bad Request!" })
        );
};

export default { verifyUserPath, verifyListPath, verifyItemPath };