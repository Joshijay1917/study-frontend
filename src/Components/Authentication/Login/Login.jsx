import React, { useState } from 'react'
import { FaLock, FaUser } from 'react-icons/fa'
import { ImEnter } from 'react-icons/im'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../../../Redux/Features/ApiSlice'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../../Redux/Features/UserSlice'
import Loading from '../../Pages/Loading/Loading'

const Login = ({ setLoggedIn }) => {
  const [loginUser, { data, isLoading, isError }] = useLoginUserMutation()
  const navigate = useNavigate()
  const [error, seterror] = useState('')
  const [form, setform] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setform(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(form.username === '') {
      e.target.username.style.border = '1px solid red'
      seterror('Please enter username')
      return;
    } else {
      e.target.username.style.border = ''
    }
    if(form.password === '') {
      e.target.password.style.border = '1px solid red'
      seterror("Please enter password")
      return;
    } else {
      e.target.password.style.border = ''
    }

    seterror('')

    try {
      const res = await loginUser(form).unwrap()
      console.log("navigate:", res);
      if(res?.data?.user) {
        setLoggedIn(true)
      } else {
        return
      }
      navigate('/dashboard')
    } catch (error) {
      seterror(error?.data?.message || "Failed to login!!")
      console.error("Failed to login!! : ", error)
    }
  }

  return (
    <>
    <div className='bg min-h-screen bg-[url(bg.jpg)] bg-cover bg-bottom'>
      <h1 className='font-bold underline decoration-blue-800 underline-offset-12 decoration-5 relative z-10 title text-3xl text-center'>NOTES4ALL</h1>
      <div className='w-[90vw] left-4.5 absolute bg-[url(bg.jpg)] bg-cover bg-bottom rounded-2xl mt-10 mx-auto h-[52vh]'>
      </div>
      <form onSubmit={handleSubmit} className='w-[90vw] relative top-1/4 text-white backdrop-blur-xs p-10 flex flex-col justify-center items-center gap-5 rounded-2xl mt-10 mx-auto h-[52vh] bg-black/30 z-10'>
        <div className='flex flex-col items-center'>
          <h1 className='font-bold text-3xl'>Welcome</h1>
          <p className='font-light'>Login in to access notes</p>
        </div>
        <div className='flex gap-3 mx-auto items-center'>
          <label className='flex items-center gap-3' htmlFor="username"><FaUser className='text-blue-400' /> Username</label>
          <input onChange={handleChange} className='bg-gray-800 outline-0 p-3 w-3/4 rounded-2xl' type="text" name='username' placeholder='Username' id='username' />
        </div>
        <div className='flex gap-3 mx-auto items-center'>
          <label className='flex items-center gap-3' htmlFor="password"><FaLock className='text-blue-400 text-lg' /> Password</label>
          <input onChange={handleChange} className='bg-gray-800 outline-0 p-3 w-3/4 rounded-2xl' type="password" name='password' placeholder='Password' id='password' />
        </div>
        {error && <p className='text-red-400 font-semibold'>{error}</p>}
        <button type='submit' className='bg-blue-400 btn p-2 px-6 font-bold rounded-2xl flex items-center gap-3 text-gray-200'><ImEnter className='text-xl mt-1' /> Login</button>
        <div>
          Don't have an account? <Link className='text-blue-400' to={'/register'}>Sign up</Link>
        </div>
      </form>
    </div>
    {isLoading && <Loading />}
    </>
  )
}

export default Login
