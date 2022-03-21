import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../css/Authenticate.css"

function Register() {

    const [user, setUser] = useState({})

    const navigate = useNavigate()

    const handleTextChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSaveUser = () => {
        fetch('https://lefties.herokuapp.com/register', {
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

    return(
        <div className="registerContainer">
            <div className="registerInput">
                <h1>Register</h1>
                <input type="text" placeholder="Email" name="email" onChange={handleTextChange}/>
                <input type="text" placeholder="Username" name="username" onChange={handleTextChange}/>
                <input type="password" placeholder="Password" name="password" onChange={handleTextChange}/>
                <button onClick={handleSaveUser}>Create Account</button>
            </div>
          
        </div>
    )
}

export default Register