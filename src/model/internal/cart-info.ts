import { CartItemInterface } from "./cart-item-interface";

export interface CartInfo {
	total: number;
	items: Array<CartItemInterface>;
}
