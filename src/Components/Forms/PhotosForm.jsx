import React, { useEffect, useState } from 'react'
import { FaCamera } from 'react-icons/fa'
import { IoSend } from 'react-icons/io5'
import { MdCancel } from 'react-icons/md'
import { useUploadAssignmentPhotoMutation, useUploadLabPhotoMutation, useUploadNotePhotoMutation } from '../../Redux/Features/ApiSlice'
import { TbPdf } from 'react-icons/tb'
import { BiSolidFilePdf } from 'react-icons/bi'
import { useParams } from 'react-router-dom'

async function uploadPhoto(type, formData, uploadNotePhoto, uploadAssignmentPhoto, uploadLabPhoto) {
    if (type === "notes") return await uploadNotePhoto(formData)
    if (type === "assignment") return await uploadAssignmentPhoto(formData)
    if (type === "labmanual") return await uploadLabPhoto(formData)
}

const PhotosForm = ({ setphotoForm }) => {
    const { type, typeId } = useParams()
    const [photos, setphotos] = useState([])
    const [message, setmessage] = useState('')
    const [uploadNotePhoto, noteOptions] = useUploadNotePhotoMutation()
    const [uploadAssignmentPhoto, assiOptions] = useUploadAssignmentPhotoMutation()
    const [uploadLabPhoto, labOptions] = useUploadLabPhotoMutation()

    const handleChange = (e) => {
        const photo = e.target.files[0]
        if (photo) {
            setphotos(prev => [...prev, photo])
        }
    }

    const upload = async () => {
        if (!photos) {
            setmessage("No files found")
            return;
        }

        const formData = new FormData();
        formData.append(`${type.toLocaleLowerCase().trim()}Id`, typeId)
        photos.forEach(photo => formData.append("photos", photo))

        try {
            await uploadPhoto(type, formData, uploadNotePhoto, uploadAssignmentPhoto, uploadLabPhoto)
            setphotoForm(false)
        } catch (error) {
            setmessage(error?.data?.message || "Failed to upload photo!")
            console.error("Failed to upload photo! : ", error)
        }
    }

    return (
        <>
            <div className='flex justify-center items-center bg-black/50 top-0 w-full min-h-screen fixed'>
                <div className='bg-white rounded-2xl p-5 w-[80vw]'>
                    <div className='flex justify-between'>
                        <h1 className='text-2xl font-bold pb-5'>Photos</h1>
                        <MdCancel onClick={() => setphotoForm(false)} className='text-3xl mt-1 text-blue-500' />
                    </div>
                    {photos?.length !== 0 && <div className='overflow-auto flex gap-3 snap-x snap-mandatory'>{photos.map((photo, i) => (
                        <img
                            key={i}
                            src={URL.createObjectURL(photo)}
                            alt={`Captured ${i + 1}`}
                            className="w-full h-[75vh] snap-center my-3 rounded-lg border border-gray-500"
                        />
                    ))}</div>}
                    <div className='flex flex-col gap-3'>
                        <input id='takePhoto' onChange={handleChange} type="file" capture="environment" className='hidden' name='photos' multiple/>
                        <div className='flex gap-3 items-center'>
                            <label htmlFor="takePhoto" className='w-full'>
                                <div className='bg-green-600 text-center flex justify-center items-center gap-3 w-full font-semibold p-3 rounded-2xl text-white'><FaCamera /> Take Photos</div>
                            </label>
                            {photos?.length !== 0 && <IoSend onClick={() => upload()} className='bg-green-600 p-3 text-5xl text-white rounded-2xl' />}
                        </div>
                        {photos?.length === 0 && <button className='bg-red-500 w-full flex justify-center items-center gap-2 font-semibold p-3 rounded-2xl text-white'><BiSolidFilePdf className='text-2xl rounded-lg'/> Upload Pdf</button>}
                    </div>
                </div>
            </div>
            {(noteOptions.isLoading || assiOptions.isLoading || labOptions.isLoading) && <div className='fixed top-0 w-full h-full bg-black/50 flex justify-center items-center text-white font-bold text-3xl'>
                <p>Uploading...</p>
            </div>}
            {message && <div className='fixed top-0 w-full h-full bg-black/50 flex justify-center items-center font-bold text-xl'>
                <p className='p-3 bg-white rounded-2xl'>{message}</p>
            </div>}
        </>
    )
}

export default PhotosForm
