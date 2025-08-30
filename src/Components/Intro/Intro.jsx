import React from 'react'
import './Intro.css'

const Intro = () => {
  return (
    <div className='bg min-h-screen'>
      <h1 className='font-bold title text-3xl text-center'>NOTES4ALL</h1>
      <img src="study.png" alt="" />
      <button className='bg-blue-600 btn w-1/2 relative left-1/4 font-bold'>Let's Get Started</button>
    </div>
  )
}

export default Intro
