import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import path from 'path'
import connectToMongoDB from './db/connectToMongoDB.js';
import cookieParser from 'cookie-parser';
const app = express();
import cors from 'cors';

const PORT = process.env.PORT || 5000;
dotenv.config();

const _dirname = path.resolve();

const allowedOrigins = ['http://127.0.0.1:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(cookieParser()) 
app.use(express.json());
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)


app.listen(PORT, () => {
    connectToMongoDB()
    console.log("server running on port",PORT)});
