import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login/Login';
import BookPage from './BookPage/BookPage';
import Dashboard from './Dashboard/Dashboard';
import { Route, Routes, useNavigate, Navigate, useLocation } from 'react-router-dom';
import Mainpage from './MainPage/Mainpage';
import Register from './Register/RegisterPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      <nav>
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">
          <a href="/" className="App-title-link">
            Pawel's React App
          </a>
        </h1>
        {!isLoggedIn ? (
          <>
            <button className="login-button" onClick={handleRegister}>
              <p className="login-button-text">Register</p>
            </button>
            <button id='login-button' className="login-button" onClick={() => navigate('/login')}>
              <p className="login-button-text">Login</p>
            </button>
          </>
        ) : (
          <>
            {location.pathname === '/bookpage' ? (
              <button className="login-button" onClick={() => navigate('/dashboard')}>
                <p className="login-button-text">Main Page</p>
              </button>
            ) : (
              <button className="login-button" onClick={() => navigate('/bookpage')}>
                <p className="login-button-text">Book a Lane</p>
              </button>
            )}
            <button className="login-button" onClick={handleLogout}>
              <p className="login-button-text">Logout</p>
            </button>
          </>
        )}
      </nav>

      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Mainpage />}
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/bookpage"
          element={isLoggedIn ? <BookPage onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route path="/register" element={<Register onLogin={handleLogin} />} />
      </Routes>

      <footer className="App-footer">
        <div className="footer-text">
          <p>Created By Pawel Kaminski</p>
          <p>Licensed by Pawel Kaminski</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
