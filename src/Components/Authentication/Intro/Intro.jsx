import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Intro.css'
import { useSelector } from 'react-redux'

const Intro = () => {
  const navigate = useNavigate()

  return (
    <div className='bg min-h-screen py-[25%]'>
      <h1 className='font-bold title text-3xl text-center underline decoration-blue-800 underline-offset-12 decoration-5'>NOTES4ALL</h1>
      <img src="study.png" alt="" />
        <button onClick={()=>navigate('/login')} className='bg-blue-600 btn w-1/2 relative left-1/4 font-bold'>Let's Get Started</button>
    </div>
  )
}

export default Intro
