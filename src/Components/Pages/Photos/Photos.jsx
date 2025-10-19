import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../../../context/Store'
import { useParams } from 'react-router-dom'

const Photos = () => {
    const [file, setfile] = useState(null)
    const [Loading, setLoading] = useState(false)
    const [message, setmessage] = useState("")
    const [photos, setphotos] = useState([])
    const storeData = useContext(Store)
    const { detailId } = useParams()

    useEffect(() => {
        loadPhotos()
    }, [])

    console.log("Photos : ", storeData.currDetail);


    useEffect(() => {
        if (file) {
            upload()
        }
    }, [file])

    const loadPhotos = async (req, res) => {
        const data = await storeData.managePhotos()
        if (data) {
            setphotos(data.photos)
        }
    }

    const handleChange = (e) => {
        const photo = e.target.files[0]
        if (photo) {
            setfile(photo)
        }
    }

    const upload = async () => {
        setLoading(true)
        if (!file) {
            setLoading(false)
            setmessage("No files found")
            return;
        }

        const formData = new FormData();
        formData.append(`${storeData.currDetail.type.toLocaleLowerCase().trim()}Id`, detailId)
        formData.append('photo', file)

        try {
            const strRes = await fetch(`http://localhost:3000/api/v1/${storeData.currDetail.type.toLocaleLowerCase().trim()}/upload`, {
                method: 'POST',
                body: formData
            })
            const res = await strRes.json()

            if (!res || res.statusCode >= 400) {
                setmessage(res.message || "Failed to upload photo")
            }

            console.log("Res: ", res);

            const photo = res.data
            storeData.managePhotos(photo)
            setLoading(false)
            setmessage("")
        } catch (error) {
            console.error("failed to call backend to add photo" || error)
            setmessage("failed to call backend to add photo" || error)
        }
    }

    return (
        <>
            <div className="flex-1 relative">
                <div className="absolute inset-y-0 top-[12%] left-0 right-0 bg-white rounded-tl-[80px] rounded-tr-[0px] shadow-lg overflow-auto">
                    <div className='p-7 bg-white'>
                        <h1 className='text-2xl my-5 font-bold text-gray-800'>{storeData.currSubject.name.toUpperCase()} / {storeData.currDetail.require}</h1>
                        {photos.length > 0 && <div className='w-full flex justify-end'>
                            <button className='btn bg-red-500 text-white'>Download PDF</button>
                        </div>}
                        <div className='flex flex-col gap-5'>
                            {photos.map(photo => (
                                <img key={photo._id} src={photo.url} />
                            ))}
                        </div>
                        <input id='takePhoto' onChange={handleChange} type="file" capture="environment" className='hidden' />
                        <label htmlFor="takePhoto">
                            {/* <img width={100} height={100} className='fixed bottom-0 rounded-full m-5 right-0 z-30' src='https://static.vecteezy.com/system/resources/previews/045/792/293/original/camera-icon-simple-icon-quality-interface-vector.jpg' alt="Camera" /> */}
                            <img width={100} height={100} className='fixed bottom-0 rounded-full m-5 right-0 z-30' src='../../camera-icon.jpg' alt="Camera" />
                        </label>
                    </div>
                </div>
            </div>
            {Loading && <div className='fixed top-0 w-full h-full bg-black/50 flex justify-center items-center text-white font-bold text-3xl'>
                <p>Uploading...</p>
            </div>}
            {message && <div className='fixed top-0 w-full h-full bg-black/50 flex justify-center items-center font-bold text-xl'>
                <p className='p-3 bg-white rounded-2xl'>{message}</p>
            </div>}
        </>
    )
}

export default Photos
