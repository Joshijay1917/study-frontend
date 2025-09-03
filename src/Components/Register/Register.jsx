import React, { useState } from 'react'
import { BiLock } from 'react-icons/bi'
import { BsLock, BsLockFill } from 'react-icons/bs'
import { FaCodeBranch, FaLock, FaUser } from 'react-icons/fa'
import { GiHatchet } from 'react-icons/gi'
import { HiAcademicCap } from 'react-icons/hi'
import { MdEmail } from 'react-icons/md'
import { RiBookLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
// import "./Login.css"

const Register = () => {

    return (
        <div className='bg min-h-screen bg-[url(bg.jpg)] bg-cover bg-bottom'>
            {/* <img className='absolute opacity-20 h-full' src='bg.jpg'/> */}
            <h1 className='font-bold underline decoration-blue-800 underline-offset-12 decoration-5 relative z-10 title text-3xl text-center'>NOTES4ALL</h1>
            {/* <img className='absolute' src="study.png" alt="" /> */}
            <div className='w-[90vw] left-4.5 absolute bg-[url(bg.jpg)] bg-cover bg-bottom rounded-2xl mt-10 mx-auto h-[80%]'>
            </div>
            <div className='w-[90vw] relative top-1/4 text-white backdrop-blur-sm px-7 flex flex-col justify-center items-center gap-5 rounded-2xl mt-10 mx-auto h-full p-10 bg-black/30 z-10'>
                <div className='flex flex-col items-center'>
                    <h1 className='font-bold text-3xl'>Create Account</h1>
                    <p className='font-light'>Register to access notes</p>
                </div>
                <div className='flex items-center w-full justify-between gap-3'>
                    <label className='flex items-center gap-3' htmlFor="username"><FaUser className='text-blue-400' /> Username</label>
                    <input className='bg-gray-800 w-[60%] p-3 rounded-2xl' type="text" placeholder='Username' />
                </div>
                <div className='flex items-center w-full justify-between gap-3'>
                    <label className='flex items-center gap-3' htmlFor="email"><MdEmail className='text-blue-400' /> Email</label>
                    <input className='bg-gray-800 w-[60%] p-3 rounded-2xl' type="text" placeholder='Email' />
                </div>
                <div className='flex items-center w-full justify-between gap-3'>
                    <label className='flex items-center gap-3' htmlFor="password"><FaLock className='text-blue-400' /> Password</label>
                    <input className='bg-gray-800 w-[60%] p-3 rounded-2xl' type="text" placeholder='Password' />
                </div>
                <div className='flex items-center w-full justify-between gap-3'>
                    <label className='flex items-center gap-3' htmlFor="sem"><RiBookLine className='text-blue-400' /> Sem</label>
                    <select className='bg-gray-800 p-3 rounded-2xl w-[60%]' name="sem">
                        <option value={0}>Select Sem</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                    </select>
                </div>
                <div className='flex items-center w-full justify-between gap-3'>
                    <label className='flex items-center gap-3' htmlFor="sem"><FaCodeBranch className='text-blue-400' /> Branch</label>
                    <select className='bg-gray-800 p-3 rounded-2xl w-[60%]' name="sem">
                        <option value={0}>Select Branch</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                    </select>
                </div>
                <div className='flex items-center w-full justify-between gap-3'>
                    <label className='flex items-center gap-3' htmlFor="sem"><HiAcademicCap className='text-blue-400' /> Year</label>
                    <select className='bg-gray-800 p-3 rounded-2xl w-[60%]' name="Year">
                        <option value={0}>Select Year</option>
                        <option value={1}>1st</option>
                        <option value={2}>2nd</option>
                        <option value={3}>3rd</option>
                        <option value={4}>4th</option>
                    </select>
                </div>
                <button className='bg-blue-400 btn p-2 px-6 font-bold rounded-2xl text-gray-200'>Register</button>
                <div>
                    Already have an account? <Link className='text-blue-400' to={'/login'}>Sign In</Link>
                </div>
            </div>
        </div >
    )
}

export default Register