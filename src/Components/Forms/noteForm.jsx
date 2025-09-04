import React, { useContext, useState } from 'react'
import { GiCancel } from 'react-icons/gi'
import { Store } from '../../context/Store'

const noteForm = ({setForm}) => {
  const storeData = useContext(Store)
  const [formData, setformData] = useState({
    name: '',
    subject: storeData.currSubject._id,
    unit: ''
  })
  const [err, seterr] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target

    setformData(prev =>({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if(formData.name === '') {
      seterr("Please Enter the Name of Unit")
      return;
    }
    if(!formData.subject) {
      seterr("Subject of this note is not found")
      return;
    }
    if(formData.unit == '') {
      seterr("Please Enter Unit no. of note")
      return;
    }

    // console.log("Back:", process.env.BACKEND_URI);
    try {
      
      // const strRes = await fetch(`${process.env.BACKEND_URI}/api/v1/subject/add`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(formData)
      // })
      const strRes = await fetch(`http://localhost:3000/api/v1/notes/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const res = await strRes.json();

      if(!res || res.statusCode >= 400) {
        seterr(res.message)
      }

      const note = res.data
      console.log("note:", res);
      storeData.setthings(prev => [...prev, note])
      setForm(false)
    } catch (error) {
      seterr("Failed to connect to database!! : ", error)
    }

    setForm(false)
  }

  return (
    <div className='min-h-screen w-full flex justify-center items-center bg-black/50 absolute top-0'>
      <form onSubmit={handleSubmit} className='bg-white p-8 m-3 w-[95vw] rounded-2xl'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold underline decoration-blue-600 decoration-5 underline-offset-10'>Add {storeData.currRequirement}</h1>
          <GiCancel onClick={()=>setForm(false)} className='text-[27px] mt-3 text-blue-800' />
        </div>
        <div className='m-3 mt-10 gap-3 flex flex-col w-full'>
          <div className='flex gap-3 items-center justify-between w-full'>
            <label htmlFor="name">Name</label>
            <input name='name' onChange={handleChange} className='bg-[#6666]/70 p-3 w-[80%] rounded-2xl' type="text" placeholder='Name of Unit' />
          </div>
          <div className='flex gap-3 items-center justify-between w-full'>
            <label htmlFor="unit">Unit</label>
            <input name='unit' onChange={handleChange} className='bg-[#6666]/70 p-3 w-[80%] rounded-2xl' type="text" placeholder='No. of unit' />
          </div>
        </div>
        <p className='text-center text-red-600 font-semibold'>{err && err}</p>
        <button type='submit' className='flex w-fit mt-8 mx-auto bg-blue-400 px-10 p-2 rounded-2xl text-white'>Add Subject</button>
      </form>
    </div>
  )
}

export default noteForm