import React, { useContext } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Store } from '../../../context/Store'
import { useNavigate, useParams } from 'react-router-dom'

const Assignments = ({setassForm}) => {
  const storeData = useContext(Store)
  const navigate = useNavigate()
  const { subjectId } = useParams()

  const handleClick = (assignment) => {
    storeData.setcurrDetail(assignment)
    navigate(`/dashboard/${subjectId}/${assignment._id}`)
  }
  
  return (
    <div className='mt-10'>
      {storeData.assDetails.filter(data => data.subject === subjectId).map(ass => (
        <div key={ass._id} onClick={()=>handleClick(ass)} className='mt-5 p-3 relative cursor-pointer pl-7 bg-[#5555] rounded-2xl'>
          <div className='absolute bg-gray-700 left-0 ml-2 h-full top-0 p-1 rounded-l-xl'></div>
          <p className='name font-semibold'>{ass.require}</p>
          {/* <p className='name text-sm'>{(new Date(ass.deadline)).toString()}</p> */}
        </div>
      ))}
      <div className='flex flex-col gap-2 items-center mt-10'>
        <p className='font-bold text-xl'>Add Assignments</p>
        <button onClick={() => setassForm(true)} className='flex w-fit items-center justify-center bg-blue-400 px-10 p-2 rounded-2xl text-white'><FaPlus /> Add</button>
      </div>
    </div>
  )
}

export default Assignments