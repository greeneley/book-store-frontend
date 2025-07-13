import { CartItemInterface, CartResponse, ProductCartResponse } from "@/model/internal/cart-item-interface";
import CartService, { CartService as CartServiceClass } from "@/services/CartService";
import { create } from "zustand";

interface State {
	cart: CartItemInterface[];
	isLoading: boolean;
	error: string | null;
	totalAmount: number;
}

interface Action {
	// API actions
	fetchCart: () => Promise<void>;
	addToCart: (productId: number, quantity?: number) => Promise<void>;
	removeFromCart: (productId: number) => Promise<void>;
	updateQuantity: (productId: number, quantity: number) => Promise<void>;
	clearCart: () => Promise<void>;

	// Local state actions
	setLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
	setCart: (cartData: CartResponse) => void;
}

const INITIAL_STATE: State = {
	cart: [],
	isLoading: false,
	error: null,
	totalAmount: 0
};

export const useCartStore = create<State & Action>((set, get) => ({
	...INITIAL_STATE,

	// API actions
	fetchCart: async () => {
		try {
			set({ isLoading: true, error: null });
			const cartData = await CartService.getCart();

			// Chuyển đổi ProductCartResponse[] thành CartItemInterface[]
			const convertedCart =
				cartData.items?.map((item: ProductCartResponse) => CartServiceClass.convertToCartItemInterface(item)) || [];

			set({
				cart: convertedCart,
				totalAmount: cartData.totalAmount || 0,
				isLoading: false
			});
		} catch (error) {
			console.error("Error fetching cart:", error);
			set({
				error: "Không thể tải giỏ hàng",
				isLoading: false
			});
		}
	},

	addToCart: async (productId: number, quantity: number = 1) => {
		try {
			set({ isLoading: true, error: null });
			const cartData = await CartService.addToCart(productId, quantity);

			// Chuyển đổi ProductCartResponse[] thành CartItemInterface[]
			const convertedCart =
				cartData.items?.map((item: ProductCartResponse) => CartServiceClass.convertToCartItemInterface(item)) || [];

			set({
				cart: convertedCart,
				totalAmount: cartData.totalAmount || 0,
				isLoading: false
			});
		} catch (error) {
			console.error("Error adding to cart:", error);
			set({
				error: "Không thể thêm sản phẩm vào giỏ hàng",
				isLoading: false
			});
		}
	},

	removeFromCart: async (productId: number) => {
		try {
			set({ isLoading: true, error: null });
			const cartData = await CartService.removeFromCart(productId);

			// Chuyển đổi ProductCartResponse[] thành CartItemInterface[]
			const convertedCart =
				cartData.items?.map((item: ProductCartResponse) => CartServiceClass.convertToCartItemInterface(item)) || [];

			set({
				cart: convertedCart,
				totalAmount: cartData.totalAmount || 0,
				isLoading: false
			});
		} catch (error) {
			console.error("Error removing from cart:", error);
			set({
				error: "Không thể xóa sản phẩm khỏi giỏ hàng",
				isLoading: false
			});
		}
	},

	updateQuantity: async (productId: number, quantity: number) => {
		if (quantity <= 0) {
			// Nếu quantity <= 0, xóa item khỏi cart
			await get().removeFromCart(productId);
			return;
		}

		try {
			set({ isLoading: true, error: null });
			const cartData = await CartService.updateCartItem(productId, quantity);

			// Chuyển đổi ProductCartResponse[] thành CartItemInterface[]
			const convertedCart =
				cartData.items?.map((item: ProductCartResponse) => CartServiceClass.convertToCartItemInterface(item)) || [];

			set({
				cart: convertedCart,
				totalAmount: cartData.totalAmount || 0,
				isLoading: false
			});
		} catch (error) {
			console.error("Error updating cart item:", error);
			set({
				error: "Không thể cập nhật số lượng sản phẩm",
				isLoading: false
			});
		}
	},

	clearCart: async () => {
		try {
			set({ isLoading: true, error: null });
			await CartService.clearCart();
			set({
				cart: [],
				totalAmount: 0,
				isLoading: false
			});
		} catch (error) {
			console.error("Error clearing cart:", error);
			set({
				error: "Không thể xóa giỏ hàng",
				isLoading: false
			});
		}
	},

	// Local state actions
	setLoading: (loading: boolean) => {
		set({ isLoading: loading });
	},

	setError: (error: string | null) => {
		set({ error });
	},

	setCart: (cartData: CartResponse) => {
		// Chuyển đổi ProductCartResponse[] thành CartItemInterface[]
		const convertedCart =
			cartData.items?.map((item: ProductCartResponse) => CartServiceClass.convertToCartItemInterface(item)) || [];

		set({
			cart: convertedCart,
			totalAmount: cartData.totalAmount || 0
		});
	}
}));
