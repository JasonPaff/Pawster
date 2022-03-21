import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()

const handleSaveUser = (user) => {
    fetch('#', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(user) 
    }).then(response => response.json())
    .then(result => {
        navigate("/")

    })
}

export default handleSaveUser