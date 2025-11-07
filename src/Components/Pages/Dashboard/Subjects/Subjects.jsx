import { FaBook, FaPlus, FaSearch } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDeleteSubjectMutation } from '../../../../Redux/Features/ApiSlice'
import { useEffect, useState } from 'react'
import "./Subjects.css"
import { IoSearchOutline } from 'react-icons/io5'

const Subjects = ({ setLoggedIn, setaddSubForm, data, setLoading }) => {
    const navigate = useNavigate()
    const user = useSelector(state => (state.user.user))
    const [deleteSubject, deleteSubjectOptions] = useDeleteSubjectMutation()
    const [subjects, setsubjects] = useState([])
    const [filters, setfilters] = useState(false)
    const [filtersAnim, setfiltersAnim] = useState(false)

    const handleClick = (subject) => {
        navigate(`/dashboard/${subject._id}`)
    }

    const handleDelete = async (sub) => {
        try {
            await deleteSubject({ subjectId: sub._id }).unwrap()
        } catch (error) {
            console.error("Err:", error)
        }
    }

    const handleSearch = (e) => {
        const find = e.target.value.toLowerCase()

        if (!data?.data?.length) return;

        if (find) {
            setsubjects(data.data.filter(sub => sub.name.includes(find)))
        } else {
            setsubjects(data.data)
        }
    }

    useEffect(() => {
        setLoading(deleteSubjectOptions.isLoading)
    }, [deleteSubjectOptions.isLoading])

    useEffect(() => {
        if (!user) {
            setLoggedIn(false)
            navigate('/login')
        }
    }, [])

    useEffect(() => {
        if (data?.data) {
            setsubjects(data.data)
        }
    }, [data])

    return (
        <>
            <div className="p-5">
                <div className='px-2 select-none mt-5 text-3xl flex items-center gap-3'>
                <FaBook className='icon-theme'/>
                <h1 className="font-bold text-gray-800">Subjects</h1>
                </div>
                <div className='flex mt-5 items-center gap-3'>
                    <input onChange={handleSearch} className='bg-[#1111] border outline-0 border-gray-300 w-full rounded-2xl p-2' placeholder='Search Subject' />
                    <IoSearchOutline className='text-[43px] bg-[#1111] p-2 rounded-xl border border-gray-300' />
                </div>
                {(!subjects || subjects.length === 0) && <p className='text-center pt-5 text-red-500'>No Subjects are available!</p>}
                {subjects && subjects.map(sub => (
                    <div key={sub._id} onClick={() => handleClick(sub)} className='mt-5 cursor-pointer shadow-lg border flex items-center justify-between border-gray-300 p-3 font-semibold relative pl-7 bg-[#1111] rounded-2xl'>
                        <div className='absolute bg-theme left-0 ml-2 h-full top-0 p-1 rounded-l-xl'></div>
                        <div className='w-[95%] overflow-clip'>
                            <p className='name text-xl overflow-clip'>{sub.name.replace(/\b\w/g, char => char.toUpperCase())}</p>
                            <div className='flex gap-3'>
                                <p>Sem: {sub.sem}</p>
                                <p>Branch: {sub.branch}</p>
                            </div>
                        </div>
                        {user?.username === 'admin' && <button onClick={(e) => { e.stopPropagation(); handleDelete(sub) }}><MdDelete className='text-2xl z-10 text-red-400' /></button>}
                    </div>
                ))}
                {user?.username === 'admin' && <div className='flex flex-col gap-2 items-center mt-10'>
                    <p className='font-bold text-xl'>Add Subjects</p>
                    <button onClick={() => setaddSubForm(true)} className='flex w-fit items-center justify-center bg-theme px-10 p-2 rounded-2xl text-white'><FaPlus /> Add</button>
                </div>}
            </div>
        </>
    )
}

export default Subjects
