import React from 'react'

const Navbar = () => {
  return (
    <>
      <div className='bg-white absolute w-full h-[13%]'></div>
      <div className='bg-zinc-800 absolute top-0 w-[70%] rounded-br-[60px] h-[13%]'>
        <h1 className='underline decoration-blue-600 decoration-5 underline-offset-10 font-bold text-white text-4xl m-5'>Notes4All</h1>
      </div>
    </>
  )
}

export default Navbar
