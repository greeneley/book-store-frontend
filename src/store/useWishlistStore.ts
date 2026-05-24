import { WishlistItemResponse } from "@/model/internal/wishlist";
import { WishlistService } from "@/services/WishlistService";
import { create } from "zustand";

interface WishlistState {
	items: WishlistItemResponse[];
	isLoading: boolean;
	error: string | null;
}

interface WishlistActions {
	fetchWishlist: () => Promise<void>;
	addToWishlist: (productId: number) => Promise<void>;
	removeFromWishlist: (productId: number) => Promise<void>;
	isInWishlist: (productId: number) => boolean;
	setError: (error: string | null) => void;
}

const INITIAL_STATE: WishlistState = {
	items: [],
	isLoading: false,
	error: null
};

export const useWishlistStore = create<WishlistState & WishlistActions>((set, get) => ({
	...INITIAL_STATE,

	fetchWishlist: async () => {
		try {
			set({ isLoading: true, error: null });
			const items = await WishlistService.getWishlist();
			set({ items, isLoading: false });
		} catch (error) {
			console.error("Error fetching wishlist:", error);
			set({ error: "Không thể tải danh sách yêu thích", isLoading: false });
		}
	},

	addToWishlist: async (productId: number) => {
		try {
			set({ isLoading: true, error: null });
			await WishlistService.addToWishlist(productId);
			await get().fetchWishlist();
		} catch (error) {
			console.error("Error adding to wishlist:", error);
			set({ error: "Không thể thêm vào danh sách yêu thích", isLoading: false });
			throw error;
		}
	},

	removeFromWishlist: async (productId: number) => {
		try {
			set({ isLoading: true, error: null });
			await WishlistService.removeFromWishlist(productId);
			const updatedItems = get().items.filter((item) => item.productId !== productId);
			set({ items: updatedItems, isLoading: false });
		} catch (error) {
			console.error("Error removing from wishlist:", error);
			set({ error: "Không thể xóa khỏi danh sách yêu thích", isLoading: false });
			throw error;
		}
	},

	isInWishlist: (productId: number) => {
		return get().items.some((item) => item.productId === productId);
	},

	setError: (error: string | null) => set({ error })
}));
