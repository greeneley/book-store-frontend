import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

type AuthContextValue = {
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
};

type AuthProviderProps = {
    children?: React.ReactNode;
};

export const AuthContext = createContext<AuthContextValue>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({
    children
}: AuthProviderProps) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    React.useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
        }
    }, [token]);

    const contextValue = {
        token,
        setToken,
        user,
        setUser
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
