import React, { useContext, useState } from 'react'
import { Store } from '../../context/Store'
import Notes from '../Notes/Notes'
import NoteForm from '../Forms/noteForm'

const Options = () => {
  const [require, setrequire] = useState("Notes")
  const storeData = useContext(Store)

  const handleClick = (e) => {
    setrequire(e.currentTarget.innerHTML)
    storeData.setcurrRequirement(e.currentTarget.innerHTML)
  }

  return (
    <div className='p-7'>
      <h1 className="text-2xl my-5 font-bold text-gray-800">{storeData.currSubject.name}</h1>
      <div className='flex gap-5 text-[14px]'>
        <p onClick={handleClick} className={`${require === "Notes" ? 'underline decoration-6 underline-offset-8 decoration-blue-600' : ""}`}>Notes</p>
        <p onClick={handleClick} className={`${require === "Assignments" ? 'underline decoration-6 underline-offset-8 decoration-blue-600' : ""}`}>Assignments</p>
        <p onClick={handleClick} className={`${require === "Lab Manual" ? 'underline decoration-6 underline-offset-8 decoration-blue-600' : ""}`}>Lab Manual</p>
      </div>
      {require === "Notes" && <Notes />}
    </div>
  )
}

export default Options
