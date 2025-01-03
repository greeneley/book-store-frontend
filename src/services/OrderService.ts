import axios, { AxiosResponse } from "axios";
import API from "../constants";

const baseUrl = API.dev;

export class OrderService {
	static createOrder(order: any): Promise<AxiosResponse<string>> {
		return axios.post(baseUrl + "/api/v1/orders", {
			...order
		});
	}

	static getOrderById(id: number) {
		return axios.get(baseUrl + "/api/v1/orders/search/" + id);
	}
}
