import React from 'react'
import { FaPlus } from 'react-icons/fa'
import AddSubjectForm from '../Forms/addSubjectForm'

const Subjects = () => {
    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold text-gray-800">Subjects</h1>

            {/* <div className='mt-5 p-3 font-semibold relative pl-7 bg-[#5555] rounded-2xl'>
                <div className='absolute bg-gray-700 left-0 ml-2 h-full top-0 p-1 rounded-l-xl'></div>
                Digital Fundamentals
            </div>
            <div className='mt-5 p-3 font-semibold relative pl-7 bg-[#5555] rounded-2xl'>
                <div className='absolute bg-gray-700 left-0 ml-2 h-full top-0 p-1 rounded-l-xl'></div>
                Maths
            </div>
            <div className='mt-5 p-3 font-semibold relative pl-7 bg-[#5555] rounded-2xl'>
                <div className='absolute bg-gray-700 left-0 ml-2 h-full top-0 p-1 rounded-l-xl'></div>
                Data Structure
            </div> */}
            <div className='flex flex-col gap-2 items-center mt-10'>
                <p className='font-bold text-xl'>Add Subjects</p>
                <button className='flex w-fit items-center justify-center bg-blue-400 px-10 p-2 rounded-2xl text-white'><FaPlus /> Add</button>
            </div>
            {/* <AddSubjectForm /> */}
        </div>
    )
}

export default Subjects
