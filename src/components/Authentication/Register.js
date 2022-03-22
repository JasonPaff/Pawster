import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import createAccount from "../../services/authentication/register";

export default function Register() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate()

    async function handleCreateAccount() {
        // TODO: validation of password strength and empty fields
        const response = await createAccount(email,password);

        if (response.success) {
            navigate('/');
        } else {
            alert(response.message);
        }
    }

    return(
        <div className="registerContainer">
            <div className="registerInput">
                <h1>Register</h1>
                <input type="text"
                       name="email"
                       placeholder="Email"
                       onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password"
                       placeholder="Password"
                       name="password"
                       onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={() => handleCreateAccount()}>Create Account</button>
            </div>
        </div>
    );
};