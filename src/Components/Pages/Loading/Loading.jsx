import React, { useState } from 'react'
import { FaAddressBook, FaBook } from 'react-icons/fa'
import "./Loading.css"

const Loading = () => {
  const [msg, setmsg] = useState('')
  setTimeout(() => {
    setmsg('Wait Server Is Responding...')
  }, 10000);
  return (
    <div className='bg-black/50 z-30 fixed top-0 min-h-screen w-full flex justify-center items-center'>
      <div className='flex flex-col items-center justify-center gap-3'>
      <div className='text-7xl rotate'>
        <FaAddressBook className='text-gray-300'/>
      </div>
      {msg && <p className='text-white text-2xl font-bold'>{msg}</p>}
      </div>
    </div>
  )
}

export default Loading