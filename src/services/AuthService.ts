import API from "@/constants";
import axios from "axios";

const baseUrl = API.dev;
export class AuthService {
	static async login(username: string, password: string) {
		try {
			const response = await axios.post(`${baseUrl}/api/v1/auth/login`, {
				username,
				password
			});
			return response.data;
		} catch (error) {
			throw new Error("Login failed");
		}
	}

	static async logout(id: number) {
		try {
			await axios.post(`${baseUrl}/api/v1/auth/logout`, { id });
		} catch (error) {
			console.error("Logout failed:", error);
			throw error;
		}
	}
}
