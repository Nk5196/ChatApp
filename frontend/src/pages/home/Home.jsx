import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import MessageContainer from '../../components/messages/MessageContainer'
import SideBar from '../../components/sidebar/SideBar'

const Home = () => {
  // const [data,setData] = useState('');

  // const fetchApi= async ()=>{
  //    const fetchedData = await fetch('https://dummyjson.com/products');
  //    const movies = await fetchedData.json();

  //    console.log("fetched data",movies)
  // }

  // useEffect(()=>{
  //   fetchApi()
  // },[]);


  return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <SideBar/>
      <MessageContainer/>
    </div>
  )
}

export default Home
