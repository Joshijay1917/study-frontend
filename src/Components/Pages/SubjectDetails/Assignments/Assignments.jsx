import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDeleteAssignmentMutation, useGetAllAssignmentsQuery } from '../../../../Redux/Features/ApiSlice'
import { FaPlus } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { MdDelete } from 'react-icons/md'

const Assignments = ({ setassForm, setloading }) => {
  const { subjectId } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, error } = useGetAllAssignmentsQuery(subjectId)
  const [deleteAssignment, deleteAssignmentOptions] = useDeleteAssignmentMutation()
  const user = useSelector(state => (state.user.user))

  const handleClick = (ass) => {
    navigate(`/dashboard/${subjectId}/assignment/${ass._id}`)
  }

  const dateFormate = (date) => {
    const origDate = new Date(date)
    console.log("date=", origDate.getDate());
    return `${origDate.getDate()}/${origDate.getMonth() + 1}/${origDate.getFullYear()}`
  }

  const handleDelete = async (ass) => {
    try {
      await deleteAssignment(ass._id).unwrap()
    } catch (error) {
      console.error("Err:", error)
    }
  }

  useEffect(() => {
    setloading(isLoading);
  }, [isLoading, setloading, deleteAssignmentOptions.isLoading]);

  return (
    <div>
      {error && <p className='text-red-500 text-center'>{data?.error?.message || "Failed to get subject!!"}</p>}
      {data?.data.length === 0 && <p className='text-red-500 flex items-center gap-2 font-semibold text-nowrap justify-center py-10'>No Assignments are available!!</p>}
      <div className='mt-10'>
        {data?.data && data.data.map(ass => (
        <div key={ass._id} onClick={()=>handleClick(ass)} className='mt-5 p-3 relative flex items-center justify-between shadow-lg border border-gray-300 cursor-pointer pl-7 bg-[#2222] rounded-2xl'>
          <div className='absolute bg-blue-800 left-0 ml-2 h-full top-0 p-1 rounded-l-xl'></div>
          <div>
          <p className='name text-[18px] font-semibold'>{`Assignment - ${ass.number}`}</p>
          <p className='name text-sm text-red-700 font-medium'>Deadline: {dateFormate(ass.deadline)}</p>
          </div>
          {user.username === 'admin' && <MdDelete onClick={() => handleDelete(ass)} className='text-2xl text-red-400'/>}
        </div>
      ))}
        {user.username === 'admin' && <div className='flex flex-col gap-2 items-center mt-10'>
          <p className='font-bold text-xl'>Add Assignment</p>
          <button onClick={() => setassForm(true)} className='flex w-fit items-center justify-center bg-blue-400 px-10 p-2 rounded-2xl text-white'><FaPlus /> Add</button>
        </div>}
      </div>
    </div>
  )
}

export default Assignments
