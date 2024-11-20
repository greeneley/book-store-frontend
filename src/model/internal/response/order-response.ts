import { OrderStatus } from "../request/order-request";
import { User } from "../user";
import { AddressResponse } from "./address-response";
import { OrderItemResponse } from "./order-item-response";

export interface OrderResponse {
	orderId: number; // Uses "orderId" due to @JsonProperty annotation
	user: User;
	address: AddressResponse;
	orderStatus: OrderStatus; // Assuming OrderStatus is an enum or defined elsewhere
	orderDate: string;
	paymentMethod: string;
	total: number;
	orderItems: OrderItemResponse[];
}
