import axios from "axios";
import { API } from "../constants";

const baseUrl = API.dev;

export class CartItemService {
	static addCartItem(quantity: number, bookId: number) {
		return axios.post(baseUrl + "/api/v1/cart-item/add", {
			quantity,
			bookId
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
