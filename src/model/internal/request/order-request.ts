import { AddressRequest } from './address-request';
import { OrderItemRequest } from './order-item-request';

export enum OrderStatus {
    ORDER_STATUS,
    AWAITING_PAYMENT,
    AWAITING_SHIPMENT,
    CANCELED,
    COMPLETED,
    CONFIRMED,
    ORDERED,
    PENDING,
    REFUNDED,
    REFUNDING,
    SHIPPED
}

export interface OrderRequest {
    address: AddressRequest;
    orderStatus: OrderStatus;
    orderDate: string;
    paymentMethod: string;
    total: number;
    orderItems: Array<OrderItemRequest>;
}
