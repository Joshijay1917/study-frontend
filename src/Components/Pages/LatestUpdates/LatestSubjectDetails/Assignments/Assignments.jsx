import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Assignments = ({ data }) => {
  const { subjectId } = useParams()
  const navigate = useNavigate()

  const handleClick = (ass) => {
    navigate(`/latestUpdate/${data._id}/${subjectId}/assignment/${ass.typeId}`)
  }

  // const dateFormate = (date) => {
  //   const origDate = new Date(date)
  //   console.log("date=", origDate.getDate());
  //   return `${origDate.getDate()}/${origDate.getMonth() + 1}/${origDate.getFullYear()}`
  // }

  return (
    <div>
      {data?.error && <p className='text-red-500 text-center'>{data?.error?.message || "Failed to get subject!!"}</p>}
      {data?.assignments.length === 0 && <p className='text-red-500 flex items-center gap-2 font-semibold text-nowrap justify-center py-10'>No Assignments are available!!</p>}
      <div className='mt-10'>
        {data?.assignments && data.assignments.map(ass => (
        <div key={ass.typeId} onClick={()=>handleClick(ass)} className='mt-5 p-3 relative shadow-lg border border-gray-300 cursor-pointer pl-7 bg-[#2222] rounded-2xl'>
          <div className='absolute bg-theme left-0 ml-2 h-full top-0 p-1 rounded-l-xl'></div>
          <p className='name text-[18px] font-semibold'>{ass.title}</p>
          {/* <p className='name text-sm text-red-700 font-medium'>Deadline: {dateFormate(ass.deadline)}</p> */}
        </div>
      ))}
      </div>
    </div>
  )
}

export default Assignments
