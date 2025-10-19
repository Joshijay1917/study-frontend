import React, { useState, useEffect } from 'react'
import { FaBook, FaBookOpen, FaHistory, FaUser } from 'react-icons/fa'
import { FaBookAtlas } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import './Menu.css'

const Menu = ({currManu, setcurrManu}) => {
    const [anim, setanim] = useState(false)

    setTimeout(() => {
        setanim(true)
    }, 1000);

    return (
        <div className={`side ${anim ? 'w-[65px]' : ''} flex flex-col my-[30%] items-center py-10 space-y-6 text-white`}>
            <Link to={'/dashboard'} onClick={()=>setcurrManu("Dashboard")} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaBook className={`${currManu === "Dashboard" ? `${anim ? 'icon' : ''} text-[35px]` : 'text-xl'}`} />
            </Link>
            <Link to={'/history'} onClick={()=>setcurrManu("History")} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaHistory className={`${currManu === "History" ? `${anim ? 'icon' : ''} text-[35px]` : 'text-xl'}`} />
            </Link>
            <Link to={'/about'} onClick={()=>setcurrManu("About")} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaUser className={`${currManu === "About" ? `${anim ? 'icon' : ''} text-[35px]` : 'text-xl'}`} />
            </Link>
        </div>
    )
}

export default Menu
