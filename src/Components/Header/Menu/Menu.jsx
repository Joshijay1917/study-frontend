import React, { useEffect, useState } from 'react'
import { FaBook, FaHistory, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './Menu.css'

const Menu = () => {
    const [anim, setanim] = useState(false)
    const [currManu, setcurrManu] = useState("Dashboard")

    useEffect(() => {
        setTimeout(() => {
            setanim(true)
        }, 1000);
    }, [anim])

  return (
     <div className={`side px-1 flex flex-col my-[30%] items-center py-10 space-y-6 text-white`}>
            <Link to={'/dashboard'} onClick={()=>setcurrManu("Dashboard")} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaBook className={`${currManu === "Dashboard" ? `${anim ? 'icon' : ''} text-[35px]` : 'text-xl'}`} />
            </Link>
            <Link to={'/latestUpdate'} onClick={()=>setcurrManu("History")} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaHistory className={`${currManu === "History" ? `${anim ? 'icon' : ''} text-[35px]` : 'text-xl'}`} />
            </Link>
            <Link to={'/aboutme'} onClick={()=>setcurrManu("About")} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaUser className={`${currManu === "About" ? `${anim ? 'icon' : ''} text-[35px]` : 'text-xl'}`} />
            </Link>
        </div>
  )
}

export default Menu
