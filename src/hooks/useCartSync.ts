import { useAuth } from "@/contexts/AuthContextProvider";
import { useCartStore } from "@/store/useCartStore";
import { useEffect } from "react";

export const useCartSync = () => {
	const { accessToken, user } = useAuth();
	const { fetchCart, clearCart } = useCartStore();

	useEffect(() => {
		if (accessToken && user) {
			// User đã login, fetch giỏ hàng
			fetchCart().catch((error) => {
				console.error("Failed to fetch cart on login:", error);
			});
		} else if (!accessToken && !user) {
			// User đã logout, clear giỏ hàng
			clearCart().catch((error) => {
				console.error("Failed to clear cart on logout:", error);
			});
		}
	}, [accessToken, user, fetchCart, clearCart]);
};
