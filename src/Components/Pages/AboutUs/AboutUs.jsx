import React from 'react'

const AboutUs = () => {
    return (
        <div className="flex-1 relative">
            <div className="absolute inset-y-0 top-[12%] left-0 right-0 bg-white rounded-tl-[80px] rounded-tr-[0px] shadow-lg overflow-auto">
                <div className='p-7'>
                    <h1 className='text-3xl mt-5 font-bold text-gray-800'>About Us</h1>
                    <div className='flex flex-col items-center justify-center'>
                        <img width={200} height={200} className='mt-6 rounded-full' src="creator.jpg" alt="" />
                        <h3 className='font-bold text-2xl'>Joshi Jay</h3>
                    </div>
                    <div className='mx-3 mt-5'>
                        <h3 className='text-xl font-semibold'>Purpose</h3>
                        <p>This Website is created to help students for notes, assignments and lab manual.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs
