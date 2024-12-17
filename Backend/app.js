import './config/config.js';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from './middlewares/errorHandler.js';
import projectRoutes from './routes/project.js';
import progressRoutes from './routes/progressLogs.js';
import userRoutes from './routes/user.js';

const app = express();

app.use(
    cors({
        origin: ['http://localhost:3000'],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/projects', projectRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api', userRoutes);

app.use(errorHandler);

export default app;
