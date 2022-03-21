import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionCreators from '../store/creators/actionCreators'

function Login(props) {

    const [user, setUser] = useState({})

    useEffect(() => {
        setUser({
            username:"guest",
            password:"password"
        })
    }, [])

    const handleTextChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    
    const navigate = useNavigate()

    const handleLoginUser = () => {
        fetch('#', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(user) 
        }).then(response => response.json())
        .then(result => {
            if(result.success) {
                // saving userId, token, and username to localStorage
                const token = result.token
                const userId = result.user_id
                localStorage.setItem('jsonwebtoken', token)
                localStorage.setItem('userId', userId)
                // Get username from local state
                localStorage.setItem('username', user.username)
                props.onLogin(token)
                navigate("/")

            } else {
                // display error message
                console.log("Authentication Failed")
            }

        })
    }

    return (
        <div className="registerContainer">
            <div className="registerInput">
                <h1>Login</h1>
                <input type="text" placeholder="Username" name="username" onChange={handleTextChange}/>
                <input type="password" placeholder="Password" name="password" onChange={handleTextChange}/>
                <button onClick={handleLoginUser}>Login</button>
                <button className="guestBtn" onClick={handleLoginUser}>Guest Login</button>
            </div>
        </div>

    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (token) => dispatch(actionCreators.login(token))
    }
}

export default connect(null, mapDispatchToProps)(Login)