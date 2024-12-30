import API from "@/constants";
import { ProfileUser } from "@/model/internal/profile-user";
import apiService from "@/services/ApiService";
import { AxiosResponse } from "axios";

const baseUrl = API.dev;
export class UserService {
	static async getProfileUser(): Promise<AxiosResponse<ProfileUser>> {
		return await apiService.get("/api/v1/user/profile");
	}

	static async uploadAvatar(file: File) {
		const formData = new FormData();
		formData.append("file", file, file.name);
		return await apiService.post(`${baseUrl}/api/v1/user/avatar/upload`, formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		});
	}

	static async updateProfile(request: any) {
		return await apiService.post(`${baseUrl}/api/v1/user/profile/update`, { ...request });
	}
}
