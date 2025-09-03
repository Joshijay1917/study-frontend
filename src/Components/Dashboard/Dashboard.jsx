import React, { useState } from 'react'
import { FaBook, FaBookOpen } from 'react-icons/fa'
import { FaBookAtlas } from 'react-icons/fa6'
import Subjects from '../Subjects/Subjects'
import Options from '../Options/Options'
import Navbar from '../Navbar/Navbar'
import AddSubjectForm from '../Forms/addSubjectForm'

const Dashboard = () => {
  const [addSubForm, setaddSubForm] = useState(false)
  const [currSub, setcurrSub] = useState("")

  return (
    <>
      <Navbar />
      <div className='bg-zinc-800 min-h-screen flex'>
        <div className="w-16 flex flex-col my-[30%] items-center py-10 space-y-6 text-white">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <FaBook className='text-2xl' />
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <FaBookAtlas className='text-2xl' />
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <FaBookOpen className='text-2xl' />
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="absolute inset-y-0 top-[12%] left-0 right-0 bg-white rounded-tl-[80px] rounded-tr-[0px] shadow-lg">
            {!currSub && <Subjects setaddSubForm={setaddSubForm} setcurrSub={setcurrSub} />}
            {currSub && <Options subject={currSub} />}
          </div>
        </div>
      </div>
      {addSubForm && <AddSubjectForm setaddSubForm={setaddSubForm} />}
    </>
  )
}

export default Dashboard
