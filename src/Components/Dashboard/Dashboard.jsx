import React from 'react'
import { FaBook, FaBookOpen } from 'react-icons/fa'
import { FaBookAtlas } from 'react-icons/fa6'
import Subjects from '../Subjects/Subjects'
import Options from '../Options/Options'

const Dashboard = () => {
  return (
    <div className='bg-zinc-800 min-h-screen flex'>
      <div className="w-20 flex flex-col my-[30%] items-center py-6 space-y-6 text-white">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <FaBook className='text-2xl'/>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <FaBookAtlas className='text-2xl'/>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <FaBookOpen className='text-2xl'/>
        </div>
      </div>

      <div className="flex-1 relative">
        <div className="absolute inset-y-0 top-[15%] left-0 right-0 bg-white rounded-tl-[80px] rounded-tr-[0px] shadow-lg">
          <Subjects />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
