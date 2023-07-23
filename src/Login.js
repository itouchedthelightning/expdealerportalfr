import React, { useState } from 'react';
import axios from './axiosInstance';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import logo from './logo.png';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;

      console.log('Logged in user:', user);

      localStorage.setItem('userId', user.uid);
      localStorage.setItem('username', user.email);
      navigate('/search');
    } catch (error) {
      console.error('Login error:', error);
      alert(`Login error: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <img src={logo} alt="Your Logo" className="login-logo" />
        <h1>DEALER PORTAL</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
