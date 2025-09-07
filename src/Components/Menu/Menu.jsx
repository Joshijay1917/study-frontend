import React, { useState, useEffect } from 'react'
import { FaBook, FaBookOpen } from 'react-icons/fa'
import { FaBookAtlas } from 'react-icons/fa6'

const Menu = () => {
    
    return (
        <div className={`w-16 flex flex-col my-[30%] items-center py-10 space-y-6 text-white`}>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaBook className='text-2xl' />
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaBookAtlas className='text-2xl' />
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaBookOpen className='text-2xl' />
            </div>
        </div>
    )
}

export default Menu
