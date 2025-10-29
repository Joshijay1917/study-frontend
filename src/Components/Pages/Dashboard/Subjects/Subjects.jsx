import { FaPlus } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDeleteSubjectMutation } from '../../../../Redux/Features/ApiSlice'
import { useEffect } from 'react'

const Subjects = ({setaddSubForm, data, setLoading}) => {
    const navigate = useNavigate()
    const user = useSelector(state => (state.user.user))
    const [deleteSubject, deleteSubjectOptions] = useDeleteSubjectMutation()

    const handleClick = (subject) => {
        navigate(`/dashboard/${subject._id}`)
    }

    const handleDelete = async (sub) => {
        try {
            await deleteSubject({subjectId:sub._id}).unwrap()
        } catch (error) {
            console.error("Err:", error)
        }
    }

    useEffect(() => {
      setLoading(deleteSubjectOptions.isLoading)
    }, [deleteSubjectOptions.isLoading])
    

    return (
        <>
        <div className="p-5">
            <h1 className="text-3xl px-2 mt-5 font-bold text-gray-800">Subjects</h1>
            {!data?.data || data?.data?.length === 0 && <p className='text-center pt-5'>No Subjects are available!</p>}
            {data?.data && data.data.map(sub => (
                <div key={sub._id} onClick={() => handleClick(sub)} className='mt-5 cursor-pointer shadow-lg border flex items-center justify-between border-gray-300 p-3 font-semibold relative pl-7 bg-[#1111] rounded-2xl'>
                    <div className='absolute bg-blue-800 left-0 ml-2 h-full top-0 p-1 rounded-l-xl'></div>
                    <div className='w-[95%] overflow-clip'>
                    <p className='name text-xl overflow-clip'>{sub.name.replace(/\b\w/g, char => char.toUpperCase())}</p>
                    <div className='flex gap-3'>
                        <p>Sem: {sub.sem}</p>
                        <p>Branch: {sub.branch}</p>
                    </div>
                    </div>
                    {user.username === 'admin' && <button onClick={(e) => {e.stopPropagation();handleDelete(sub)}}><MdDelete className='text-2xl z-10 text-red-400'/></button>}
                </div>
            ))}
            {user.username === 'admin' && <div className='flex flex-col gap-2 items-center mt-10'>
                <p className='font-bold text-xl'>Add Subjects</p>
                <button onClick={() => setaddSubForm(true)} className='flex w-fit items-center justify-center bg-blue-400 px-10 p-2 rounded-2xl text-white'><FaPlus /> Add</button>
            </div>}
        </div>
        </>
    )
}

export default Subjects
