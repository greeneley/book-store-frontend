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
			throw error;
		}
	}

	static async signup(request: any) {
		try {
			const response = await axios.post(`${baseUrl}/api/v1/auth/register`, { ...request });
			return response.data;
		} catch (error) {
			console.error("Signup failed:", error);
			throw error;
		}
	}

	static async verify(code: string) {
		try {
			return await axios.get(`${baseUrl}/api/v1/user/verify`, {
				params: {
					code
				}
			});
		} catch (error) {
			console.error("Signup failed:", error);
			throw error;
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
