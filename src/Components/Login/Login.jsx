import React, { useState } from 'react'
// import "./Login.css"

const Login = () => {

    return (
        <div className='bg min-h-screen'>
            <h1 className='font-bold title text-3xl text-center'>NOTES4ALL</h1>
            {/* <img className='absolute' src="study.png" alt="" /> */}
            <div className='w-[70vw] relative top-1/4 text-white p-10 flex flex-col justify-center items-center gap-5 rounded-2xl mt-10 mx-auto h-[52vh] bg-black/30 z-10'>
                <h1 className='font-bold text-3xl'>Login</h1>
                <div className='flex gap-3 mx-auto items-center'>
                    <label htmlFor="username">Username</label>
                    <input className='bg-gray-800 p-3 w-3/4 rounded-2xl' type="text" placeholder='Username' id='username' />
                </div>
                <div className='flex gap-3 mx-auto items-center'>
                    <label htmlFor="username">Password</label>
                    <input className='bg-gray-800 p-3 w-3/4 rounded-2xl' type="text" placeholder='Password' id='username' />
                </div>
                <button className='bg-blue-400 btn p-2 px-6 font-bold rounded-2xl text-gray-800'>Login</button>
            </div>
        </div >
    )
}

export default Login
