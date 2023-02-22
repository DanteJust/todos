import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Item from "../models/Item";
import List from "../models/List";
import User from '../models/User';

const getItems = async (req: Request, res: Response, next: NextFunction) => {
    const { username, listname } = req.params;

    const searchedUser = await User.findOne({ username: username });
    if (searchedUser === null){
        return res.status(404).json({ message: 'User not found!' });
    }

    const searchedList = await List.findOne({ owner_id: searchedUser._id, name: listname });

    if (searchedList === null){
        return res.status(404).json({ message: 'List not found!' });
    }

    return Item.find({ list_id: searchedList._id }).then((items) => res.status(200).json({ items })).catch(error => res.status(500).json({ error }));
}

export default { getItems };