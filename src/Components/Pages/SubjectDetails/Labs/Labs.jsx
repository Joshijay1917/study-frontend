import React, { useEffect } from 'react'
import { useGetAllLabsQuery } from '../../../../Redux/Features/ApiSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'

const Labs = ({ setlabform, setloading }) => {
  const { subjectId } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, error } = useGetAllLabsQuery(subjectId)

  const handleClick = (lab) => {
    navigate(`/dashboard/${subjectId}/labmanual/${lab._id}`)
  }

  useEffect(() => {
    setloading(isLoading);
  }, [isLoading, setloading]);

  return (
    <div>
      {error && <p className='text-red-500 text-center'>{data?.error?.message || "Failed to get subject!!"}</p>}
      <div className='mt-10'>
        {data?.data && data.data.map(lab => (
        <div key={lab._id} onClick={()=>handleClick(lab)} className='mt-5 p-3 font-semibold cursor-pointer relative pl-7 bg-[#5555] rounded-2xl'>
          <div className='absolute bg-gray-700 left-0 ml-2 h-full top-0 p-1 rounded-l-xl'></div>
          <p className='name'>{lab.name}</p>
        </div>
      ))}
        <div className='flex flex-col gap-2 items-center mt-10'>
          <p className='font-bold text-xl'>Add Lab Manual</p>
          <button onClick={() => setlabform(true)} className='flex w-fit items-center justify-center bg-blue-400 px-10 p-2 rounded-2xl text-white'><FaPlus /> Add</button>
        </div>
      </div>
    </div>
  )
}

export default Labs
