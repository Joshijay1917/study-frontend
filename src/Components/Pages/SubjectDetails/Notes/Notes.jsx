import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetAllNotesQuery } from '../../../../Redux/Features/ApiSlice'
import Loading from '../../Loading/Loading'
import { FaPlus } from 'react-icons/fa'

const Notes = ({ setnoteForm, setloading }) => {
  const { subjectId } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, error } = useGetAllNotesQuery(subjectId)

  const handleClick = (note) => {
    navigate(`/dashboard/${subjectId}/notes/${note._id}`)
  }

  useEffect(() => {
    setloading(isLoading);
  }, [isLoading, setloading]);

  return (
    <div>
      {error && <p className='text-red-500 text-center'>{data?.error?.message || "Failed to get subject!!"}</p>}
      {data?.data.length === 0 && <p className='text-red-500 flex items-center gap-2 font-semibold text-nowrap justify-center py-10'>No notes are available!!</p>}
      <div className='mt-10'>
        {data?.data && data.data.map(note => (
          <div key={note._id} onClick={() => handleClick(note)} className='mt-5 p-3 cursor-pointer shadow-lg border border-gray-300 font-semibold relative pl-7 bg-[#2222] rounded-2xl'>
            <div className='absolute bg-blue-800 left-0 ml-2 h-full top-0 p-1 rounded-l-xl'></div>
            <p className='name'>{`Unit ${note.unit}: ${note.name}`}</p>
          </div>
        ))}
        <div className='flex flex-col gap-2 items-center mt-10'>
          <p className='font-bold text-xl'>Add Notes</p>
          <button onClick={() => setnoteForm(true)} className='flex w-fit items-center justify-center bg-blue-400 px-10 p-2 rounded-2xl text-white'><FaPlus /> Add</button>
        </div>
      </div>
    </div>
  )
}

export default Notes
