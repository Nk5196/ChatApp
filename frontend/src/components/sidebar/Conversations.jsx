import React from 'react'
import useGetConversations from '../../hooks/useGetConversations';
import Conversation from './Conversation'

const Conversations = () => {
  const {loading, conversations} = useGetConversations();
  console.log("conversations-->>", conversations)
  return (
    <div className='py-2 flex flex-col mt-80'>
    <Conversation/>
    <Conversation/>
    <Conversation/>
    <Conversation/>
    <Conversation/>
    <Conversation/>
    </div>
  )
}

export default Conversations

