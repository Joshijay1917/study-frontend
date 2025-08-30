import React from 'react'

const Navbar = () => {
    return (
        <>
            <div className='bg-white absolute w-full h-[15%]'>
                <img width={70} className='absolute m-3 rounded-full border-blue-900 p-1 border-10 mr-10 top-0 right-0' src="profile.png" alt="" />
            </div>
            <div className='bg-zinc-800 absolute top-0 w-[70%] rounded-br-[60px] h-[15%]'>
                <h1 className='underline decoration-blue-600 decoration-5 underline-offset-10 font-bold text-white text-4xl m-5 ml-10'>Notes4All</h1>
            </div>
        </>
    )
}

export default Navbar
