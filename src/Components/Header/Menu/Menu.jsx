import React, { useEffect, useState } from 'react'
import { FaBook, FaHistory, FaUser } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Menu.css'
import { IoMdArrowBack } from 'react-icons/io'

const Menu = () => {
    const [anim, setanim] = useState(false)
    const navigate = useNavigate()
    const [currManu, setcurrManu] = useState("Dashboard")
    const location = useLocation()
    const [btnAnim, setBtnAnim] = useState(false)

    useEffect(() => {
        const timeinterval = setTimeout(() => {
            setanim(true)
        }, 1000);

        return () => clearTimeout(timeinterval)
    }, [])

    const hideBackBtnRoutes = ['/dashboard', '/latestUpdate', '/aboutme']
    const showBackBtn = !hideBackBtnRoutes.includes(location.pathname)

    useEffect(() => {
        let timeinterval
        if(!showBackBtn) {
            timeinterval = setTimeout(() => {
                setBtnAnim(false)
            }, 1200);
        } else {
            setBtnAnim(true)
        }
        return () => clearTimeout(timeinterval)
    }, [showBackBtn])

  return (
     <div className={`gap-5 h-[82vh] top-[18vh] relative px-1 flex flex-col items-center py-10 text-white`}>
            {btnAnim && <button onClick={()=>navigate(-1)} className={`w-12 in ${!showBackBtn && "out"} absolute top-[-23px] icon h-12 bg-white/20 rounded-full flex items-center justify-center`}>
                <IoMdArrowBack className={`side text-[30px]`} />
            </button>}
            <Link to={'/dashboard'} onClick={()=>setcurrManu("Dashboard")} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaBook className={`${currManu === "Dashboard" ? `text-[35px]` : 'text-xl'}`} />
            </Link>
            <Link to={'/latestUpdate'} onClick={()=>setcurrManu("History")} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaHistory className={`${currManu === "History" ? `text-[35px]` : 'text-xl'}`} />
            </Link>
            <Link to={'/aboutme'} onClick={()=>setcurrManu("About")} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaUser className={`${currManu === "About" ? `text-[35px]` : 'text-xl'}`} />
            </Link>
        </div>
  )
}

export default Menu
