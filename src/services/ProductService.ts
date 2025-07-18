import { Product } from "@/model/internal/product";
import apiService from "@/services/ApiService";
import { AxiosResponse } from "axios";

export class ProductService {
	static async getProductById(productId: number): Promise<AxiosResponse<Product>> {
		return await apiService.get(`/api/v1/product/${productId}`);
	}
}
