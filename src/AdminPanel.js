import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import './styles.css'; 

const auth = getAuth();

function AdminPanelLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.email === 'javi@javi.com') {
        setLoggedIn(true);
      } else {
        setErrorMessage('You do not have access to the admin panel.');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      setErrorMessage('Authentication failed.');
    }
  };

  if (!loggedIn) {
    return (
      <form onSubmit={handleLogin}>
        <h2>Login to access the admin panel</h2>
        {errorMessage && <p>{errorMessage}</p>}
        <label>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <button type="submit">Log In</button>
      </form>
    );
  }

  return <AdminPanel />;
}

const AdminPanel = ({ setLoggedIn }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setUploadStatus('Please select a file before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('inventory', selectedFile);

    try {
      setUploadStatus('Uploading...');
      const response = await axios.post('https://expdealerportal-906dba29157e.herokuapp.com/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus('Upload successful.');
    } catch (error) {
      console.error('Error uploading file:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
      setUploadStatus('Upload failed. Please try again.');
    }
  };

  

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false); // This line is important
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <div className="logoutButtonWrapper">
        <button onClick={handleLogout}>Log Out</button>
      </div>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          onChange={handleFileChange}
          className="fileInput"
        />
        <button type="submit" className="uploadButton">Upload Inventory</button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};


export { AdminPanel, AdminPanelLogin };
