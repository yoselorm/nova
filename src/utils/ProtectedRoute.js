import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  
  // Check for the presence of your sessionStorage token vector
  const isAuthenticated = !!sessionStorage.getItem('admin_token');

  if (!isAuthenticated) {

    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Session authenticated cleanly. Advance execution matrix to child dashboard views.
  return children;
};

export default ProtectedRoute;