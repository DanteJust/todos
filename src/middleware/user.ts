import { NextFunction, Request, Response } from "express";

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

export = verifyUserPayload;