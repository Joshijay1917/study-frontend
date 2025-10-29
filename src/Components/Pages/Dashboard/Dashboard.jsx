import React, { useState } from 'react'
import Subjects from './Subjects/Subjects'
import Loading from '../Loading/Loading'
import { useGetAllSubjectsQuery } from '../../../Redux/Features/ApiSlice'
import AddSubjectForm from '../../Forms/addSubjectForm'

const Dashboard = () => {
  const [addSubForm, setaddSubForm] = useState(false)
  const { data, isLoading, isError, error } = useGetAllSubjectsQuery()
  const [loading, setLoading] = useState(false)

  return (
    <>
    <div className="flex-1 relative">
      <div className="absolute inset-y-0 top-[12%] left-0 right-0 bg-white rounded-tl-[80px] rounded-tr-[0px] shadow-lg overflow-auto">
        <Subjects setaddSubForm={setaddSubForm} data={data} setLoading={setLoading}/>
      </div>
    </div>
    {(isLoading || loading) ? <Loading /> : ""}
    {addSubForm && <AddSubjectForm setaddSubForm={setaddSubForm}/>}
    </>
  )
}

export default Dashboard
