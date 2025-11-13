import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


export default function Protected({children, authentication = true }) {
    const nevigate = useNavigate()
    const [loader, setloader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        if (authentication && authStatus !== authentication) {
            nevigate("/login")
        }else if (!authentication && authStatus !== authentication) {
            nevigate("/")
        }
        setloader(false)
    }, [authStatus,authentication,nevigate]);

    return loader ? <h1>Loading...</h1>:<>{children}</>
}

