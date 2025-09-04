import React, { createContext, useContext } from 'react'
import { FaPlus } from 'react-icons/fa'
import AddSubjectForm from '../Forms/addSubjectForm'
import { Link } from 'react-router-dom'
import { Store } from '../../context/Store'

const Subjects = ({ setaddSubForm }) => {
    const storeData = useContext(Store)

    const handleClick = (subject) => {
        console.log("SET:", subject);
        
        storeData.setcurrSubject(subject)
    }

    return (
        <div className="p-7">
            <h1 className="text-3xl mt-5 font-bold text-gray-800">Subjects</h1>
            {console.log("subs : ", storeData.subjects)}
            {storeData.subjects.map(sub => (
                <div key={sub._id} onClick={()=>handleClick(sub)} className='mt-5 p-3 font-semibold relative pl-7 bg-[#5555] rounded-2xl'>
                    <div className='absolute bg-gray-700 left-0 ml-2 h-full top-0 p-1 rounded-l-xl'></div>
                    <p className='name'>{sub.name}</p>
                </div>
            ))}
            {/* <div onClick={handleClick} className='mt-5 p-3 font-semibold relative pl-7 bg-[#5555] rounded-2xl'>
                <div className='absolute bg-gray-700 left-0 ml-2 h-full top-0 p-1 rounded-l-xl'></div>
                <p className='name'>Digital Fundamentals</p>
            </div>
            <div onClick={handleClick} className='mt-5 p-3 font-semibold relative pl-7 bg-[#5555] rounded-2xl'>
                <div className='absolute bg-gray-700 left-0 ml-2 h-full top-0 p-1 rounded-l-xl'></div>
                <p className='name'>Maths</p>
            </div>
            <div onClick={handleClick} className='mt-5 p-3 font-semibold relative pl-7 bg-[#5555] rounded-2xl'>
                <div className='absolute bg-gray-700 left-0 ml-2 h-full top-0 p-1 rounded-l-xl'></div>
                <p className='name'>Data Structure</p>
            </div> */}
            <div className='flex flex-col gap-2 items-center mt-10'>
                <p className='font-bold text-xl'>Add Subjects</p>
                <button onClick={() => setaddSubForm(true)} className='flex w-fit items-center justify-center bg-blue-400 px-10 p-2 rounded-2xl text-white'><FaPlus /> Add</button>
            </div>
            {/* <AddSubjectForm /> */}
        </div>
    )
}

export default Subjects
