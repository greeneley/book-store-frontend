import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { User } from '../model/internal/user';

type AuthContextValue = {
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
};

type AuthProviderProps = {
    children?: React.ReactNode;
};

export const AuthContext = createContext<AuthContextValue>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({
    children
}: AuthProviderProps) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState<User>(null);

    React.useEffect(() => {
        if (token) {
            // axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
        }
    }, [token]);

    React.useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

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
