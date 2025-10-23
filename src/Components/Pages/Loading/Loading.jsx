import React from 'react'
import { FaAddressBook, FaBook } from 'react-icons/fa'
import "./Loading.css"

const Loading = () => {
  return (
    <div className='bg-black/50 fixed top-0 min-h-screen w-full flex justify-center items-center'>
      <div className='text-7xl rotate'>
        <FaAddressBook className='text-gray-300'/>
      </div>
    </div>
  )
}

export default Loading
