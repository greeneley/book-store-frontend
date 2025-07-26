import { useAuth } from "@/contexts/AuthContextProvider";
import { useQueryKeys } from "@/hooks/useQueryKeys";
import { useCartStore } from "@/store/useCartStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function useCart() {
	const { accessToken, user } = useAuth();
	const { fetchCart, clearCart } = useCartStore();

	useEffect(() => {
		if (!accessToken && !user) {
			clearCart().catch((error) => {
				console.error("Failed to clear cart on logout:", error);
			});
		}
	}, [accessToken, clearCart, user]);

	return useQuery({
		queryKey: useQueryKeys.cart,
		queryFn: fetchCart,
		enabled: !!accessToken && !!user
	});
}
