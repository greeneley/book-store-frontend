import { Product, ProductSummaryDTO, ReviewResponse } from "@/model/internal/product";
import apiService from "@/services/ApiService";
import { AxiosResponse } from "axios";

export interface PaginatedResponse<T> {
	content: T[];
	totalElements: number;
	totalPages: number;
	number: number;
	size: number;
}

export class ProductService {
	static async getProductById(productId: number): Promise<AxiosResponse<Product>> {
		return await apiService.get(`/api/v1/product/${productId}`);
	}

	static async getProductReviews(
		productId: number,
		page = 0,
		size = 10
	): Promise<AxiosResponse<PaginatedResponse<ReviewResponse>>> {
		return await apiService.get(`/api/v1/product/${productId}/reviews`, { page, size });
	}

	static async getRelatedProducts(productId: number, limit = 8): Promise<AxiosResponse<ProductSummaryDTO[]>> {
		return await apiService.get(`/api/v1/product/${productId}/related`, { limit });
	}
}
