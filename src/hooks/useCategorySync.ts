import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContextProvider";
import { useCategoryStore } from "../store/useCategoryStore";

export const useCategorySync = () => {
	const { accessToken, user } = useAuth();
	const { fetchData } = useCategoryStore();

	useEffect(() => {
		if (accessToken && user) {
			// User đã login, fetch giỏ hàng
			fetchData().catch((error) => {
				console.error("Failed to fetch cart on login:", error);
			});
		}
	}, [accessToken, user, fetchData]);
};
