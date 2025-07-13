import { useCartStore } from "@/store/useCartStore";
import React, { createContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContextProvider";
import { CartProvider } from "./CartContextProvider";

type AppContextValue = {
	countBadge: number;
	setCountBadge: React.Dispatch<React.SetStateAction<number>>;
};

type AppContextProviderProps = {
	children?: React.ReactNode;
};

export const AppContext = createContext<AppContextValue>(null);

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }: AppContextProviderProps) => {
	const { accessToken } = useAuth();
	const { cart } = useCartStore();
	const [countBadge, setCountBadge] = useState(0);

	// Tự động cập nhật countBadge từ cart
	useEffect(() => {
		setCountBadge(cart.length);
	}, [cart]);

	const contextValue = {
		countBadge,
		setCountBadge
	};

	return (
		<AppContext.Provider value={contextValue}>
			<CartProvider>{children}</CartProvider>
		</AppContext.Provider>
	);
};
