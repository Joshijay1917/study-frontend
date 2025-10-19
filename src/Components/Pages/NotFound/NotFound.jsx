import React from 'react'
import { CgDanger } from 'react-icons/cg'
import { MdReportProblem } from 'react-icons/md'

const NotFound = () => {
  return (
    <div className='flex bg flex-col justify-center items-center min-h-screen'>
        <h1 className='font-bold title mb-5 text-3xl text-center underline decoration-blue-800 underline-offset-12 decoration-5'>NOTES4ALL</h1>
        {/* <img src="study.png" alt="" /> */}
        <div className='flex flex-col items-center text-2xl font-semibold'>
        <div className='flex gap-1 items-center text-yellow-500'>
        <MdReportProblem />
        <p>404</p>
        </div>
        <p>Not Found</p>
        </div>
    </div>
  )
}

export default NotFound
