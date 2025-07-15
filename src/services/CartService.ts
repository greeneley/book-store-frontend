import { CartItemInterface, CartResponse, ProductCartResponse } from "@/model/internal/cart-item-interface";
import ApiService from "./ApiService";

export interface ProductCartRequest {
	productId: number;
	quantity: number;
}

class CartService {
	async getCart(): Promise<CartResponse> {
		try {
			const response = await ApiService.get<CartResponse>("/api/v1/cart");
			return response.data;
		} catch (error) {
			console.error("Error fetching cart:", error);
			throw error;
		}
	}

	async addToCart(productId: number, quantity: number = 1): Promise<CartResponse> {
		try {
			const requestData: ProductCartRequest = {
				productId,
				quantity
			};
			const response = await ApiService.post<CartResponse>("/api/v1/cart-items/add", requestData);
			return response.data;
		} catch (error) {
			console.error("Error adding item to cart:", error);
			throw error;
		}
	}

	async removeFromCart(productId: number): Promise<CartResponse> {
		try {
			const response = await ApiService.delete<CartResponse>(`/api/v1/cart-items/${productId}`);
			return response.data;
		} catch (error) {
			console.error("Error removing item from cart:", error);
			throw error;
		}
	}

	async updateCartItem(productId: number, quantity: number): Promise<ProductCartResponse> {
		try {
			const requestData: ProductCartRequest = {
				productId,
				quantity
			};
			const response = await ApiService.put<ProductCartResponse>("/api/v1/cart-items/update", requestData);
			return response.data;
		} catch (error) {
			console.error("Error updating cart item:", error);
			throw error;
		}
	}

	async clearCart(): Promise<void> {
		try {
			await ApiService.delete("/api/v1/cart");
		} catch (error) {
			console.error("Error clearing cart:", error);
			throw error;
		}
	}

	static convertToCartItemInterface(cartItem: ProductCartResponse): CartItemInterface {
		const product = cartItem.product;
		const firstImage =
			product.productImages?.[0]?.image?.url || "/assets/img/placeholder/placeholder.svg?height=400&width=600";

		return {
			productId: product.id,
			title: product.name,
			salePrice: parseFloat(product.salePrice) || 0,
			regularPrice: parseFloat(product.regularPrice) || 0,
			quantity: cartItem.quantity,
			image: firstImage
		};
	}
}

// Export cả class và instance
export { CartService };
export default new CartService();
