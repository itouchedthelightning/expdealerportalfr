import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = (props) => {
  const isLoggedIn = !!localStorage.getItem('userId');

  return isLoggedIn ? (
    <Route {...props} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;