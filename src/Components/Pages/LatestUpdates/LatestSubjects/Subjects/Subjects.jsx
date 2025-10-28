import { FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Subjects = ({latestSubjects, record}) => {
    const navigate = useNavigate()

    const handleClick = (subject) => {
        navigate(`/latestUpdate/${record._id}/${subject._id}`)
    }

    return (
        <>
        <div className="p-5">
            <h1 className="text-3xl px-2 mt-5 font-bold text-gray-800">Latest Subjects</h1>
            {!latestSubjects || latestSubjects.length === 0 && <p className='text-center pt-5'>No Subjects are available!</p>}
            {latestSubjects && latestSubjects.map(sub => (
                <div key={sub._id} onClick={() => handleClick(sub)} className='mt-5 cursor-pointer shadow-lg border border-gray-300 p-3 font-semibold relative pl-7 bg-[#2222] rounded-2xl'>
                    <div className='absolute bg-blue-800 left-0 ml-2 h-full top-0 p-1 rounded-l-xl'></div>
                    <p className='name text-xl overflow-clip'>{sub.name.replace(/\b\w/g, char => char.toUpperCase())}</p>
                    <div className='flex gap-3'>
                        <p>Sem: {sub.sem}</p>
                        <p>Branch: {sub.branch}</p>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}

export default Subjects
