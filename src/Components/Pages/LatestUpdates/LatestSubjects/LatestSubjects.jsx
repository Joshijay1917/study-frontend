import React, { useEffect, useState } from 'react'
import Subjects from './Subjects/Subjects'
import Loading from '../../Loading/Loading'
import { useGetAllSubjectsQuery, useGetLatestUpdatesQuery } from '../../../../Redux/Features/ApiSlice'
import { useParams } from 'react-router-dom'

const LatestSubjects = () => {
  const { updateId } = useParams()
  const { data, isLoading } = useGetLatestUpdatesQuery()
  const subjects = useGetAllSubjectsQuery()
  const [record, setrecord] = useState(null)
  const [latestSubjects, setlatestSubjects] = useState([])

  useEffect(() => {
    if(data) {
      setrecord(data.data.find(rec => rec._id === updateId))
      if(record) {
        setlatestSubjects(subjects.data.data.filter(sub => {
          return record.subjects.find(newSub => newSub._id === sub._id)
        }))
      }
    }
  }, [data, record])

  return (
    <>
    <div className="flex-1 relative">
      <div className="absolute inset-y-0 top-[12%] left-0 right-0 bg-white rounded-tl-[80px] rounded-tr-[0px] shadow-lg overflow-auto">
        <Subjects latestSubjects={latestSubjects} record={record}/>
      </div>
    </div>
    {(isLoading || subjects.isLoading) && <Loading />}
    </>
  )
}

export default LatestSubjects
