import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {

    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) return null; 

    if(isAuthenticated) {
        return <Navigate to={"/"} replace />
    }

    return children;
}

export default PublicRoute;