import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { AdminPanel } from './AdminPanel';

function AdminPanelLogin() {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    
    if (!auth.currentUser || auth.currentUser.email !== 'javi@javi.com') {
      return <Navigate to="/" replace />;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to the admin panel or update the state to show the admin panel
    } catch (error) {
      console.error('Admin login error:', error);
      setErrorMessage('Authentication failed.');
    }
  };

  return (
    <AdminPanel setLoggedIn={setLoggedIn} />);
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

export default AdminPanelLogin;
  

