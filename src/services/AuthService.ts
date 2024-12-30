import API from "@/constants";
import { TokenService } from "@/services/TokenService";
import axios from "axios";

const baseUrl = API.dev;
export class AuthService {
	static async login(username: string, password: string) {
		// eslint-disable-next-line no-useless-catch
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
			await TokenService.removeAccessToken();
			await TokenService.removeAccessToken();
			await TokenService.removeUser();
			await axios.post(`${baseUrl}/api/v1/auth/logout`, { id });
		} catch (error) {
			console.error("Logout failed:", error);
			throw error;
		}
	}

	static async forgotPassword(email: string) {
		try {
			return await axios.post(`${baseUrl}/api/v1/user/forgot-password`, { email });
		} catch (error) {
			console.error("Forgot Password failed:", error);
			throw error;
		}
	}

	static async resetPassword(token: string, password: string) {
		try {
			return await axios.post(`${baseUrl}/api/v1/user/reset-password`, { token, password });
		} catch (error) {
			console.error("Reset password failed:", error);
			throw error;
		}
	}

	static async resend(email: string) {
		try {
			return await axios.get(`${baseUrl}/api/v1/auth/resend-email`, {
				params: {
					email
				}
			});
		} catch (error) {
			console.error("Resend email failed:", error);
			throw error;
		}
	}
}
