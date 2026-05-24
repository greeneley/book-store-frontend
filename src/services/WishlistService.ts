import { WishlistItemResponse } from "@/model/internal/wishlist";
import ApiService from "./ApiService";

export class WishlistService {
	static async getWishlist(): Promise<WishlistItemResponse[]> {
		const response = await ApiService.get<WishlistItemResponse[]>("/api/v1/wishlist");
		return response.data;
	}

	static async addToWishlist(productId: number): Promise<void> {
		await ApiService.post(`/api/v1/wishlist/${productId}`, {});
	}

	static async removeFromWishlist(productId: number): Promise<void> {
		await ApiService.delete(`/api/v1/wishlist/${productId}`);
	}

	static async isInWishlist(productId: number): Promise<boolean> {
		const response = await ApiService.get<{ inWishlist: boolean }>(`/api/v1/wishlist/check/${productId}`);
		return response.data.inWishlist;
	}
}
