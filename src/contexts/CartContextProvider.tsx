import { useCartStore } from "@/store/useCartStore";
import React, { createContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContextProvider";

interface CartContextValue {
	isLoading: boolean;
	error: string | null;
	clearError: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { accessToken, user } = useAuth();
	const { isLoading, error, setError, fetchCart } = useCartStore();

	// Clear error khi user thay đổi
	useEffect(() => {
		setError(null);
	}, [accessToken, user, setError]);

	// Hiển thị toast khi có error
	useEffect(() => {
		if (error) {
			toast.error(error);
		}
	}, [error]);

	const clearError = () => {
		setError(null);
	};

	const contextValue: CartContextValue = {
		isLoading,
		error,
		clearError
	};

	return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
