import { create } from "zustand";

import { CartItemInterface } from "@/model/internal/cart-item-interface";

interface State {
	cart: CartItemInterface[];
}

interface Action {
	addToCart: (item: CartItemInterface) => void;
	removeFromCart: (itemId: number) => void;
	updateQuantity: (productId: number, quantity: number) => void;
	clearCart: () => void;
}

const INITIAL_STATE: State = {
	cart: [
		{
			id: 1,
			title: "Cải Cách Kinh Tế Trung Quốc Qua Các Thời Đại - Vanlangbooks",
			price: 296400,
			quantity: 4,
			image: "/assets/img/placeholder/placeholder.svg?height=400&width=600"
		},
		{
			id: 2,
			title: "Kiếm Tiền Cùng ChatGPT - Vào Nghề ChatGPT Chỉ Trong 5 Giờ Học - Vanlangbooks",
			price: 169150,
			quantity: 1,
			image: "/assets/img/placeholder/placeholder.svg?height=400&width=600"
		},
		{
			id: 3,
			title: "Kiếm Tiền Cùng ChatGPT - Vào Nghề Đồ Họa AI - Vanlangbooks",
			price: 293250,
			quantity: 1,
			image: "/assets/img/placeholder/placeholder.svg?height=400&width=600"
		}
	]
};

export const useCartStore = create<State & Action>((set, get) => ({
	cart: INITIAL_STATE.cart,
	addToCart: (product: CartItemInterface) => {
		const cart = get().cart;
		const cartItem = cart.find((item) => item.id === product.id);

		if (cartItem) {
			const updatedCart = cart.map((item) =>
				item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
			);
			set({ cart: updatedCart });
		} else {
			const updatedCart = [...cart, { ...product, quantity: 1 }];

			set((state) => ({
				cart: updatedCart
			}));
		}
	},
	removeFromCart: (itemId: number) => {
		set((state) => ({
			cart: state.cart.filter((item) => item.id !== itemId)
		}));
	},
	updateQuantity: (productId: number, quantity: number) => {
		if (quantity > 0) {
			set((state) => ({
				cart: state.cart.map((item) => (item.id === productId ? { ...item, quantity } : item))
			}));
		}
	},
	clearCart: () => {
		set({ cart: [] });
	}
}));
