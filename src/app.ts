import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth';
import listRouter from './routes/list';
import { config } from './config/config';
import userRouter from './routes/user';

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
.then(() => { 
    console.log('connected to DB');
    startApi();
})
.catch(error => { 
    console.log(error) 
});

const startApi = () => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/list', listRouter);
    app.use((req: Request, res: Response) => {
        res.status(404).json({ message: 'Incorrect route!' });
    });
    app.listen(config.server.port, () => {
        console.log(`Server listening on port ${config.server.port}.`);
    });
}