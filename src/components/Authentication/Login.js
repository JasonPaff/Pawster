import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import validateUserLogin from "../../services/authentication/validateUserLogin";

export default function Login() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    async function handleAccountLogin() {
        // check for email or password
        if (password.length <= 0 || email.length <= 0) return;

        const response = await validateUserLogin(email, password);

        if (response.data.validateUserLogin.success) {
            navigate('/');
        } else {
            alert(response.data.validateUserLogin.message);
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
};