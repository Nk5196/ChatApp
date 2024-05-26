import React, { useState } from 'react'
import { TiSocialLastFm } from 'react-icons/ti';
import useConversation from '../zustand_store/useConversation';
import { ToastContainer, toast } from 'react-toastify';
const useSendMessage = () => {

    const [loading, setloading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();

    const sendMessage = async (message) => {
        setloading(true)
        try{
            const res = await fetch(`/api/messages/send/${selectedConversation._id}`,
            {
                method:'post',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({message})
            })
            const data = await res.json();
            if(data.error) throw new Error(data.error)

            setMessages(...messages,data)
            console.log("messages",messages)

        }catch(error){
            toast.error(error.message);
        } finally {
            setloading(false)
        }
    }

  return {sendMessage, loading}
}

export default useSendMessage
