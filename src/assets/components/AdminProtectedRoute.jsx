// src/components/AdminProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('adminToken');

  // Here you would typically verify the token or admin status
  // For simplicity, we are just checking if the token exists
  const isAdminAuthenticated = !!token;

  return isAdminAuthenticated ? Component : <Navigate to="/admin/login" />;
};

export default AdminProtectedRoute;
