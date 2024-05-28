import { Book } from './book';

export interface CartItem {
    book: Book;
    quantity: number;
    subTotal: number;
    cart_item_id: number;
}
