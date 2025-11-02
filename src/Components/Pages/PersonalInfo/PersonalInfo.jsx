import React, { useState } from 'react'
import { FaCodeBranch, FaPhone, FaUser } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';
import { MdEmail } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutUserMutation } from '../../../Redux/Features/ApiSlice';
import Loading from '../Loading/Loading';
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../../Redux/Features/UserSlice';

/*
username: "admin"
email: "jayjoshi1912007@gmail.com"
branch: "CE"
sem: 3
year: "2"
phone: "9106052826"
createdAt: "2025-10-29T08:37:45.763Z"
updatedAt: "2025-10-31T14:11:15.636Z"
*/
const PersonalInfo = () => {
    const user = useSelector((state) => state.user.user)
    const [logoutUser, {data, isLoading, isError}] = useLogoutUserMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log("User=", user);

    const handleClick = async() => {
      try {
        await logoutUser().unwrap()
        dispatch(logOut())
        navigate('/')
      } catch (error) {
        console.error("Failed to logout user! err:", error)
      }
    }

  return (
    <>
    <div className="flex-1 relative">
      <div className="absolute inset-y-0 top-[12%] left-0 right-0 app-pages-theme rounded-tl-[80px] rounded-tr-[0px] shadow-lg overflow-auto">
        <div className='p-5'>
            <div className='px-2 select-none mt-5 flex items-center text-3xl gap-3'>
            <FaUser className='icon-theme'/>
            <h1 className='font-bold text-gray-800'>Personal Details</h1>
            </div>
            <div className='py-5 flex flex-col gap-5 text-[15px]'>
                <div className='flex justify-between gap-3 bg-[#1111] p-3 rounded-2xl overflow-clip shadow-lg border border-gray-300'>
                    <label className='font-medium flex items-center gap-2'><FaUser className='icon-theme'/> Username: </label>
                    <p>{user?.username}</p>
                </div>
                <div className='flex justify-between gap-3 bg-[#1111] p-3 rounded-2xl overflow-clip shadow-lg border border-gray-300'>
                    <label className='font-medium flex gap-2 items-center'><MdEmail className='icon-theme text-lg'/> Email: </label>
                    <p>{user?.email}</p>
                </div>
                <div className='flex justify-between gap-3 bg-[#1111] p-3 rounded-2xl overflow-clip shadow-lg border border-gray-300'>
                    <label className='font-medium flex gap-2 items-center'><FaCodeBranch className='icon-theme'/> Branch: </label>
                    <p>{user?.branch}</p>
                </div>
                <div className='flex justify-between gap-3 bg-[#1111] p-3 rounded-2xl overflow-clip shadow-lg border border-gray-300'>
                    <label className='font-medium flex gap-2 items-center'><HiAcademicCap className='icon-theme text-xl'/> Year: </label>
                    <p>{user?.year}</p>
                </div>
                <div className='flex justify-between gap-3 bg-[#1111] p-3 rounded-2xl overflow-clip shadow-lg border border-gray-300'>
                    <label className='font-medium flex gap-2 items-center'><FaPhone className='icon-theme'/> Phone: </label>
                    <p>{user?.phone}</p>
                </div>
                {isError && <p className='text-center text-red-500 mt-1'>{data?.error?.data?.message}</p>}
                <button onClick={handleClick} className='text-white cursor-pointer bg-red-600 rounded-2xl p-3 w-1/2 mx-auto flex items-center justify-center gap-3'><BiLogOut className='mt-1 text-2xl'/> Logout</button>
            </div>
        </div>
      </div>
    </div>
    {isLoading && <Loading />}
    </>
  )
}

export default PersonalInfo
