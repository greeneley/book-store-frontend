import { CartItem } from './cart-item';

export interface CartInfo {
    total: number;
    cart_items: Array<CartItem>;
}
