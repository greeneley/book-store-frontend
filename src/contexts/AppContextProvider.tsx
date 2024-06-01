import { CartService } from '@services/CartService';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContextProvider';

type AppContextValue = {
    countBadge: number;
    setCountBadge: React.Dispatch<React.SetStateAction<number>>;
};

type AppContextProviderProps = {
    children?: React.ReactNode;
};

export const AppContext = createContext<AppContextValue>(null);

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
    children
}: AppContextProviderProps) => {
    const { token } = useAuth();
    const [countBadge, setCountBadge] = useState(0);

    const contextValue = {
        countBadge,
        setCountBadge
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            CartService.getCart().then((res) =>
                setCountBadge(res.data.cart_items.length)
            );
        }
    }, [token]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
