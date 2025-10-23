import React, { useContext, useState } from 'react'
import { FaLock, FaUser } from 'react-icons/fa'
import { ImEnter } from 'react-icons/im'
import { Link, useNavigate } from 'react-router-dom'
import {Store} from "../../../context/Store"

const Login = () => {
    const storeData = useContext(Store)
    const [err, seterr] = useState('')
    const navigate = useNavigate()
    const [form, setform] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target

        setform(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("username:", e.target.username);
        

        if(form.username == '') {
            seterr("Please Enter username!")
            e.target.username.style.border = '1px solid red'
            return;
        } else {
            e.target.username.style.border = ''
        }
        if(form.password == '') {
            seterr("Please Enter password!")
            e.target.password.style.border = '1px solid red'
            return;
        } else {
            e.target.password.style.border = ''
        }

        seterr('')

        try {
            const strRes = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/v1/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form),
                credentials: "include"
            })

            if(!strRes.ok) {
                seterr('Failed to login!!');
                return;
            }

            const res = await strRes.json();

            if(res.statusCode >= 400) {
                seterr(res.message)
                return;
            }

            storeData.setLoggedIn(true)
            navigate('/dashboard')
        } catch (error) {
            console.error("Not connect to backend : ", error)
            seterr('Cannot connect to the server!!')
            return;
        }
    }

    return (
        <div className='bg min-h-screen bg-[url(bg.jpg)] bg-cover bg-bottom'>
            {/* <img className='absolute opacity-20 h-full' src='bg.jpg'/> */}
            <h1 className='font-bold underline decoration-blue-800 underline-offset-12 decoration-5 relative z-10 title text-3xl text-center'>NOTES4ALL</h1>
            {/* <img className='absolute' src="study.png" alt="" /> */}
            <div className='w-[90vw] left-4.5 absolute bg-[url(bg.jpg)] bg-cover bg-bottom rounded-2xl mt-10 mx-auto h-[52vh]'>
            </div>
            <form onSubmit={handleSubmit} className='w-[90vw] relative top-1/4 text-white backdrop-blur-xs p-10 flex flex-col justify-center items-center gap-5 rounded-2xl mt-10 mx-auto h-[52vh] bg-black/30 z-10'>
                <div className='flex flex-col items-center'>
                    <h1 className='font-bold text-3xl'>Welcome</h1>
                    <p className='font-light'>Login in to access notes</p>
                </div>
                <div className='flex gap-3 mx-auto items-center'>
                    <label className='flex items-center gap-3' htmlFor="username"><FaUser className='text-blue-400' /> Username</label>
                    <input onChange={handleChange} className='bg-gray-800 p-3 w-3/4 rounded-2xl' type="text" name='username' placeholder='Username' />
                </div>
                <div className='flex gap-3 mx-auto items-center'>
                    <label className='flex items-center gap-3' htmlFor="username"><FaLock className='text-blue-400 text-lg' /> Password</label>
                    <input onChange={handleChange} className='bg-gray-800 p-3 w-3/4 rounded-2xl' type="text" name='password' placeholder='Password' />
                </div>
                <p>{err}</p>
                <button type='submit' className='bg-blue-400 btn p-2 px-6 font-bold rounded-2xl flex items-center gap-3 text-gray-200'><ImEnter className='text-xl mt-1' /> Login</button>
                <div>
                    Don't have an account? <Link className='text-blue-400' to={'/register'}>Sign up</Link>
                </div>
            </form>
        </div >
    )
}

export default Login
