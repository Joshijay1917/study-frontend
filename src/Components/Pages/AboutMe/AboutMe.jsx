import React from 'react'
import { FaLinkedin } from 'react-icons/fa'
import { IoLogoWhatsapp } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'

const AboutMe = () => {
  return (
    <div className="flex-1 relative">
      <div className="absolute inset-y-0 top-[12%] left-0 right-0 bg-white rounded-tl-[80px] rounded-tr-[0px] shadow-lg overflow-auto">
        <div className='p-7'>
          <h1 className='text-3xl mt-5 font-bold text-gray-800'>About me</h1>
          <div className='flex flex-col gap-2 items-center justify-center'>
            <img width={200} height={200} className='mt-6 rounded-full' src="creator.jpg" alt="" />
            <h3 className='font-bold text-2xl'>Joshi Jay</h3>
          </div>
          <div className='mt-5'>
            <h3 className='text-xl font-semibold'>Purpose</h3>
            <p>This Website is created to help students for notes, assignments and lab manual.</p>
          </div>
          <div className='mt-5'>
            <h3 className='text-xl font-semibold'>Contact US</h3>
            <p className='flex gap-2 mt-2 font-medium'><FaLinkedin className='text-2xl text-blue-800' />@Joshijay19</p>
            <p className='flex gap-2 mt-2 font-medium'><MdEmail className='text-2xl text-red-900' />jayjoshi1912007@gmail.com</p>
            <p className='flex gap-2 mt-2 font-medium'><IoLogoWhatsapp className='text-2xl text-green-600' />+91 9429248465</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutMe
