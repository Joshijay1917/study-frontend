import React, { useContext } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Store } from '../../../context/Store'
import { useNavigate, useParams } from 'react-router-dom'

const Lab = ({setlabform}) => {
  const storeData = useContext(Store)
  const navigate = useNavigate()
  const { subjectId } = useParams()

  const handleClick = (lab) => {
    storeData.setcurrDetail(lab)
    navigate(`/dashboard/${subjectId}/${lab._id}`)
  }
  
  return (
    <div className='mt-10'>
      {storeData.labDetails.filter(data => data.subject === subjectId).map(lab => (
        <div key={lab._id} onClick={()=>handleClick(lab)} className='mt-5 p-3 font-semibold cursor-pointer relative pl-7 bg-[#5555] rounded-2xl'>
          <div className='absolute bg-gray-700 left-0 ml-2 h-full top-0 p-1 rounded-l-xl'></div>
          <p className='name'>{lab.require}</p>
        </div>
      ))}
      <div className='flex flex-col gap-2 items-center mt-10'>
        <p className='font-bold text-xl'>Add Lab Manual</p>
        <button onClick={() => setlabform(true)} className='flex w-fit items-center justify-center bg-blue-400 px-10 p-2 rounded-2xl text-white'><FaPlus /> Add</button>
      </div>
    </div>
  )
}

export default Lab