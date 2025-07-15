import { AuthProvider } from "@/contexts/AuthContextProvider";
import React from "react";
import { CartProvider } from "./CartContextProvider";

type AppContextProviderProps = {
	children?: React.ReactNode;
};

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }: AppContextProviderProps) => {
	return (
		<>
			<AuthProvider>
				<CartProvider>{children}</CartProvider>
			</AuthProvider>
		</>
	);
};
