import React from 'react'
import Conversations from './Conversations'
import SearchInput from './SearchInput'

const SideBar = () => {
  return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
      <SearchInput/>
      <div className='divider  px-3'>
        <Conversations/>
      </div>
    </div>
  )
}

export default SideBar
