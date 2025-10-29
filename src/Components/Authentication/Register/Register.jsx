import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterUserMutation } from '../../../Redux/Features/ApiSlice'
import Loading from '../../Pages/Loading/Loading'
import { FaCodeBranch, FaLock, FaPhone, FaUser } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { RiBookLine } from 'react-icons/ri'
import { HiAcademicCap } from 'react-icons/hi'

const Register = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation()
  const [form, setform] = useState({
    username: '',
    password: '',
    phone: '',
    email: '',
    sem: 0,
    branch: 0,
    year: 0
  })
  const formRef = useRef();
  const navigate = useNavigate()
  const [err, seterr] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target

    setform(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const validateField = (name, value) => {
    if (value === '' || (name === 'sem' || name === 'branch' || name === 'year') && value === 0) {
      return true;
    }
    return false;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    for (let field in form) {
      const value = form[field];
      const hasError = validateField(field, value);

      if (hasError) {
        formRef.current[field].style.border = '1px solid red';
        seterr(`Please Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`);
        return;
      } else {
        formRef.current[field].style.border = '';
      }
    }

    seterr('');

    try {
      await registerUser(form).unwrap()
      navigate('/login')
    } catch (error) {
      console.log("Failed to call backend:", error);
      seterr(error?.data?.message || "Server Error!!");
    }
  }

  return (
    <>
      <div className='bg min-h-screen bg-[url(bg.jpg)] bg-cover bg-bottom'>
        <h1 className='font-bold underline decoration-blue-800 underline-offset-12 decoration-5 relative z-10 title text-3xl text-center'>NOTES4ALL</h1>
        <div className='w-[90vw] left-4.5 absolute bg-[url(bg.jpg)] bg-cover bg-bottom rounded-2xl mt-10 mx-auto h-[80%]'>
        </div>
        <form ref={formRef} onSubmit={handleSubmit} className='w-[90vw] relative top-1/4 text-white backdrop-blur-sm px-7 flex flex-col justify-center items-center gap-5 rounded-2xl mt-10 mx-auto h-full p-10 bg-black/30 z-10'>
          <div className='flex flex-col items-center'>
            <h1 className='font-bold text-3xl'>Create Account</h1>
            <p className='font-light'>Register to access notes</p>
          </div>
          <div className='flex items-center w-full justify-between gap-3'>
            <label className='flex items-center gap-3' htmlFor="username"><FaUser className='text-blue-400' /> Username</label>
            <input className='bg-gray-800 w-[60%] p-3 rounded-2xl' type="text" placeholder='Username' name='username' onChange={handleChange} />
          </div>
          <div className='flex items-center w-full justify-between gap-3'>
            <label className='flex items-center gap-3' htmlFor="password"><FaLock className='text-blue-400' /> Password</label>
            <input className='bg-gray-800 w-[60%] p-3 rounded-2xl' type="text" placeholder='Password' name='password' onChange={handleChange} />
          </div>
          <div className='flex items-center w-full justify-between gap-3'>
            <label className='flex items-center gap-3' htmlFor="phone"><FaPhone className='text-blue-400' /> Phone</label>
            <input className='bg-gray-800 w-[60%] p-3 rounded-2xl' type="text" placeholder='Phone no.' name='phone' onChange={handleChange} />
          </div>
          <div className='flex items-center w-full justify-between gap-3'>
            <label className='flex items-center gap-3' htmlFor="email"><MdEmail className='text-blue-400' /> Email</label>
            <input className='bg-gray-800 w-[60%] p-3 rounded-2xl' type="text" placeholder='Email' name='email' onChange={handleChange} />
          </div>
          <div className='flex items-center w-full justify-between gap-3'>
            <label className='flex items-center gap-3' htmlFor="sem"><RiBookLine className='text-blue-400' /> Sem</label>
            <select className='bg-gray-800 p-3 rounded-2xl w-[60%]' name="sem" onChange={handleChange}>
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
          <div className='flex items-center w-full justify-between gap-3'>
            <label className='flex items-center gap-3' htmlFor="branch"><FaCodeBranch className='text-blue-400' /> Branch</label>
            <select className='bg-gray-800 p-3 rounded-2xl w-[60%]' name="branch" onChange={handleChange}>
              <option value={0}>Select Branch</option>
              <option value={'CE'}>Computer</option>
              <option value={'IT'}>Information & Technology</option>
              <option value={'EC'}>Electronics & Communication</option>
              <option value={'MECH'}>Mechaniacal</option>
              <option value={'CIVIL'}>Civil</option>
              <option value={'POLY'}>Poly Tech</option>
            </select>
          </div>
          <div className='flex items-center w-full justify-between gap-3'>
            <label className='flex items-center gap-3' htmlFor="year"><HiAcademicCap className='text-blue-400' /> Year</label>
            <select className='bg-gray-800 p-3 rounded-2xl w-[60%]' name="year" onChange={handleChange}>
              <option value={0}>Select Year</option>
              <option value={1}>1st</option>
              <option value={2}>2nd</option>
              <option value={3}>3rd</option>
              <option value={4}>4th</option>
            </select>
          </div>
          {err && <p className='text-red-400'>{err}</p>}
          <button type='submit' className='bg-blue-400 btn p-2 px-6 font-bold rounded-2xl text-gray-200'>Register</button>
          <div>
            Already have an account? <Link className='text-blue-400' to={'/login'}>Sign In</Link>
          </div>
        </form>
      </div>
      {isLoading && <Loading />}
    </>
  )
}

export default Register
