import React, { useEffect, useState } from 'react'
import "./SubjectDetails.css"
import Notes from './Notes/Notes'
import Assignments from './Assignments/Assignments'
import Labs from './Labs/Labs'
import { useParams } from 'react-router-dom'
import { useGetAllSubjectsQuery } from '../../../Redux/Features/ApiSlice'
import Loading from '../Loading/Loading'
import AddNoteForm from '../../Forms/addNoteForm'
import AddAssForm from '../../Forms/addAssForm'
import AddLabForm from '../../Forms/addLabForm'
import { MdMenuBook } from 'react-icons/md'

const SubjectDetails = () => {
  const [require, setrequire] = useState("Notes")
  const tabs = ["Notes", "Assignments", "Lab Manuals"];
  const [activeTab, setActiveTab] = useState(1)
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

  useEffect(() => {
    if(require === "Notes") {
      setActiveTab(1);
    } else if (require === "Assignments") {
      setActiveTab(2.9);
    } else {
      setActiveTab(5.3);
    }
  }, [require])
  

  return (
    <>
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 top-[12%] left-0 right-0 bg-white rounded-tl-[80px] rounded-tr-[0px] shadow-lg overflow-auto">
          <div className='p-5 app-pages-theme'>
            <div className='px-2 select-none my-5 text-2xl flex items-center gap-3'>
            <MdMenuBook className='text-4xl icon-theme'/>
            <h1 className="font-bold text-gray-800">{subject.name.toUpperCase().trim()}</h1>
            </div>
            <div className='flex relative gap-5 text-[14px]'>
              <p onClick={handleClick} className='select-none cursor-pointer'>Notes</p>
              <p onClick={handleClick} className='select-none cursor-pointer'>Assignments</p>
              <p onClick={handleClick} className='select-none cursor-pointer'>Lab Manual</p>
              <div style={{transform: `translateX(${activeTab * 100}%)`}} className='bg-theme left-[-40px] w-[40px] transition-all duration-300 absolute h-[6px] top-5.5'></div>
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
