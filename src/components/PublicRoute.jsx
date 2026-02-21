import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {

    const { isAuthenticated } = useContext(AuthContext);
    console.log(isAuthenticated);
    if(isAuthenticated && window.location.href.includes("/login")) {
        return <Navigate to={"/"} replace />
    }

    return children;
}

export default PublicRoute;