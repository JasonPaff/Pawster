import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import validateLogin from "../../services/authentication/login";

export default function Login() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate()

    async function handleAccountLogin() {
        // check for email or password
        if (password.length <= 0 || email.length <= 0) return;

        const response = await validateLogin(email, password);

        if (response.data.validateLogin.success) {
            navigate('/');
        } else {
            alert(response.data.validateLogin.message);
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <input type="text"
                   placeholder="Email"
                   onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleAccountLogin}>Login</button>
        </div>
    );
}