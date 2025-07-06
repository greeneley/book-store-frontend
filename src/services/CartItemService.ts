import API from "@/constants";
import axios from "axios";

const baseUrl = API.dev;

export class CartItemService {
	static addCartItem(quantity: number, productId: number) {
		return axios.post(baseUrl + "/api/v1/cart-items/add", {
			quantity,
			productId
		});
	}

	static removeCartItem(cartItemId: number) {
		return axios.get(baseUrl + `/api/v1/cart-item/delete/${cartItemId}`);
	}

	static updateQuantityItem(quantity: number, bookId: number) {
		return axios.patch(baseUrl + "/api/v1/cart-item/update", {
			quantity,
			bookId
		});
	}
}
