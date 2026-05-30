import { CartItemInterface, CartResponse, ProductCartResponse } from "@/model/internal/cart-item-interface";
import CartService, { CartService as CartServiceClass } from "@/services/CartService";
import { create } from "zustand";

interface State {
	cart: CartItemInterface[];
	isLoading: boolean;
	error: string | null;
	totalAmount: number;
	/** Set of productIds currently being synced with server (silent, no global spinner) */
	syncingIds: Set<number>;
}

interface Action {
	// API actions
	fetchCart: () => Promise<any>;
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
	totalAmount: 0,
	syncingIds: new Set()
};

export const useCartStore = create<State & Action>((set, get) => ({
	...INITIAL_STATE,

	// API actions
	fetchCart: async () => {
		try {
			set({ isLoading: true, error: null });
			const cartData = await CartService.getCart();

			const convertedCart =
				cartData.items?.map((item: ProductCartResponse) => CartServiceClass.convertToCartItemInterface(item)) || [];

			set({
				cart: convertedCart,
				totalAmount: cartData.total || 0,
				isLoading: false
			});
			return convertedCart;
		} catch (error) {
			console.error("Error fetching cart:", error);
			set({
				error: "Không thể tải giỏ hàng",
				isLoading: false
			});
			throw error;
		}
	},

	addToCart: async (productId: number, quantity: number = 1) => {
		try {
			set({ isLoading: true, error: null });
			await CartService.addToCart(productId, quantity);
			await get().fetchCart();

			set({
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

			await CartService.removeFromCart(productId);

			const updatedCart = get().cart.filter((item) => item.productId !== productId);
			const totalAmount = updatedCart.reduce((acc, item) => acc + item.salePrice * item.quantity, 0);
			set({ cart: updatedCart, totalAmount, isLoading: false });
		} catch (error) {
			console.error("Error removing from cart:", error);
			set({
				error: "Không thể xóa sản phẩm khỏi giỏ hàng"
			});
		}
	},

	updateQuantity: async (productId: number, quantity: number) => {
		if (quantity <= 0) return;

		// 1. Snapshot for rollback
		const prevCart = get().cart;
		const prevTotal = get().totalAmount;

		// 2. Optimistic update — instant UI, no global spinner
		const optimisticCart = prevCart.map((item) => (item.productId === productId ? { ...item, quantity } : item));
		const optimisticTotal = optimisticCart.reduce((sum, item) => sum + item.salePrice * item.quantity, 0);
		set({ cart: optimisticCart, totalAmount: optimisticTotal, error: null });

		// 3. Mark as syncing (for optional per-item indicator)
		set((s) => ({ syncingIds: new Set(s.syncingIds).add(productId) }));

		try {
			await CartService.updateCartItem(productId, quantity);
		} catch (error) {
			// 4. Rollback on failure
			set({ cart: prevCart, totalAmount: prevTotal, error: "Không thể cập nhật số lượng sản phẩm" });
			console.error("Error updating cart item:", error);
		} finally {
			set((s) => {
				const next = new Set(s.syncingIds);
				next.delete(productId);
				return { syncingIds: next };
			});
		}
	},

	clearCart: async () => {
		try {
			set({ isLoading: true, error: null });
			await CartService.clearCart();
			set({ isLoading: false });
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
			totalAmount: cartData.total || 0
		});
	}
}));
