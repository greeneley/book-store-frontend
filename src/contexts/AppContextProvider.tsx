import React, { createContext, useState } from "react";
import { useAuth } from "./AuthContextProvider";

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
	const [countBadge, setCountBadge] = useState(0);

	const contextValue = {
		countBadge,
		setCountBadge
	};

	// useEffect(() => {
	// 	if (accessToken) {
	// 		axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
	// 		CartService.getCart().then((res) => setCountBadge(res.data.cart_items.length));
	// 	}
	// }, [accessToken]);

	return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
