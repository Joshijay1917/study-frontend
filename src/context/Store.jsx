import { createContext, useEffect, useState } from "react";


export const Store = createContext(null)

const storeProvider = (props) => {
    const [subjects, setsubjects] = useState([])
    const [currSubject, setcurrSubject] = useState("")
    const [currDetail, setcurrDetail] = useState("")
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
                    console.error("Failed to get details of subject from backend")
                    return null;
                }
                if (require === "Notes") {
                    details.forEach(note => {
                        setnotesDetails(prev => [...prev, {
                            _id: note._id,
                            type: "Notes",
                            subject: currSubject._id,
                            require: `Unit - ${note.unit}: ${note.name}`,
                            photos: []
                        }])
                    });
                } else if(require === "Assignment") {
                    details.forEach(ass => {
                        setassDetails(prev => [...prev, {
                            _id: ass._id,
                            type: "Assignment",
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
                            type: "LabManual",
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

    const getPhotos = async (require) => {
        if(require !== '') {
            try {
                const strRes = await fetch(`http://localhost:3000/api/v1/${require.toLocaleLowerCase().trim()}/photos`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ detailId: currDetail._id})
                })
                const res = await strRes.json()

                if(!res || res.statusCode >= 400) {
                    console.error("Failed : ", res.message)
                    return null;
                }

                return res.data;
            } catch (error) {
                console.error("Failed to call backend" || error.message)
                return null;
            }
        }
    }

    const managePhotos = async (photo) => {
        if(!currDetail) {
            return null;
        }

        if(currDetail.type === "Notes") {
            const note = notesDetails.find(note => note._id === currDetail._id)
            if(!note) {
                console.error("Failed to find note")
                return null;
            }
            if(photo) {
                note.photos.push(photo)
                return note;
            }
            if(note.photos.length === 0) {
                const photos = await getPhotos("Notes")
                if(!photos) {
                    console.error("Photos of this notes not found")
                    return null;
                }
                note.photos.push(...photos)
            }
            return note;
        } else if(currDetail.type === "Assignment") {
            const ass = assDetails.find(ass => ass._id === currDetail._id)
            if(!ass) {
                console.error("Failed to find assignment")
                return null;
            }
            if(photo) {
                ass.photos.push(photo)
                return ass;
            }
            if(ass.photos.length === 0) {
                const photos = await getPhotos("Assignment")
                if(!photos) {
                    console.error("Photos of this assignments not found")
                    return null;
                }
                ass.photos.push(...photos)
            }
            return ass;
        } else {
            const lab = labDetails.find(lab => lab._id === currDetail._id)
            if(!lab) {
                console.error("Failed to find lab manual")
                return null;
            }
            if(photo) {
                lab.photos.push(photo)
                return lab;
            }
            if(lab.photos.length === 0) {
                const photos = await getPhotos("LabManual")
                if(!photos) {
                    console.error("Photos of this lab manual not found")
                    return null;
                }
                lab.photos.push(...photos)
            }
            return lab;
        }
    }

    
    const contextValue = {
        subjects,
        currSubject,
        notesDetails,
        assDetails,
        labDetails,
        currDetail,
        setsubjects,
        setcurrSubject,
        setnotesDetails,
        setassDetails,
        setlabDetails,
        setcurrDetail,

        manageDetails,
        checkAndAddDetails,
        managePhotos
    }

    return (
        <Store.Provider value={contextValue}>
            {props.children}
        </Store.Provider>
    )
}

export default storeProvider