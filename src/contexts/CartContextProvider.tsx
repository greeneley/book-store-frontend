import { useCartStore } from "@/store/useCartStore";
import React, { createContext, useContext, useEffect } from "react";
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

	// Fetch cart khi component mount và user đã login
	useEffect(() => {
		if (accessToken && user) {
			fetchCart().catch(() => {
				// Error đã được xử lý trong store
			});
		}
	}, [accessToken, user, fetchCart]);

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

export const useCartContext = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCartContext must be used within a CartProvider");
	}
	return context;
};
