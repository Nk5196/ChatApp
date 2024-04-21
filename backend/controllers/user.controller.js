import User from "../models/user.model.js";


export const getUsersForSidebar = async (req, res) => {
    try{

        const loggedInUserId = req.user._id;
        const filteredUser = await User.find({
            _id: { $ne: loggedInUserId}
        }).select('-password');

        res.send(filteredUser);

    }catch(e){
        console.log("Error in Send message Controller",e.message);
       return res.status(500).json( {error:"Internal server error"});
       }
}