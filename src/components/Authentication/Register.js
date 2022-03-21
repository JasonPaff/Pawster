import React, { useState } from 'react'
import handleSaveUser from '../../services/authentication/register'

function Register() {

    const [user, setUser] = useState({})


    const handleTextChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }


    return(
        <div className="registerContainer">
            <div className="registerInput">
                <h1>Register</h1>
                <input type="text" placeholder="Email" name="email" onChange={handleTextChange}/>
                <input type="text" placeholder="Username" name="username" onChange={handleTextChange}/>
                <input type="password" placeholder="Password" name="password" onChange={handleTextChange}/>
                <button onClick={handleSaveUser(user)}>Create Account</button>
            </div>
          
        </div>
    )
}

export default Register