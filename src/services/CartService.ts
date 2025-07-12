import { CartInfo } from "@/model/internal/cart-info";
import axios, { AxiosResponse } from "axios";
import API from "../constants";

const baseUrl = API.dev;

export class CartService {
	static async getCart(): Promise<AxiosResponse<CartInfo>> {
		return await axios.get(baseUrl + "/api/v1/cart");
	}
}
