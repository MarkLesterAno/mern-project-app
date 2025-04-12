import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute: React.FC = () => {
    const { isLoggedIn } = useAuth();

    // If the user is logged in, redirect to the root view
    return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;