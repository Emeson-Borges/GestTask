import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/accounts/login/', {
                username,
                password,
            });
            localStorage.setItem('token', response.data.token);
            alert('Logged in successfully');
        } catch (error) {
            console.error('There was an error logging in!', error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>

        <a href="/register">Register</a>
        </form>
        </div>
    );
};

export default Login;
