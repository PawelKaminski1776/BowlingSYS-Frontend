import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import LoginApi from './LoginApi';

function Login({ onLogin }) {
    const [input, setInput] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const isEmail = input.includes('@');
        const username = isEmail ? null : input;
        const email = isEmail ? input : null;

        try {
            const response = await LoginApi(username, email, password);
            console.log(response);

            const userId = response.user_Id;

            if (userId !== '00000000-0000-0000-0000-000000000000') {
                sessionStorage.setItem('session_id', userId); 
                onLogin(); 
                navigate('/dashboard');
            } else {
                setErrorMessage('Invalid username or password');
            }
        } catch (error) {
            setErrorMessage('An error occurred while logging in');
        }

        setInput('');
        setPassword('');
    };

    return (
        <div className="App-Row">
            <div className="App-column">
                <div className="sign-in-form">
                    <h4 className="text-center">Login</h4>
                    <label htmlFor="sign-in-form-username">Username or Email</label>
                    <input
                        type="text"
                        className="sign-in-form-username"
                        id="sign-in-form-username"
                        value={input}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="sign-in-form-password">Password</label>
                    <input
                        type="password"
                        className="sign-in-form-password"
                        id="sign-in-form-password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <div className="button-row">
                        <button id="login-button-click" className="sign-in-form-button" onClick={handleSubmit}>
                            Login
                        </button>
                        <button className="sign-in-form-button" onClick={handleSubmit}>
                            Sign Up
                        </button>
                    </div>
                </div>
                {errorMessage && <p className="ErrorText">{errorMessage}</p>}
            </div>
        </div>
    );
}

export default Login;
