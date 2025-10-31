import React, { useEffect, useState } from 'react'
import { useDeleteOnePhotoAssiMutation, useDeleteOnePhotoLabMutation, useDeleteOnePhotoNotesMutation, useGetAllSubjectsQuery } from '../../../Redux/Features/ApiSlice'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { fetchSubjectData } from '../../../Redux/CustomHook/fetchSubjectData'
import { getTypeDetails } from '../../../Redux/CustomHook/GetTypeDetails'
import { useSelector } from 'react-redux'
import { FaCloudUploadAlt } from 'react-icons/fa'
import PhotosForm from '../../Forms/PhotosForm'
import { MdDelete } from 'react-icons/md'

async function deletePhoto(type, deleteOnePhotoNotes, deleteOnePhotoAssi, deleteOnePhotoLab, photo) {
    if (type === "notes") return await deleteOnePhotoNotes({publicId:photo.public_id})
    if (type === "assignment") return await deleteOnePhotoAssi({publicId:photo.public_id})
    if (type === "labmanual") return await deleteOnePhotoLab({publicId:photo.public_id})
}

const Photos = () => {
    const [title, settitle] = useState('')
    const [photoForm, setphotoForm] = useState(false)
    const user = useSelector(state => (state.user.user))
    const { subjectId, type, typeId } = useParams()
    const { data, isLoading } = fetchSubjectData(type, typeId)
    const [deleteOnePhotoNotes, deleteOnePhotoNotesOptions] = useDeleteOnePhotoNotesMutation()
    const [deleteOnePhotoAssi, deleteOnePhotoAssiOptions] = useDeleteOnePhotoAssiMutation()
    const [deleteOnePhotoLab, deleteOnePhotoLabOptions] = useDeleteOnePhotoLabMutation()
    const subjects = useGetAllSubjectsQuery()
    const subject = subjects.data.data.find(sub => sub._id === subjectId)
    let typeDetail = getTypeDetails(type, subjectId);

    useEffect(() => {
        if (data) {
            if (type === "notes") settitle(`Unit ${typeDetail.data.data[0].unit}: ${typeDetail.data.data[0].name}`)
            if (type === "assignment") settitle(`Assignment - ${typeDetail.data.data[0].number}`)
            if (type === "labmanual") settitle(`${typeDetail.data.data[0].name}`)
        }
    }, [data])

    const photoDelete = async (photo) => {
        try {
            await deletePhoto(type, deleteOnePhotoNotes, deleteOnePhotoAssi, deleteOnePhotoLab, photo)
        } catch (error) {
            console.error("failed to delete photo! Err:", error)
        }
    }

    console.log("tit=", title);

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
                                <div className='relative border border-gray-400' key={photo._id}>
                                    {user.username === 'admin' && <MdDelete onClick={()=>photoDelete(photo)} className='text-3xl absolute right-0 m-3 text-red-500' />}
                                    <img src={photo.url} />
                                </div>
                            ))}
                        </div>
                        {user.username === 'admin' && !photoForm && <div onClick={() => setphotoForm(true)} className='fixed bg-gray-300 p-3 m-4 rounded-full bottom-0 right-0'>
                            <FaCloudUploadAlt className='text-6xl text-blue-500' />
                        </div>}
                    </div>
                </div>
            </div>
            {photoForm && <PhotosForm setphotoForm={setphotoForm} />}
            {(isLoading || deleteOnePhotoNotesOptions.isLoading || deleteOnePhotoAssiOptions.isLoading || deleteOnePhotoLabOptions.isLoading) && <Loading />}
        </>
    )
}

export default Photos
