import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDeleteNoteMutation, useGetAllNotesQuery } from '../../../../Redux/Features/ApiSlice'
import Loading from '../../Loading/Loading'
import { FaPlus } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { MdDelete } from 'react-icons/md'

const Notes = ({ setnoteForm, setloading }) => {
  const { subjectId } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, error } = useGetAllNotesQuery(subjectId)
  const [deleteNote, deleteNoteOptions] = useDeleteNoteMutation()
  const user = useSelector(state => (state.user.user))
  const [notes, setNotes] = useState([])

  const handleClick = (note) => {
    navigate(`/dashboard/${subjectId}/notes/${note._id}`)
  }

  const handleDelete = async(note) => {
    try {
      await deleteNote({notesId:note._id}).unwrap()
    } catch (error) {
      console.error("Err:", error)
    }
  }

  const handleSearch = (e) => {
    const find = e.target.value.toLowerCase()

    if(!data?.data) return;

    if(find) {
      setNotes(data.data.filter(note => (note.name.toLowerCase().includes(find) || note.unit == find)))
    } else {
      setNotes(data.data)
    }
  }

  useEffect(() => {
    setloading(isLoading || deleteNoteOptions.isLoading);
  }, [isLoading, setloading, deleteNoteOptions.isLoading]);

  useEffect(() => {
    if(data?.data) {
      setNotes(data.data)
    }
  }, [data])

  return (
    <div>
      <input onChange={handleSearch} className='bg-[#1111] border outline-0 border-gray-300 w-full mt-7 rounded-2xl p-2' placeholder='Search Notes'/>
      {error && <p className='text-red-500 text-center'>{data?.error?.message || "Failed to get subject!!"}</p>}
      {(notes.length === 0) && <p className='text-red-500 flex items-center gap-2 font-semibold text-nowrap justify-center py-10'>No notes are available!!</p>}
      <div>
        {notes && notes.map(note => (
          <div key={note._id} onClick={() => handleClick(note)} className='mt-5 p-3 cursor-pointer flex items-center justify-between shadow-lg border border-gray-300 font-semibold relative pl-7 bg-[#2222] rounded-2xl'>
            <div className='absolute bg-theme left-0 ml-2 h-full top-0 p-1 rounded-l-xl'></div>
            <p className='name'>{`Unit ${note.unit}: ${note.name}`}</p>
            {user.username === 'admin' && <button onClick={(e) => {e.stopPropagation();handleDelete(note)}}><MdDelete className='text-2xl z-10 text-red-400'/></button>}
          </div>
        ))}
        {user.username === 'admin' && <div className='flex flex-col gap-2 items-center mt-10'>
          <p className='font-bold text-xl'>Add Notes</p>
          <button onClick={() => setnoteForm(true)} className='flex w-fit items-center justify-center bg-theme px-10 p-2 rounded-2xl text-white'><FaPlus /> Add</button>
        </div>}
      </div>
    </div>
  )
}

export default Notes
