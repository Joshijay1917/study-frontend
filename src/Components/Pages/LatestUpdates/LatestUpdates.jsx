import React from 'react'
import { useGetLatestUpdatesQuery } from '../../../Redux/Features/ApiSlice'
import Loading from '../Loading/Loading'
import { useNavigate } from 'react-router-dom'
import { MdReportProblem } from 'react-icons/md'

const LatestUpdates = () => {
  const { data, isLoading } = useGetLatestUpdatesQuery()
  const navigate = useNavigate()

  const handleClick = (update) => {
    navigate(`/latestUpdate/${update._id}`)
  }

  const dateFormate = (date) => {
    const origDate = new Date(date)
    console.log("date=", origDate.getDate());
    return `${origDate.getDate()}/${origDate.getMonth() + 1}/${origDate.getFullYear()}`
  }

  return (
    <>
    <div className="flex-1 relative">
      <div className="absolute inset-y-0 top-[12%] left-0 right-0 bg-white rounded-tl-[80px] rounded-tr-[0px] shadow-lg overflow-auto">
        <div className='p-7'>
          <h1 className='text-3xl mt-5 font-bold text-gray-800'>Latest Updates</h1>
          {!data?.data && <p className='text-red-500 flex items-center gap-2 font-semibold text-nowrap justify-center py-10'><MdReportProblem className='text-yellow-600 text-2xl'/> No Updates are available!! <MdReportProblem className='text-yellow-600 text-2xl'/></p>}
          {data?.data && data.data.map(update => (
            <div key={update._id} onClick={()=>handleClick(update)} className='mt-5 cursor-pointer p-3 font-semibold relative pl-7 bg-[#2222] rounded-2xl'>
                    <div className='absolute bg-blue-800 left-0 ml-2 h-full top-0 p-1 rounded-l-xl'></div>
                    <p className='name text-xl'>{dateFormate(update.date)}</p>
                    <p className='w-[90%] flex gap-2 overflow-clip'>Subjects: {update.subjects.map(sub => (<span key={sub._id}>{sub.name}</span>))}</p>
                </div>
          ))}
        </div>
      </div>
    </div>
    {isLoading && <Loading />}
    </>
  )
}

export default LatestUpdates
