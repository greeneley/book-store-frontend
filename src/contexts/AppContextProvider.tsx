import { AuthProvider } from "@/contexts/AuthContextProvider";
import { ReactQueryProvider } from "@/contexts/ReactQueryProvider";
import React from "react";
import { CartProvider } from "./CartContextProvider";

type AppContextProviderProps = {
	children?: React.ReactNode;
};

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }: AppContextProviderProps) => {
	return (
		<>
			<AuthProvider>
				<ReactQueryProvider>
					<CartProvider>{children}</CartProvider>
				</ReactQueryProvider>
			</AuthProvider>
		</>
	);
};
