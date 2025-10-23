import React, { useContext, useState } from 'react'
import { FaCross } from 'react-icons/fa'
import { GiCancel } from 'react-icons/gi'
import { Store } from '../../context/Store'

const addSubjectForm = ({setaddSubForm}) => {
  const storeData = useContext(Store)
  const [formData, setformData] = useState({
    name: '',
    sem: 0,
    branch: ''
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
      seterr("Please Enter Name of Subject")
      return;
    }
    if(formData.sem == 0) {
      seterr("Please Select Sem of Subject")
      return;
    }
    if(formData.branch == '') {
      seterr("Please Select Branch of Subject")
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
      const strRes = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/v1/subject/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const res = await strRes.json();

      if(res.statusCode >= 400) {
        seterr(res.message)
      }

      const subject = res.data
      console.log("sub:", res);
      storeData.setsubjects(prev => [...prev, subject])
      setaddSubForm(false)
    } catch (error) {
      seterr("Failed to connect to database!! : ", error)
    }

    setaddSubForm(false)
  }

  return (
    <div className='min-h-screen w-full flex justify-center items-center bg-black/50 absolute top-0'>
      <form onSubmit={handleSubmit} className='bg-white p-8 m-3 w-[95vw] rounded-2xl'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold underline decoration-blue-600 decoration-5 underline-offset-10'>Add Subject</h1>
          <GiCancel onClick={()=>setaddSubForm(false)} className='text-[27px] mt-3 text-blue-800' />
        </div>
        <div className='m-3 mt-10 gap-3 flex flex-col w-full'>
          <div className='flex gap-3 items-center justify-between w-full'>
            <label htmlFor="name">Name</label>
            <input name='name' onChange={handleChange} className='bg-[#6666]/70 p-3 w-[80%] rounded-2xl' type="text" placeholder='Name of subject' />
          </div>
          <div className='flex gap-3 items-center justify-between w-full'>
            <label htmlFor="sem">Sem</label>
            <select className='bg-[#6666]/70 w-[80%] p-3 rounded-2xl' name="sem" onChange={handleChange}>
              <option value={0}>Select Sem</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
            </select>
          </div>
          <div className='flex gap-3 items-center justify-between w-full'>
            <label htmlFor="branch">Branch</label>
            <select className='bg-[#6666]/70 p-3 w-[80%] rounded-2xl' name="branch" onChange={handleChange}>
              <option value=''>Select Branch</option>
              <option value="CE">CE</option>
              <option value="IT">IT</option>
              <option value="EC">EC</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
              <option value="POLY">POLYTECH</option>
            </select>
          </div>
        </div>
        <p className='text-center text-red-600 font-semibold'>{err && err}</p>
        <button type='submit' className='flex w-fit mt-8 mx-auto bg-blue-400 px-10 p-2 rounded-2xl text-white'>Add Subject</button>
      </form>
    </div>
  )
}

export default addSubjectForm
