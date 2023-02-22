import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import List from "../models/List";
import jwt from "jsonwebtoken";

interface JwtPayload {
     _id: string
};

const createList = async (req: Request, res: Response, next: NextFunction) => {
    const { name, token } = req.body;
    const { _id } = jwt.decode(token) as JwtPayload;

    const checkIfListAlreadyExists = await List.findOne({ name: name, owner_id: _id });
    if (checkIfListAlreadyExists != null){
            return res.status(409).json({ message: 'List with that name already exists!' });
     }

    const list = new List({
        _id: new mongoose.Types.ObjectId(),
        name,
        owner_id: _id,
    });

    return list.save().then(list => res.status(201).json({ list })).catch(error => res.status(500).json({ error }));
}

const deleteList = async (req: Request, res: Response, next: NextFunction) => {
    const { name, token } = req.body;
    const { _id } = jwt.decode(token) as JwtPayload;

    const checkIfListExists = await List.findOne({ name: name, owner_id: _id });
    if (checkIfListExists == null){
        return res.status(404).json({ message: 'List with that name doesnt exist!' });
    }

    return List.deleteOne({ name: name, owner_id: _id }).then(() => res.status(204).json({ message: 'List successfully deleted!' })).catch(error => res.status(500).json({ error }));
}

export default { createList, deleteList };