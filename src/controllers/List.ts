import { Request, Response } from 'express';
import mongoose from 'mongoose';
import List from '../models/List';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import Item from '../models/Item';

interface JwtPayload {
     _id: string
};

const getAllLists = async (req: Request, res: Response) => {
    return List.find({}).then(lists => res.status(200).json({ lists })).catch(error => res.status(500).json({ error }));
}

const getUserLists = async (req: Request, res: Response) => {
    const { user_id } = req.params;

    return User.findById(user_id)
    .then(async (user) => {
        return List.find({ owner_id: user._id })
            .then(lists => res.status(200).json({ lists }))
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(404).json({ error }));
}

const createList = async (req: Request, res: Response) => {
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

const deleteList = async (req: Request, res: Response) => {
    const { list_id } = req.params;
    
    return List.deleteOne({ _id: list_id }).then(() => {
        Item.deleteMany({ list_id: list_id })
        .then(() => res.status(200).json({ message: 'List successfully deleted!' }))
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}

export default { createList, deleteList, getUserLists, getAllLists };