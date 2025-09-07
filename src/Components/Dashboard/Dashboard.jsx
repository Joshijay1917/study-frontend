import React, { useState } from 'react'
import Subjects from '../Subjects/Subjects'
import AddSubjectForm from '../Forms/addSubjectForm'

const Dashboard = () => {
  const [addSubForm, setaddSubForm] = useState(false)

  return (
    <>
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 top-[12%] left-0 right-0 bg-white rounded-tl-[80px] rounded-tr-[0px] shadow-lg overflow-auto">
          <Subjects setaddSubForm={setaddSubForm} />
        </div>
      </div>
      {addSubForm && <AddSubjectForm setaddSubForm={setaddSubForm} />}
    </>
  )
}

export default Dashboard
