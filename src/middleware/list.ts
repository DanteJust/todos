import { NextFunction, Request, Response } from "express";
import List from "../models/List";

const verifyListPayload = (req: Request, res: Response, next: NextFunction) => {
    const name = req.body.name || req.query.name;

    if (!name){
        return res.status(400).json({ message: 'All fields are required!' });
    }
    if (typeof name !== 'string'){
        return res.status(500).json({ message: 'All fields must be strings!' });
    }

    if (name.trim().length === 0){
        return res.status(400).json({ message: 'Fields cant be empty!' });
    }

    return next();
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
    .catch(error => res.status(500).json({ message: 'Invalid list_id or Bad request!' }));
}

export default { verifyListPayload, verifyListPath };