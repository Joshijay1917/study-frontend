import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <div className='bg-white absolute w-full h-[13%]'>
        <Link to={'/personal-info'}>
        <img width={70} className='absolute cursor-pointer z-30 border-6 p-1 m-6 border-gray-600 rounded-full top-0 right-0' src='profile.png'/>
        </Link>
      </div>
      <div className='bg-zinc-800 absolute top-0 w-[70%] rounded-br-[60px] h-[13%]'>
        <h1 className='underline decoration-blue-600 decoration-5 underline-offset-10 font-bold text-white text-4xl m-5'>Notes4All</h1>
      </div>
    </>
  )
}

export default Navbar
