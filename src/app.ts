import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth';
import listRouter from './routes/list';
import { config } from './config/config';
import verifyToken from './middleware/auth';

const app = express();

// Connect to mongoDB
mongoose.set('strictQuery', false);
mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
.then(() => { 
    console.log('connected to DB');
    startApi();
})
.catch(error => { 
    console.log(error) 
});

// Initialize server only if connection to DB is successful
const startApi = () => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use('/api/auth', authRouter);
    app.use('/api/list', listRouter);
    app.listen(config.server.port, () => {
        console.log(`Server listening on port ${config.server.port}.`);
    });
}