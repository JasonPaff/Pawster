import React, { useEffect, useState } from 'react'
import deleteVisit from '../../../services/visit/deleteVisit'
import getHost from '../../../services/host/getHost'


export default function DeleteServiceButton() {

    const [host, setHost] = useState({})

    

    useEffect(() => {
        getHost().then((result) => {setHost(result.data.getHost.host)})
    }, [])
    
    setHost({
        ...host,
        doesDropInVisits: false
    })

    async function handleUpdateHost() {
        const response = await updateHost(host)
        console.log(response)
        if (response.data.updateHost.success) {
            console.log("Host Updated")
        } else {
            alert(response.data.updateHost.message);
        }
    }

    
    async function handleDeleteService() {
        const response = await deleteVisit();
        if (response.data.deleteVisit.success) {
            console.log(host)
            handleUpdateHost()
            navigate('/profile')
        } else {
            alert(response.data.deleteVisit.message);
        }
    }

    return (
        <button onClick={handleDeleteService}>Deactivate Service</button>
    )
}