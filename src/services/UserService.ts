import API from "@/constants";
import { ProfileUser } from "@/model/internal/profile-user";
import apiService from "@/services/ApiService";
import axios, { AxiosResponse } from "axios";

const baseUrl = API.dev;
export class UserService {
	static async getProfileUser(): Promise<AxiosResponse<ProfileUser>> {
		return await apiService.get("/api/v1/user/profile");
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

	static async updateProfile(request: any) {
		return await apiService.post(`${baseUrl}/api/v1/user/profile/update`, { ...request });
	}
}
