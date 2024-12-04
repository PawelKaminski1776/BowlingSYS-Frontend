import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import LoginApi from '../Login/LoginApi';
import RegisterApi from './RegisterApi';
import  UsernameAlreadyExistsApi  from './UsernameExistsApi';

function Register({ onLogin }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [surname, setSurname] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!username && !email) {
            setErrorMessage('Please provide a username or email.');
            return;
        }
        if (!password) {
            setErrorMessage('Please provide a password.');
            return;
        }
        if (!firstname || !surname) {
            setErrorMessage('Please provide your full name.');
            return;
        }
    
        try {
            const result = await UsernameAlreadyExistsApi({ username, email });
    
            if (result.message === "Username or Email already exists") {
                setErrorMessage('The username or email already exists.');
            } else {
                const user = await RegisterApi({ username, email, password, firstname, surname });
                const response = await LoginApi(username, email, password);
    
                const userId = response.user_Id;
    
                if (userId !== '00000000-0000-0000-0000-000000000000') {
                    sessionStorage.setItem('session_id', userId); 
                    onLogin(); 
                    navigate('/dashboard');
                } else {
                    setErrorMessage('Invalid username or password');
                }
            }
        } catch (error) {
            setErrorMessage('An error occurred while registering.');
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="register-App-Row">
            <div className="register-App-column">
                <div className="register-form">
                    <h4 className="text-center">Register</h4>
                    
                    <label htmlFor="register-form-username">Username</label>
                    <input
                        type="text"
                        id="register-form-username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="register-form-input"
                    />
                    
                    <label htmlFor="register-form-email">Email</label>
                    <input
                        type="email"
                        id="register-form-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="register-form-input"
                    />
                    
                    <label htmlFor="register-form-password">Password</label>
                    <input
                        type="password"
                        id="register-form-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="register-form-input"
                    />
                    
                    <label htmlFor="register-form-firstname">Firstname</label>
                    <input
                        type="text"
                        id="register-form-firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        className="register-form-input"
                    />
                    
                    <label htmlFor="register-form-surname">Surname</label>
                    <input
                        type="text"
                        id="register-form-surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        className="register-form-input"
                    />

                    <div className="button-row">
                        <button className="register-form-button" onClick={handleSubmit}>
                            Register
                        </button>
                    </div>
                </div>
                {errorMessage && <p className="ErrorText">{errorMessage}</p>}
            </div>
        </div>
    );
}

export default Register;
