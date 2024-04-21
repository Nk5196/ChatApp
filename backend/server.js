import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import path from 'path'
import connectToMongoDB from './db/connectToMongoDB.js';
import cookieParser from 'cookie-parser';
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

const _dirname = path.resolve();


app.use(cookieParser()) 
app.use(express.json());
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

// app.use(express.static(path.join(_dirname, "/frontend/dist")));

// app.get("*", (req,res)=>{
//     res.sendFile(path.join(_dirname,"frontend", "dist", "index.html"))
// })
// app.get("/", (req, res) => {
//     res.send("hello world");
// })


// app.get('/api/auth/signup', (req,res) => {
//     console.log("signup")
// })

// app.get('/api/auth/login', (req,res) => {
//     console.log("login")
// })

// app.get('/api/auth/logout', (req,res) => {
//     console.log("logout")
// })

app.listen(PORT, () => {
    connectToMongoDB()
    console.log("server running on port",PORT)});