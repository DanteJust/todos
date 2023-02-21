import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const config = process.env;

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    if (typeof username !== 'string' || typeof password !== 'string'){
        return res.status(500).json({ message: 'All fields must be strings!' });
    }

    if (!(username && password)){
        return res.status(400).json({ message: 'All fields are required!' });
    }

    const checkIfUserAlreadyExists = await User.findOne({ username: username });
    if (checkIfUserAlreadyExists != null){
        return res.status(409).json({ message: 'User with that username already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username,
        password: hashedPassword
    });

    return user.save().then(user => res.status(201).json({ user })).catch(error => res.status(500).json({ error }));
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    if (typeof username !== 'string' || typeof password !== 'string'){
        return res.status(500).json({ message: 'All fields must be strings!' });
    }

    if (!(username && password)){
        return res.status(400).json({ message: 'All fields are required!' });
    }

    return User.findOne({ username: username })
    .then(async (user) => {
        if (user === null){
            return res.status(404).json({ message: 'User not found!' });
        }
        if (await bcrypt.compare(password, user.password)){
            const token = jwt.sign(
                { user_id: user._id },
                config.TOKEN_KEY,
                {
                    expiresIn: '2h'
                }
            );
            res.status(200).json({ message: 'Successfully logged in!', token: token });
        } else {
            res.status(500).json({ message: 'Incorrect password!' });
        }
    })
    .catch((error) => res.status(500).json({ error }));
};

export default { registerUser, loginUser };