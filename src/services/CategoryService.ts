import ApiService from "./ApiService";

export class CategoryService {
	static async getCategoryAll(): Promise<any> {
		try {
			const response = await ApiService.get("/api/v1/category/all");
			return response.data;
		} catch (error) {
			console.error("Error fetching cart:", error);
			throw error;
		}
	}
}
