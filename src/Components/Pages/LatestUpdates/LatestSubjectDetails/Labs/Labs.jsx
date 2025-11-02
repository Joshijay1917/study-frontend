import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Labs = ({ data }) => {
  const { subjectId } = useParams()
  const navigate = useNavigate()

  const handleClick = (lab) => {
    navigate(`/latestUpdate/${data._id}/${subjectId}/labmanual/${lab.typeId}`)
  }

  return (
    <div>
      {data?.error && <p className='text-red-500 text-center'>{data?.error?.message || "Failed to get subject!!"}</p>}
      {data?.labmanual.length === 0 && <p className='text-red-500 flex items-center gap-2 font-semibold text-nowrap justify-center py-10'>No lab manual is available!!</p>}
      <div className='mt-10'>
        {data?.labmanual && data.labmanual.map(lab => (
        <div key={lab.typeId} onClick={()=>handleClick(lab)} className='mt-5 p-3 font-semibold shadow-lg border border-gray-300 cursor-pointer relative pl-7 bg-[#2222] rounded-2xl'>
          <div className='absolute bg-theme left-0 ml-2 h-full top-0 p-1 rounded-l-xl'></div>
          <p className='name'>{lab.title}</p>
        </div>
      ))}
      </div>
    </div>
  )
}

export default Labs
