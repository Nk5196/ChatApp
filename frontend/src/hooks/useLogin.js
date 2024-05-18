import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {

    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const login = async (username, password) => {
        try{
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': "application/json"},
            body: JSON.stringify({username, password})
          });

          const data = await res.json();
          if(data.error){
            throw new Error(data.error)
          }

          localStorage.setItem('chat-user', JSON.stringify(data));
          setAuthUser(data)
        }
        catch(e){
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
}

export default useLogin
