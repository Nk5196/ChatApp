import User from "../models/user.model.js";

export const signup = async (req, res) => {
   try{
    console.log("inside signup")

    const { fullName, userName, password, confirmPassword, gender} = req.body;
   
    if(password !== confirmPassword){
        return res.status(400).json({error: "Passwords don't match"})
    }

    const user = await User.findOne({ userName });

    if(user){
        return res.status(400).json({error: 'Username already exists'})
    }
    
    const profileAvatar =`https://avatar.iran.liara.run/public/${gender == 'male'?'boy':'girl'}?username=${userName}`

    const newUser = new User({
        fullName, 
        userName, 
        password, 
        confirmPassword, 
        gender,
        profilePic:profileAvatar
    })

   const userData = await newUser.save();

    res.status(201).json(userData)

   }catch(e){
    console.log("Error in Signup Controller",e.message);
   return res.status(500).json( {error:"Internal server error"});
   }
   
    console.log("sign up")
};

export const login = (req, res) => {
   return res.send("login")
};

export const logout = (req, res) => {
res.send("logout")
};