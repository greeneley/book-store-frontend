import API from "@/constants";
import { ProfileUser } from "@/model/internal/profile-user";
import axios from "axios";

const baseUrl = API.dev;
export class UserService {
	static async getProfileUser(): Promise<ProfileUser> {
		// eslint-disable-next-line no-useless-catch
		try {
			const response = await axios.get(`${baseUrl}/api/v1/user/profile`);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	static async uploadAvatar(file: File) {
		// eslint-disable-next-line no-useless-catch
		try {
			const formData = new FormData();
			formData.append("file", file, file.name);

			return await axios.post(`${baseUrl}/api/v1/user/avatar/upload`, formData);
		} catch (error) {
			throw error;
		}
	}
}
