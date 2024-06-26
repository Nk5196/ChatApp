import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
const useSignup = () => {
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const signup = async({fullName, userName, passWord, confirmPassword, gender} ) => {

     const success =  handleInputErrors({fullName, userName, passWord, confirmPassword, gender})

     if(!success) return;

     setLoading(true)
    try {

        const res = await fetch('http://localhost:8000/api/auth/signup' ,{
            method : 'POST',
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify({fullName, userName, passWord, confirmPassword, gender})
        })

        const data = await res.json();
        if (data.error){
            throw new Error(data.error)
        }

        localStorage.setItem("chat-user", JSON.stringify(data))
        setAuthUser(data)
        console.log("data",data)
        

    }catch(e){
        toast.error(e.message)
    } finally{
        setLoading(false)
    }
    }
 
    return {loading, signup}
}

export default useSignup

function handleInputErrors({fullName, userName, passWord, confirmPassword, gender}){

    if(!fullName || !userName || !passWord || !confirmPassword ||  !gender){
          toast.error('please fill in all the fields');
          return false;
    }

    if(passWord !== confirmPassword){
        toast('Password do not match');
          return false;
    }
    if(passWord.length < 6){
        toast.error('Password must be at least 6 charactes')
        return false
    }
    return true;
}