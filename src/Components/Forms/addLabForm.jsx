import React, { useState } from 'react'
import { useAddLabManualMutation } from '../../Redux/Features/ApiSlice'
import { useParams } from 'react-router-dom'
import { GiCancel } from 'react-icons/gi'
import Loading from '../Pages/Loading/Loading'

const addLabForm = ({ setlabform }) => {
    const [addLabManual, { isLoading }] = useAddLabManualMutation()
    const { subjectId } = useParams()
    const [formData, setformData] = useState({
        name: '',
        subjectId: subjectId
    })
    const [err, seterr] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target

        setformData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.name === '') {
            seterr("Please Enter the Name of the lab manual")
            return;
        }
        if (!formData.subjectId) {
            seterr("Subject of this lab manual is not found")
            return;
        }

        seterr('')

        try {
            await addLabManual(formData).unwrap()
            setlabform(false)
        } catch (error) {
            console.error("err:", error)
            seterr(error?.data?.message || "Faild to add lab manual!!")
        }
    }
    return (
        <>
            <div className='min-h-screen w-full flex justify-center items-center bg-black/50 absolute top-0'>
                <form onSubmit={handleSubmit} className='bg-white p-8 m-3 w-[95vw] rounded-2xl'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-2xl font-bold underline decoration-blue-600 decoration-5 underline-offset-10'>Add Lab Manual</h1>
                        <GiCancel onClick={() => setlabform(false)} className='text-[27px] mt-3 text-blue-800' />
                    </div>
                    <div className='m-3 mt-10 gap-3 flex flex-col w-full'>
                        <div className='flex gap-3 items-center justify-between w-full'>
                            <label htmlFor="name">Name</label>
                            <input name='name' onChange={handleChange} className='bg-[#6666]/70 p-3 w-[80%] rounded-2xl' type="text" placeholder='Name of lab manual (i.e. pce lab manual)' />
                        </div>
                    </div>
                    {err && <p className='text-center text-red-600 font-semibold'>{err}</p>}
                    <button type='submit' className='flex w-fit mt-8 mx-auto bg-blue-400 px-10 p-2 rounded-2xl text-white'>Add Lab Manual</button>
                </form>
            </div>
            {isLoading && <Loading />}
        </>
    )
}

export default addLabForm
