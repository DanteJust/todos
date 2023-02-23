import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Item from "../models/Item";
import jwt from "jsonwebtoken";

interface JwtPayload {
    _id: string
};

const getItems = async (req: Request, res: Response, next: NextFunction) => {
    const { list_id } = req.params;

    return Item.find({ list_id: list_id}).then((items) => res.status(200).json({ items })).catch(error => res.status(500).json({ error }));
}

const getItem = async (req: Request, res: Response, next: NextFunction) => {
    const { list_id, item_id } = req.params;

    return Item.findOne({ _id: item_id, list_id: list_id }).then(item => res.status(200).json({ item })).catch(error => res.status(500).json({ error }));
}

const createItem = async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, list_id } = req.params;
    const { token, title, text, deadline, status } = req.body;
    const { _id } = jwt.decode(token) as JwtPayload;

    if (user_id !== _id){
        return res.status(403).json({ message: 'You dont have access to create item in this list!' });
    }

    const checkIfItemAlreadyExists = await Item.findOne({ title: title, list_id: list_id });
    if (checkIfItemAlreadyExists !== null){
        return res.status(409).json({ message: 'Item already exists!' });
    }

    const item = new Item({
        _id: new mongoose.Types.ObjectId(),
        list_id,
        title,
        text,
        deadline,
        status: status ? status : 'none'
    });
    return item.save().then(item => res.status(201).json({ item })).catch(error => res.status(500).json({ error }));
}

const deleteItem = async (req: Request, res: Response, next: NextFunction) => {

}

export default { getItems, getItem, createItem };