import React, { useContext } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Store } from '../../context/Store'
import { useParams } from 'react-router-dom'

const Notes = ({setnoteForm}) => {
  const storeData = useContext(Store)
  const { subjectId } = useParams()
  
  return (
    <div className='mt-10'>
      {storeData.notesDetails.filter(data => data.subject === subjectId).map(note => (
        <div key={note._id} className='mt-5 p-3 font-semibold relative pl-7 bg-[#5555] rounded-2xl'>
          <div className='absolute bg-gray-700 left-0 ml-2 h-full top-0 p-1 rounded-l-xl'></div>
          <p className='name'>Unit - {note.unit} : {note.name}</p>
        </div>
      ))}
      <div className='flex flex-col gap-2 items-center mt-10'>
        <p className='font-bold text-xl'>Add Notes</p>
        <button onClick={() => setnoteForm(true)} className='flex w-fit items-center justify-center bg-blue-400 px-10 p-2 rounded-2xl text-white'><FaPlus /> Add</button>
      </div>
    </div>
  )
}

export default Notes
