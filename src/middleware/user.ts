import { NextFunction, Request, Response } from "express";
import User from "../models/User";

const verifyUserPayload = (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username || req.query.username;
    const password = req.body.password || req.query.password;

    if (!(username && password)){
        return res.status(400).json({ message: 'All fields are required!' });
    }

    if (typeof username !== 'string' || typeof password !== 'string'){
        return res.status(500).json({ message: 'All fields must be strings!' });
    }

    return next();
}

const verifyUserPath = (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req.params;

    User.findById(user_id).then(user => {
        if (user === null){
            return res.status(404).json({ message: 'User not found!' });
        }
        return next();
    })
    .catch(error => res.status(500).json({ message: 'Invalid user_id or Bad Request!' }));
}

export default { verifyUserPayload, verifyUserPath };