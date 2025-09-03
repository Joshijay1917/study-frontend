import { createContext, useState } from "react";


export const Store = createContext(null)

const storeProvider = (props) => {
    const [subjects, setsubjects] = useState([
        {id:1, name:"Digital Fundamentals"},
        {id:2, name:"DS"},
        {id:3, name:"PCE"}
    ])

    const contextValue = {
        subjects,
        setsubjects
    }

    return (
        <Store.Provider value={contextValue}>
            {props.children}
        </Store.Provider>
    )
}

export default storeProvider