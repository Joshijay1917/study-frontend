import React, { useEffect, useState } from 'react'
import { useGetAllSubjectsQuery, useUploadAssignmentPhotoMutation, useUploadLabPhotoMutation, useUploadNotePhotoMutation } from '../../../Redux/Features/ApiSlice'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { fetchSubjectData } from '../../../Redux/CustomHook/fetchSubjectData'
import { getTypeDetails } from '../../../Redux/CustomHook/GetTypeDetails'
import { useSelector } from 'react-redux'

async function uploadPhoto(type, formData, uploadNotePhoto, uploadAssignmentPhoto, uploadLabPhoto) {
    if (type === "notes") return await uploadNotePhoto(formData)
    if (type === "assignment") return await uploadAssignmentPhoto(formData)
    if (type === "labmanual") return await uploadLabPhoto(formData)
}

const Photos = () => {
    const [message, setmessage] = useState('')
    const [file, setfile] = useState(null)
    const [title, settitle] = useState('')
    const user = useSelector(state => (state.user.user))
    const { subjectId, type, typeId } = useParams()
    const { data, isLoading } = fetchSubjectData(type, typeId)
    const subjects = useGetAllSubjectsQuery()
    const [uploadNotePhoto, noteOptions] = useUploadNotePhotoMutation()
    const [uploadAssignmentPhoto, assiOptions] = useUploadAssignmentPhotoMutation()
    const [uploadLabPhoto, labOptions] = useUploadLabPhotoMutation()
    const subject = subjects.data.data.find(sub => sub._id === subjectId)
    let typeDetail = getTypeDetails(type, subjectId);

    useEffect(() => {
        if (data) {
            if (type === "notes") settitle(`Unit ${typeDetail.data.data[0].unit}: ${typeDetail.data.data[0].name}`)
            if (type === "assignment") settitle(`Assignment - ${typeDetail.data.data[0].number}`)
            if (type === "labmanual") settitle(`${typeDetail.data.data[0].name}`)
        }
    }, [data])

    console.log("tit=", title);

    const handleChange = (e) => {
        const photo = e.target.files[0]
        if (photo) {
            setfile(photo)
        }
    }

    useEffect(() => {
        if (file) {
            upload()
        }
    }, [file])

    const upload = async () => {
        if (!file) {
            setmessage("No files found")
            return;
        }

        const formData = new FormData();
        formData.append(`${type.toLocaleLowerCase().trim()}Id`, typeId)
        formData.append('photo', file)

        try {
            await uploadPhoto(type, formData, uploadNotePhoto, uploadAssignmentPhoto, uploadLabPhoto)
        } catch (error) {
            setmessage(error?.data?.message || "Failed to upload photo!")
            console.error("Failed to upload photo! : ", error)
        }
    }

    return (
        <>
            <div className="flex-1 relative">
                <div className="absolute inset-y-0 top-[12%] left-0 right-0 bg-white rounded-tl-[80px] rounded-tr-[0px] shadow-lg overflow-auto">
                    <div className=' p-2 bg-white'>
                        <div className='my-5 p-4 flex justify-between items-center'>
                            <div>
                                <h1 className='text-[17px] font-bold text-gray-800'>{subject.name.toUpperCase()}</h1>
                                <p className='font-medium text-[13px]'>{title}</p>
                            </div>
                            {data?.data && data.data.length > 0 && <div className='text-xs'>
                                <button className='btn bg-red-500 text-white'>Download PDF</button>
                            </div>}
                        </div>
                        <div className='flex flex-col gap-5'>
                            {data?.data && data.data.map(photo => (
                                <img key={photo._id} src={photo.url} />
                            ))}
                        </div>
                        {user.username === 'admin' && <> <input id='takePhoto' onChange={handleChange} type="file" capture="environment" className='hidden' />
                            <label htmlFor="takePhoto">
                                {/* <img width={100} height={100} className='fixed bottom-0 rounded-full m-5 right-0 z-30' src='https://static.vecteezy.com/system/resources/previews/045/792/293/original/camera-icon-simple-icon-quality-interface-vector.jpg' alt="Camera" /> */}
                                <img width={100} height={100} className='fixed bottom-0 rounded-full m-5 right-0 z-30' src='../../../camera-icon.jpg' alt="Camera" />
                            </label></>}
                    </div>
                </div>
            </div>
            {(noteOptions.isLoading || assiOptions.isLoading || labOptions.isLoading) && <div className='fixed top-0 w-full h-full bg-black/50 flex justify-center items-center text-white font-bold text-3xl'>
                <p>Uploading...</p>
            </div>}
            {message && <div className='fixed top-0 w-full h-full bg-black/50 flex justify-center items-center font-bold text-xl'>
                <p className='p-3 bg-white rounded-2xl'>{message}</p>
            </div>}
            {isLoading && <Loading />}
        </>
    )
}

export default Photos
