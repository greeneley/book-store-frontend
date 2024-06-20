import { Book } from '../book';

export interface OrderItemResponse {
    orderItemId: number;
    quantity: number;
    priceAtPurchase: number;
    book: Book;
}
