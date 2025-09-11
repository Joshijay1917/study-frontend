import React, { useContext, useState } from 'react'
import { GiCancel } from 'react-icons/gi'
import { Store } from '../../context/Store'
import { useParams } from 'react-router-dom'

const AssignmentForm = ({setassForm}) => {
  const storeData = useContext(Store)
  const { subjectId } = useParams()
  const [formData, setformData] = useState({
    number: '',
    subjectId: subjectId,
    deadline: ''
  })
  const [err, seterr] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target

    setformData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.number === '') {
      seterr("Please Enter the No. of Assignment")
      return;
    }
    if (!formData.subjectId) {
      seterr("Subject of this assignment is not found")
      return;
    }
    if (formData.deadline === '') {
      seterr("Please Enter Deadline of assignment")
      return;
    }

    try {
      const strRes = await fetch(`http://localhost:3000/api/v1/assignment/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const res = await strRes.json();
      
      if (res.statusCode >= 400) {
        seterr(res.message)
        return;
      }

      const ass = res.data

      storeData.setassDetails(prev => [...prev, {
        _id: ass._id,
        type: "Assignment",
        subject: ass.subject,
        require: `Assignment - ${ass.number}`,
        deadline: ass.deadline,
        photos: []
      }])
      
      setassForm(false)
    } catch (error) {
      seterr("Something went wrong!! Recheck your fields", error)
    }
    
  }

  return (
    <div className='min-h-screen w-full flex justify-center items-center bg-black/50 absolute top-0'>
      <form onSubmit={handleSubmit} className='bg-white p-8 m-3 w-[95vw] rounded-2xl'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold underline decoration-blue-600 decoration-5 underline-offset-10'>Add Assignment</h1>
          <GiCancel onClick={() => setassForm(false)} className='text-[27px] mt-3 text-blue-800' />
        </div>
        <div className='m-3 mt-10 gap-3 flex flex-col w-full'>
          <div className='flex gap-3 items-center justify-between w-full'>
            <label htmlFor="name">Number</label>
            <input name='number' onChange={handleChange} className='bg-[#6666]/70 p-3 w-[80%] rounded-2xl' type="text" placeholder='Assignment No.' />
          </div>
          <div className='flex gap-3 items-center justify-between w-full'>
            <label htmlFor="unit">Deadline</label>
            <input name='deadline' onChange={handleChange} className='bg-[#6666]/70 p-3 w-[80%] rounded-2xl' type="Date" placeholder='Assignment Due date' />
          </div>
        </div>
        <p className='text-center text-red-600 font-semibold'>{err && err}</p>
        <button type='submit' className='flex w-fit mt-8 mx-auto bg-blue-400 px-10 p-2 rounded-2xl text-white'>Add Assignment</button>
      </form>
    </div>
  )
}

export default AssignmentForm