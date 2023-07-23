import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './Login.js';
import Search from './Search.js';
import axios from 'axios';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { AdminPanel, AdminPanelLogin } from './AdminPanel';


const auth = getAuth();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/search" replace /> : <Login />} />
        <Route path="/search" element={isLoggedIn ? <Search /> : <Navigate to="/" replace />} />
        <Route path="/admin" element={auth.currentUser ? <AdminPanel /> : <AdminPanelLogin />} />
      </Routes>
    </Router>
  );
}

async function searchParts(partNumber) {
  try {
    const response = await axios.get('/api/search', {
      params: { partNumber },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
}

export default App;
