import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs"

// sign with RSA SHA256
const secretKey = process.env.SECRET_JWT || "";

const generateToken = (userId, res) => {

    var token = jwt.sign({ userId }, secretKey, { expiresIn: '10d' });

    res.cookie('jwt', token,{
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development' 
    })
}

export default generateToken