import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();


export const signup = async (req, res) => {
   try{
    const { fullName, userName, passWord, confirmPassword, gender} = req.body;

    console.log("passwords", passWord, confirmPassword);

    if(passWord !== confirmPassword){
        return res.status(400).json({error: "Passwords don't match"})
    }

    const user = await User.findOne({ userName });

    if(user){
        return res.status(400).json({error: 'Username already exists'})
    }
    
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(passWord, salt)


    const profileAvatar =`https://avatar.iran.liara.run/public/${gender == 'male'?'boy':'girl'}?username=${userName}`

    const newUser = new User({
        fullName, 
        userName, 
        password:hashedPassword, 
        gender,
        profilePic:profileAvatar
    })

   const userData = await newUser.save();

   if(userData){

    generateToken(userData._id,res);
   
    const {  fullName, 
        userName, 
        gender,
        profilePic} =  userData
    return res.status(201).json({
        fullName, 
        userName, 
        gender,
        profilePic
    })
       
   }
   else{
    return res.status(400).json({error:"Invalid user data"})
   }

   }catch(e){
    console.log("Error in Signup Controller",e.message);
   return res.status(500).json( {error:"Internal server error"});
   }
   
};

export const login = async (req, res) => {
    try{
        const { username, password} = req.body;

        const user = await User.findOne({ userName:username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '')

        if(!user || ! isPasswordCorrect){
            return res.status(400).json({error: 'Invalid username or password'})
        }

        generateToken(user._id,res);

        const {  fullName, 
            confirmPassword, 
            gender,
            userName,
            profilePic} =  user
        return res.status(200).json({
            fullName, 
            userName, 
            gender,
            profilePic
        })  

   }catch(e){
    console.log("Error in Login Controller",e.message);
   return res.status(500).json( {error:"Internal server error"});
   }
};

export const logout = (req, res) => {
try{
    res.cookie('jwt','', {maxAge:0});
    res.status(200).json({message:'Logged out successful'})
}catch(e){
    console.log("Error in Logout Controller",e.message);
   return res.status(500).json( {error:"Internal server error"});
   }
};