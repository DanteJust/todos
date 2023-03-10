import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth';
import listRouter from './routes/list';
import { config } from './config/config';
import userRouter from './routes/user';
import errorMiddleware from './middleware/error';
import cors from 'cors';

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
.then(() => { 
    console.log('Connected to DB');
    startApi();
})
.catch(error => { 
    console.log(error) 
});

const startApi = () => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors({
        origin: 'http://localhost:3000'
    }));
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/list', listRouter);
    app.use(errorMiddleware.incorrectRoute);
    app.listen(config.server.port, () => {
        console.log(`Server listening on port ${config.server.port}.`);
    });
}
