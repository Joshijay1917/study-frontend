import React, { useContext, useState, useEffect } from 'react'
import { Store } from '../../context/Store'
import Notes from '../subjectDetails/Notes'
import NoteForm from '../Forms/noteForm'
import Assignments from '../subjectDetails/Assignments'
import AssignmentForm from '../Forms/assignmentForm'
import Lab from '../subjectDetails/Lab'
import Labform from '../Forms/labForm'

const Options = () => {
  const [require, setrequire] = useState("Notes")
  const [noteForm, setnoteForm] = useState(false)
  const [assForm, setassForm] = useState(false)
  const [labform, setlabform] = useState(false)
  const storeData = useContext(Store)

  useEffect(() => {
    storeData.checkAndAddDetails(require)
  }, [require])


  const handleClick = (e) => {
    setrequire(e.currentTarget.innerHTML)
  }

  return (
    <>
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 top-[12%] left-0 right-0 bg-white rounded-tl-[80px] rounded-tr-[0px] shadow-lg overflow-auto">
          <div className='p-7 bg-white'>
            <h1 className="text-2xl my-5 font-bold text-gray-800">{storeData.currSubject.name.toUpperCase().trim()}</h1>
            <div className='flex gap-5 text-[14px]'>
              <p onClick={handleClick} className={`${require === "Notes" ? 'underline decoration-6 underline-offset-8 decoration-blue-600' : ""}`}>Notes</p>
              <p onClick={handleClick} className={`${require === "Assignments" ? 'underline decoration-6 underline-offset-8 decoration-blue-600' : ""}`}>Assignments</p>
              <p onClick={handleClick} className={`${require === "Lab Manual" ? 'underline decoration-6 underline-offset-8 decoration-blue-600' : ""}`}>Lab Manual</p>
            </div>
            {require === "Notes" && <Notes setnoteForm={setnoteForm}/>}
            {require === "Assignments" && <Assignments setassForm={setassForm}/>}
            {require === "Lab Manual" && <Lab setlabform={setlabform}/>}
          </div>
        </div>
      </div>
      {noteForm && <NoteForm setnoteForm={setnoteForm}/>}
      {assForm && <AssignmentForm setassForm={setassForm}/>}
      {labform && <Labform setlabform={setlabform}/>}
    </>
  )
}

export default Options
