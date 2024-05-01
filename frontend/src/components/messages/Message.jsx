import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end'>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
            <img alt='tailwind CSS chat bubble component'
              src={'https://res.cloudinary.com/select-models/image/fetch/w_2560,c_limit/w_1.0,c_fit,ar_3:4,f_auto,q_auto:best/https://select-images.agencypin.com/files/gallery/14465/expanded/model_14465_02ac71734726.jpg'}
            />
        </div>
      </div>
      <div className="chat-bubble chat-bubble-primary p-2 mb-1">What kind of nonsense is this</div>
      <div className="chat-bubble chat-bubble-success p-2 mb-1">You have been given a great honor.</div>
    </div>
  )
}

export default Message
