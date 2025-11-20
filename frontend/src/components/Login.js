import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    axios.post('http://localhost:5000/api/users/login', { email, password })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('isLoggedIn', "true"); // YEH LINE ADD KI
        alert('Logged in as ' + res.data.username);
        navigate('/'); // Ya tum jahan le jaana chahe ("/movies" bhi theek hai)
        window.location.reload(); // Navbar turant update ho jaye
      })
      .catch(() => alert('Login failed'));
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        <label className="auth-label">Email</label>
        <input
          className="auth-input"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label className="auth-label">Password</label>
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="auth-button" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;