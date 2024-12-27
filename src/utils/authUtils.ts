import API from "@/constants";
import axios from "axios";

const baseUrl = API.dev;

export async function refreshAccessToken(id: number, refreshToken: string) {
	try {
		const response = await axios.post(`${baseUrl}/api/v1/auth/refresh-token`, {
			id,
			refreshToken
		});

		const newAccessToken = response.data?.accessToken;
		const newRefreshToken = response.data?.refreshToken;

		axios.defaults.headers["Authorization"] = newAccessToken;
		localStorage.setItem("accessToken", newAccessToken);
		localStorage.setItem("refreshToken", newRefreshToken);
	} catch (error) {
		console.error("Error refreshing access token:", error);
		throw error;
	}
}
