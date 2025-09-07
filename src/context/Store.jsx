import { createContext, useEffect, useState } from "react";


export const Store = createContext(null)

const storeProvider = (props) => {
    const [subjects, setsubjects] = useState([])
    const [currSubject, setcurrSubject] = useState("")
    const [notesDetails, setnotesDetails] = useState([])
    const [assDetails, setassDetails] = useState([])
    const [labDetails, setlabDetails] = useState([])
    // const [currentStatus, setcurrentStatus] = useState([])

    useEffect(() => {
        getAllSubjects()
    }, [])

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

    const getRequires = async (require) => {
        if (require !== "") {
            try {
                const url = `http://localhost:3000/api/v1/${require.toLocaleLowerCase().trim()}/getAll`
                const strRes = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ subjectId: currSubject._id })
                })
                const res = await strRes.json()

                if (!res || res.statusCode >= 400) {
                    console.error("Failed to get requiresments : ", res.message)
                    return null
                }

                return res.data
            } catch (error) {
                console.error("failed to fetch requirements in database : ", error)
                return null
            }
        }
        return null
    }

    const manageDetails = async (require) => {
        if (currSubject) {
            try {
                const details = await getRequires(require)
                // console.log("SEND:", subject.name);
                console.log("Details : ", details, require);
                if (!details) {
                    console.error("Failed to get details of subjects from backend")
                    return null;
                }
                if (require === "Notes") {
                    details.forEach(note => {
                        setnotesDetails(prev => [...prev, {
                            _id: note._id,
                            subject: currSubject._id,
                            unit: note.unit,
                            name: note.name,
                            photos: []
                        }])
                    });
                } else if(require === "Assignment") {
                    details.forEach(ass => {
                        setassDetails(prev => [...prev, {
                            _id: ass._id,
                            subject: currSubject._id,
                            require: `Assignment - ${ass.number}`,
                            deadline: ass.deadline,
                            photos: []
                        }])
                    });
                } else {
                    details.forEach(lab => {
                        setlabDetails(prev => [...prev, {
                            _id: lab._id,
                            subject: currSubject._id,
                            require: `${lab.name}`,
                            photos: []
                        }])
                    });
                }
            } catch (error) {
                console.log("Failed to modify array : ", error);
            }
        }
        return null
    }

    const checkAndAddDetails = async (require) => {
        if(require === "Notes") {
            if(notesDetails.length !== 0) {
                const check = notesDetails.find(note => note.subject === currSubject._id)
                if(check) {
                    return;
                }
                manageDetails("Notes")
                return;
            }
            manageDetails("Notes")
            return;
        } else if(require === "Assignments") {
            if(assDetails.length !== 0) {
                const check = assDetails.find(ass => ass.subject === currSubject._id)
                
                if(check) {
                    return;
                }
                manageDetails("Assignment")
                return;
            }
            manageDetails("Assignment")
            return;
        } else if(require === "Lab Manual") {
            if(labDetails.length !== 0) {
                console.log("Check:", currSubject.name);
                const check = labDetails.find(lab => lab.subject === currSubject._id)
                if(check) {
                    return;
                }
                manageDetails("LabManual")
                return;
            }
            manageDetails("LabManual")
            return;
        }
    }


    const contextValue = {
        subjects,
        currSubject,
        notesDetails,
        assDetails,
        labDetails,
        setsubjects,
        setcurrSubject,
        setnotesDetails,
        setassDetails,
        setlabDetails,

        manageDetails,
        checkAndAddDetails
    }

    return (
        <Store.Provider value={contextValue}>
            {props.children}
        </Store.Provider>
    )
}

export default storeProvider