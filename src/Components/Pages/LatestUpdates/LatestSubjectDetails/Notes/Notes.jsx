import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Notes = ({ data }) => {
  const { subjectId } = useParams()
  const navigate = useNavigate()

  const handleClick = (note) => {
    navigate(`/latestUpdate/${data._id}/${subjectId}/notes/${note.typeId}`)
  }

  return (
    <div>
      {data?.error && <p className='text-red-500 text-center'>{data?.error?.message || "Failed to get subject!!"}</p>}
      {data?.notes.length === 0 && <p className='text-red-500 flex items-center gap-2 font-semibold text-nowrap justify-center py-10'>No notes are available!!</p>}
      <div className='mt-10'>
        {data?.notes && data.notes.map(note => (
          <div key={note.typeId} onClick={() => handleClick(note)} className='mt-5 p-3 cursor-pointer shadow-lg border border-gray-300 font-semibold relative pl-7 bg-[#2222] rounded-2xl'>
            <div className='absolute bg-blue-800 left-0 ml-2 h-full top-0 p-1 rounded-l-xl'></div>
            <p className='name'>{note.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notes
