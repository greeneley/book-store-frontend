import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

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

    React.useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer' + token;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
        }
    }, [token]);

    const contextValue = {
        token,
        setToken
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
