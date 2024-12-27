import { refreshAccessToken } from "@/utils/authUtils";

export async function apiServiceWrapper<T>(apiCall: () => Promise<T>): Promise<T> {
	try {
		return await apiCall();
	} catch (error) {
		if (error.response && error.response.status === 401) {
			try {
				const refreshToken = localStorage.getItem("refreshToken");

				const storedUser = localStorage.getItem("user");
				const parsedUser = JSON.parse(storedUser);

				await refreshAccessToken(parsedUser._id, refreshToken);
				return await apiCall();
			} catch (refreshError) {
				console.error("Token refresh failed:", refreshError);
				throw refreshError;
			}
		}
		throw error;
	}
}
