import { NextFunction, Request, Response } from "express";

const verifyListPayload = (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token || req.query.token;
    const name = req.body.name || req.query.name;

    if (!(name && token)){
        return res.status(400).json({ message: 'All fields are required!' });
    }

    if (typeof name !== 'string' || typeof token !== 'string'){
        return res.status(500).json({ message: 'All fields must be strings!' });
    }

    return next();
}

export = verifyListPayload;