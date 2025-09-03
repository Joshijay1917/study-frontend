import React from 'react'
import './Intro.css'
import { Link, Navigate } from 'react-router-dom'

const Intro = ({ setIntro }) => {
  return (
    <div className='bg min-h-screen py-[25%]'>
      <h1 className='font-bold title text-3xl text-center underline decoration-blue-800 underline-offset-12 decoration-5'>NOTES4ALL</h1>
      <img src="study.png" alt="" />
      <Link to={"/login"}>
        <button className='bg-blue-600 btn w-1/2 relative left-1/4 font-bold'>Let's Get Started</button>
      </Link>
    </div>
  )
}

export default Intro
