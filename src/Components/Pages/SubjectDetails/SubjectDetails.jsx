import React, { useState } from 'react'
import Notes from './Notes/Notes'
import Assignments from './Assignments/Assignments'
import Labs from './Labs/Labs'
import { useParams } from 'react-router-dom'
import { useGetAllSubjectsQuery } from '../../../Redux/Features/ApiSlice'
import Loading from '../Loading/Loading'
import AddNoteForm from '../../Forms/addNoteForm'
import AddAssForm from '../../Forms/addAssForm'
import AddLabForm from '../../Forms/addLabForm'

const SubjectDetails = () => {
  const [require, setrequire] = useState("Notes")
  const [noteForm, setnoteForm] = useState(false)
  const [assForm, setassForm] = useState(false)
  const [labform, setlabform] = useState(false)
  const [loading, setloading] = useState(false)
  const { subjectId } = useParams()
  const { data } = useGetAllSubjectsQuery()
  const subject = data.data.find(sub => sub._id === subjectId)

  const handleClick = (e) => {
    setrequire(e.currentTarget.innerHTML)
  }

  return (
    <>
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 top-[12%] left-0 right-0 bg-white rounded-tl-[80px] rounded-tr-[0px] shadow-lg overflow-auto">
          <div className='p-7 bg-white'>
            <h1 className="text-2xl my-5 font-bold text-gray-800">{subject.name.toUpperCase().trim()}</h1>
            <div className='flex gap-5 text-[14px]'>
              <p onClick={handleClick} className={`${require === "Notes" ? 'underline decoration-6 underline-offset-8 decoration-blue-600' : ""} cursor-pointer`}>Notes</p>
              <p onClick={handleClick} className={`${require === "Assignments" ? 'underline decoration-6 underline-offset-8 decoration-blue-600' : ""} cursor-pointer`}>Assignments</p>
              <p onClick={handleClick} className={`${require === "Lab Manual" ? 'underline decoration-6 underline-offset-8 decoration-blue-600' : ""} cursor-pointer`}>Lab Manual</p>
            </div>
            {require === "Notes" && <Notes setnoteForm={setnoteForm} setloading={setloading}/>}
            {require === "Assignments" && <Assignments setassForm={setassForm} setloading={setloading}/>}
            {require === "Lab Manual" && <Labs setlabform={setlabform} setloading={setloading}/>}
          </div>
        </div>
      </div>
      {noteForm && <AddNoteForm setnoteForm={setnoteForm} />} 
      {assForm && <AddAssForm setassForm={setassForm} />}
      {labform && <AddLabForm setlabform={setlabform} />}
      {loading && <Loading />}
    </>
  )
}

export default SubjectDetails
