import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import connectToMongoDB from './db/connectToMongoDB.js';

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

 
app.use(express.json());
app.use('/api/auth', authRoutes)

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