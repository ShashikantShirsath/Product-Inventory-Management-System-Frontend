import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if(storedToken) {
            setToken(storedToken);
            setUser({});
        }
        setLoading(false);
    },[]);

    const login = (token, userData) => {
        localStorage.setItem("token", token);
        setToken(token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }

    const isAuthenticated = token ? true : false;

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
                isAuthenticated,
                loading
            }}
        >
            { children }
        </AuthContext.Provider>
    );
};