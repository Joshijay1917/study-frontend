import React, { useEffect, useState } from 'react'
import { useGetAllSubjectsQuery } from '../../../../Redux/Features/ApiSlice'
import { useParams } from 'react-router-dom'
import Loading from '../../Loading/Loading'
import { useGetLatestUpdatesQuery } from '../../../../Redux/Features/ApiSlice'

function getTypeDetails(type, record, typeId) {
    let targetArray = [];
    if (type === "notes") targetArray = record.notes
    if (type === "assignment") targetArray = record.assignments
    if (type === "labmanual") targetArray = record.labmanual

    return targetArray.find(rec => rec.typeId === typeId)
}

const Photos = () => {
    const [message, setmessage] = useState('')
    const [title, settitle] = useState('')
    const [record, setrecord] = useState(null)
    const [typeDetail, settypeDetail] = useState(null)
    const { updateId, subjectId, type, typeId } = useParams()
    const subjects = useGetAllSubjectsQuery()
    const { data, isLoading } = useGetLatestUpdatesQuery()
    const subject = subjects.data.data.find(sub => sub._id === subjectId)

    useEffect(() => {
        if (typeDetail) {
            if (type === "notes") settitle(typeDetail.title)
            if (type === "assignment") settitle(typeDetail.title)
            if (type === "labmanual") settitle(typeDetail.title)
        }
    }, [typeDetail])

    useEffect(() => {
        if (data) {
            setrecord(data.data.find(rec => rec._id === updateId))
            if(record) {
                settypeDetail(getTypeDetails(type, record, typeId))
            }
        }
    }, [data, record])

    console.log("tit=", typeDetail);

    return (
        <>
            <div className="flex-1 relative">
                <div className="absolute inset-y-0 top-[12%] left-0 right-0 app-pages-theme rounded-tl-[80px] rounded-tr-[0px] shadow-lg overflow-auto">
                    <div className=' p-2 app-pages-theme'>
                        <div className='my-5 p-4 flex justify-between items-center'>
                            <div>
                                <h1 className='text-[17px] font-bold text-gray-800'>{subject.name.toUpperCase()}</h1>
                                <p className='font-medium text-[13px]'>{title}</p>
                            </div>
                            {(typeDetail?.photos && typeDetail.photos.length) > 0  && <div className='text-xs'>
                                <button className='btn bg-red-500 text-white'>Download PDF</button>
                            </div>}
                        </div>
                        <div className='flex flex-col gap-5'>
                            {typeDetail?.photos && typeDetail?.photos.map((photo, index) => (
                                <img key={index} src={photo} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {message && <div className='fixed top-0 w-full h-full bg-black/50 flex justify-center items-center font-bold text-xl'>
                <p className='p-3 bg-white rounded-2xl'>{message}</p>
            </div>}
            {isLoading && <Loading />}
        </>
    )
}

export default Photos
