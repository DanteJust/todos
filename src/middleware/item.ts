import { NextFunction, Request, Response } from "express";
import Item from "../models/Item";

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

export default { verifyItemPath };