import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Item from "../models/Item";

const getItems = async (req: Request, res: Response, next: NextFunction) => {
    const { list_id } = req.params;

    return Item.find({ list_id: list_id}).then((items) => res.status(200).json({ items })).catch(error => res.status(500).json({ error }));
}

const getItem = async (req: Request, res: Response, next: NextFunction) => {
    const { list_id, item_id } = req.params;

    return Item.findOne({ _id: item_id, list_id: list_id }).then(item => res.status(200).json({ item })).catch(error => res.status(500).json({ error }));
}

const createItem = async (req: Request, res: Response, next: NextFunction) => {
    const { list_id } = req.params;
    const { title, text, deadline, status } = req.body;

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
    const { list_id, item_id } = req.params;

    return Item.deleteOne({ _id: item_id, list_id: list_id }).then(() => res.status(204).json({ message: 'Item deleted!' })).catch(error => res.status(500).json({ error }));
}

const updateItem = async (req: Request, res: Response, next: NextFunction) => {
    const { list_id, item_id } = req.params;
    const { text } = req.body;

    if (text === null){
        return res.status(500).json({ message: 'Text field is required!' });
    }

    return Item.updateOne({ _id: item_id, list_id: list_id }, { $set: { text: text } }).then(() => res.status(200).json({ message: 'Item has been successfully updated!' })).catch(error => res.status(500).json({ error }));
}

const updateItemStatus = async (req: Request, res: Response, next: NextFunction) => {
    const { list_id, item_id } = req.params;
    const { status } = req.body;

    if (status === null){
        return res.status(500).json({ message: 'Status field is required!' });
    }

    return Item.updateOne({ _id: item_id, list_id: list_id }, { $set: { status: status } }).then(() => res.status(200).json({ message: 'Item status has been successfully updated!' })).catch(error => res.status(500).json({ error }));
}

export default { getItems, getItem, createItem, deleteItem, updateItem, updateItemStatus };