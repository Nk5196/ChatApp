import Conversation from "../models/conversation.Model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try{
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._doc._id;

       let conversation =  await Conversation.findOne({
            participants:{ 
                $all: [senderId, receiverId]
            }
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants : [senderId, receiverId],

            })
        };

        const newMessage = new Message({
          senderId,
          receiverId,
          message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

       await Promise.all([conversation.save(),newMessage.save()])
      
       return res.status(201).json(newMessage)
    }catch(e){
        console.log("Error in Send message Controller",e.message);
       return res.status(500).json( {error:"Internal server error"});
       }
}

export const getMessages = async (req, res)=>{
    try{
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;
        const conversation = await  Conversation.findOne({
            participants : {$all: [senderId, userToChatId]},
        }).populate('messages');
        console.log("sender Id", senderId);

        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found" });
        }
        
      return  res.status(200).json(conversation.messages)
    } catch (e){
        console.log("Error in get message Controller",e.message);
        return res.status(500).json( {error:"Internal server error"});
    }
}