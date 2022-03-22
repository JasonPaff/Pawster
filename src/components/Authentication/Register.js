import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import createUser from "../../services/authentication/register";

export default function Register() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    async function handleCreateAccount() {
        // TODO: validation of password strength and empty fields
        const response = await createUser(email, password);

        if (response.data.createUser.success) {
            navigate('/');
        } else {
            alert(response.data.createUser.message);
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <input type="text"
                   placeholder="Email"
                   onChange={(e) => setEmail(e.target.value)}
            />
            <input type="password"
                   placeholder="Password"
                   onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleCreateAccount}>Create Account</button>
        </div>
    );
};