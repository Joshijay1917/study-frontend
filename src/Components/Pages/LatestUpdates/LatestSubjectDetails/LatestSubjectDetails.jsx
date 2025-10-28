import React, { useEffect, useState } from 'react'
import Notes from './Notes/Notes'
import Assignments from './Assignments/Assignments'
import Labs from './Labs/Labs'
import { useParams } from 'react-router-dom'
import Loading from '../../Loading/Loading'
import { useGetAllSubjectsQuery, useGetLatestUpdatesQuery } from '../../../../Redux/Features/ApiSlice'

const LatestSubjectDetails = () => {
  const [require, setrequire] = useState("Notes")
  const [record, setrecord] = useState(null)
  const { subjectId, updateId } = useParams()
  const subjects = useGetAllSubjectsQuery()
  const { data, isLoading } = useGetLatestUpdatesQuery()
  const subject = subjects.data.data.find(sub => sub._id === subjectId)

  const handleClick = (e) => {
    setrequire(e.currentTarget.innerHTML)
  }

  useEffect(() => {
      if(data) {
        setrecord(data.data.find(rec => rec._id === updateId))
      }
    }, [data])

    console.log("Data=", data);
    

  return (
    <>
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 top-[12%] left-0 right-0 bg-white rounded-tl-[80px] rounded-tr-[0px] shadow-lg overflow-auto">
          <div className='p-5 bg-white'>
            <h1 className="text-2xl px-2 my-5 font-bold text-gray-800">{subject.name.toUpperCase().trim()}</h1>
            <div className='flex gap-5 text-[14px]'>
              <p onClick={handleClick} className={`${require === "Notes" ? 'underline decoration-6 underline-offset-8 decoration-blue-600' : ""} cursor-pointer`}>Notes</p>
              <p onClick={handleClick} className={`${require === "Assignments" ? 'underline decoration-6 underline-offset-8 decoration-blue-600' : ""} cursor-pointer`}>Assignments</p>
              <p onClick={handleClick} className={`${require === "Lab Manual" ? 'underline decoration-6 underline-offset-8 decoration-blue-600' : ""} cursor-pointer`}>Lab Manual</p>
            </div>
            {require === "Notes" && <Notes data={record} />}
            {require === "Assignments" && <Assignments data={record} />}
            {require === "Lab Manual" && <Labs data={record} />}
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
    </>
  )
}

export default LatestSubjectDetails
