import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetAllAssignmentsQuery } from '../../../../Redux/Features/ApiSlice'
import { FaPlus } from 'react-icons/fa'

const Assignments = ({ setassForm, setloading }) => {
  const { subjectId } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, error } = useGetAllAssignmentsQuery(subjectId)

  const handleClick = (ass) => {
    navigate(`/dashboard/${subjectId}/assignment/${ass._id}`)
  }

  const dateFormate = (date) => {
    const origDate = new Date(date)
    console.log("date=", origDate.getDate());
    return `${origDate.getDate()}/${origDate.getMonth() + 1}/${origDate.getFullYear()}`
  }

  useEffect(() => {
    setloading(isLoading);
  }, [isLoading, setloading]);

  return (
    <div>
      {error && <p className='text-red-500 text-center'>{data?.error?.message || "Failed to get subject!!"}</p>}
      <div className='mt-10'>
        {data?.data && data.data.map(ass => (
        <div key={ass._id} onClick={()=>handleClick(ass)} className='mt-5 p-3 relative cursor-pointer pl-7 bg-[#5555] rounded-2xl'>
          <div className='absolute bg-gray-700 left-0 ml-2 h-full top-0 p-1 rounded-l-xl'></div>
          <p className='name text-[18px] font-semibold'>{`Assignment - ${ass.number}`}</p>
          <p className='name text-sm text-red-700 font-medium'>Deadline: {dateFormate(ass.deadline)}</p>
        </div>
      ))}
        <div className='flex flex-col gap-2 items-center mt-10'>
          <p className='font-bold text-xl'>Add Assignment</p>
          <button onClick={() => setassForm(true)} className='flex w-fit items-center justify-center bg-blue-400 px-10 p-2 rounded-2xl text-white'><FaPlus /> Add</button>
        </div>
      </div>
    </div>
  )
}

export default Assignments
