import { createContext, useEffect, useState } from "react";


export const Store = createContext(null)

const storeProvider = (props) => {
    const [subjects, setsubjects] = useState([])
    const [currSubject, setcurrSubject] = useState("")
    const [currRequirement, setcurrRequirement] = useState("Notes")
    const [photos, setphotos] = useState([])
    const [things, setthings] = useState([])
    const [form, setform] = useState(false)
    // const [currentStatus, setcurrentStatus] = useState([])

    useEffect(() => {
        getAllSubjects()
    }, [])

    useEffect(() => {
        getRequires();
    }, [currRequirement])


    const getAllSubjects = async () => {
        try {
            const strRes = await fetch('http://localhost:3000/api/v1/subject/getAll')
            const res = await strRes.json()

            if (!res || res.statusCode >= 400) {
                console.error("Failed to get subjects from database")
                return;
            }

            setsubjects(res.data)
        } catch (error) {
            console.error("Failed to fetch subjects in backend : ", error)
        }
    }

    const getRequires = async () => {
        if (currRequirement !== "") {

            try {
                const url = `http://localhost:3000/api/v1/${currRequirement.toLocaleLowerCase().trim()}/getAll`
                const strRes = await fetch(url)
                const res = await strRes.json()

                if (!res || res.statusCode >= 400) {
                    console.error("Failed to get requiresments : ", res.message)
                }

                setthings(res.data)
            } catch (error) {
                console.error("failed to fetch requirements in database : ", error)
            }
        }
    }


    const contextValue = {
        subjects,
        currSubject,
        currRequirement,
        photos,
        things,
        form,
        setsubjects,
        setcurrSubject,
        setcurrRequirement,
        setphotos,
        setthings,
        setform
    }

    return (
        <Store.Provider value={contextValue}>
            {props.children}
        </Store.Provider>
    )
}

export default storeProvider