import React from 'react'

const Options = ({subject}) => {
  return (
    <div className='p-7'>
      <h1 className="text-2xl my-5 font-bold text-gray-800">{subject}</h1>
      <div className='flex gap-5 text-[14px]'>
        <p className='underline decoration-6 underline-offset-8 decoration-blue-600'>Notes</p>
        <p>Assignments</p>
        <p>Lab Manual</p>
      </div>

      
    </div>
  )
}

export default Options
