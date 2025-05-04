import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading} = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Show loading spinner while the authentication state is being loaded
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    // Handle authentication errors (e.g., failed network request)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="text-center max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
          <p className="text-red-600 text-lg font-semibold">Error loading authentication state. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with the current location to allow redirect back after login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Return children if the user is authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
