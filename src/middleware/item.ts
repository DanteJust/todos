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

const checkPayloadTypesAndPresence = (req: Request, res: Response, next: NextFunction) => {
    const { title, text, deadline, status } = req.body;

    if (!(title && text && deadline)){
        return res.status(400).json({ message: 'All fields are required!' });
    }
    if (typeof title !== 'string' || text !== 'string' || deadline !== 'string'){
        return res.status(500).json({ message: 'All fields must be string!' });
    }
    if (title.trim().length === 0 || text.trim().length === 0 || deadline.trim().length === 0){
        return res.status(400).json({ message: 'Fields cant be empty!' });
    }
    if (status){
        if (typeof status !== 'string'){
            return res.status(500).json({ message: 'All fields must be string!' });
        }
    }

    return next();
}

const checkPayloadTypesAndPresenceTextUpdate = (req: Request, res: Response, next: NextFunction) => {
    const { text } = req.body;

    if (!text){
        return res.status(400).json({ message: 'Text field is required!' });
    }
    if (typeof text !== 'string'){
        return res.status(500).json({ message: 'Text field must be string!' });
    }
    if (text.trim().length === 0){
        return res.status(400).json({ message: 'Text field cant be empty!' });
    }

    return next();
}

const checkPayloadTypesAndPresenceStatusUpdate = (req: Request, res: Response, next: NextFunction) => {
    const { status } = req.body;

    if (!status){
        return res.status(400).json({ message: 'Status field is required!' });
    }
    if (typeof status !== 'string'){
        return res.status(500).json({ message: 'Status field must be string!' });
    }
    if (status.trim().length === 0){
        return res.status(400).json({ message: 'Status field cant be empty!' });
    }

    return next();
}

export default { verifyItemPath, checkPayloadTypesAndPresence, checkPayloadTypesAndPresenceTextUpdate, checkPayloadTypesAndPresenceStatusUpdate };